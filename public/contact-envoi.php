<?php
/**
 * Script d'envoi du formulaire de contact — asc-sarl.com (hébergement Hostinger, PHP).
 *
 * À CONFIGURER avant la mise en ligne :
 *  - DESTINATAIRE : boîte qui reçoit les messages (personne désignée par la direction, protocole 8).
 *  - EXPEDITEUR   : adresse du domaine asc-sarl.com créée dans Hostinger (ex. noreply@asc-sarl.com),
 *                   indispensable pour que les messages ne soient pas classés comme indésirables.
 *
 * Protections : champ piège, délai minimal de remplissage, validation complète côté serveur,
 * contrôle du type et de la taille de la pièce jointe, aucun en-tête injectable.
 * Les données ne sont pas enregistrées sur le serveur : elles sont uniquement transmises par courriel.
 */

const DESTINATAIRE = 'contact@asc-sarl.com';
const EXPEDITEUR   = 'noreply@asc-sarl.com';
const NOM_CABINET  = 'Alkebulan Services et Conseils';
const TAILLE_MAX   = 10 * 1024 * 1024; // 10 Mo (proposition du protocole)
const DELAI_MIN_MS = 3000;             // un humain met plus de 3 secondes à remplir le formulaire

// Listes autorisées (identiques à src/data/contact.ts)
const NATURES = ['Information', "Demande d'accompagnement", 'Transmission de termes de référence', 'Partenariat', 'Autre'];
const DOMAINES = [
  'Études environnementales et sociales', 'Changements climatiques et adaptation', 'Hydraulique, hydrologie et GIRE',
  'Aménagement du territoire', 'Agriculture durable et développement rural', 'Économie locale et développement territorial',
  'Tourisme et conservation', 'Formation, sensibilisation et participation des acteurs', 'Je ne sais pas encore',
];

$json = isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false;
$base = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');

function repondre(bool $ok, string $message, int $code = 200): void {
    global $json, $base;
    http_response_code($code);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } elseif ($ok) {
        header('Location: ' . $base . '/contact/merci/', true, 303);
    } else {
        header('Content-Type: text/html; charset=utf-8');
        echo '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Envoi impossible</title>'
           . '<body style="font-family:sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem">'
           . '<h1>Votre message n\'a pas pu être envoyé</h1><p>' . htmlspecialchars($message) . '</p>'
           . '<p><a href="' . htmlspecialchars($base) . '/contact/">Revenir au formulaire</a></p></body></html>';
    }
    exit;
}

function champ(string $nom, int $max): string {
    $v = trim((string)($_POST[$nom] ?? ''));
    $v = str_replace(["\r\n", "\r"], "\n", $v);
    return mb_substr($v, 0, $max);
}
function ligne(string $v): string { return trim(preg_replace('/[\r\n]+/', ' ', $v)); } // aucun saut de ligne dans les en-têtes

if ($_SERVER['REQUEST_METHOD'] !== 'POST') repondre(false, 'Méthode non autorisée.', 405);

// Protection contre les envois automatiques
if (!empty($_POST['site_web'])) repondre(true, 'ok'); // robot : réponse neutre, rien n'est envoyé
$ts = (int)($_POST['ts'] ?? 0);
if ($ts > 0 && (microtime(true) * 1000 - $ts) < DELAI_MIN_MS) repondre(false, 'Envoi trop rapide : merci de réessayer.', 429);

// Validation
$nom          = ligne(champ('nom', 120));
$organisation = ligne(champ('organisation', 150));
$fonction     = ligne(champ('fonction', 120));
$email        = ligne(champ('email', 160));
$telephone    = ligne(champ('telephone', 30));
$nature       = ligne(champ('nature', 80));
$domaine      = ligne(champ('domaine', 120));
$message      = champ('message', 5000);
$consentement = ($_POST['consentement'] ?? '') === 'oui';

$erreurs = [];
if ($nom === '') $erreurs[] = 'nom et prénom';
if ($organisation === '') $erreurs[] = 'organisation';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $erreurs[] = 'adresse électronique';
if (!preg_match('/^[0-9+()\s.\-]{6,30}$/', $telephone)) $erreurs[] = 'téléphone';
if (!in_array($nature, NATURES, true)) $erreurs[] = 'nature de la demande';
if ($domaine !== '' && !in_array($domaine, DOMAINES, true)) $erreurs[] = 'domaine';
if ($message === '') $erreurs[] = 'message';
if (!$consentement) $erreurs[] = 'consentement';
if ($erreurs) repondre(false, 'Champs à vérifier : ' . implode(', ', $erreurs) . '.', 422);

// Pièce jointe (facultative)
$piece = null;
if (!empty($_FILES['piece']) && $_FILES['piece']['error'] !== UPLOAD_ERR_NO_FILE) {
    $f = $_FILES['piece'];
    if ($f['error'] !== UPLOAD_ERR_OK) repondre(false, 'La pièce jointe n\'a pas pu être reçue.', 422);
    if ($f['size'] > TAILLE_MAX) repondre(false, 'La pièce jointe dépasse 10 Mo.', 422);
    $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
    $types = [
        'pdf'  => ['application/pdf'],
        'doc'  => ['application/msword', 'application/octet-stream', 'application/x-ole-storage', 'application/CDFV2'],
        'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
    ];
    $mime = function_exists('finfo_open') ? finfo_file(finfo_open(FILEINFO_MIME_TYPE), $f['tmp_name']) : 'application/octet-stream';
    if (!isset($types[$ext]) || !in_array($mime, $types[$ext], true)) repondre(false, 'La pièce jointe doit être un fichier PDF ou Word.', 422);
    $nomFichier = preg_replace('/[^A-Za-z0-9._-]+/', '_', basename($f['name']));
    $piece = ['nom' => $nomFichier, 'type' => $types[$ext][0], 'contenu' => file_get_contents($f['tmp_name'])];
}

// Courriel au cabinet
$sujet = 'Site internet — ' . $nature . ' — ' . $organisation;
$corps = "Nouveau message reçu depuis le formulaire de contact du site asc-sarl.com\n\n"
       . "Nom et prénom : $nom\nOrganisation : $organisation\nFonction : " . ($fonction ?: '—') . "\n"
       . "Adresse électronique : $email\nTéléphone / WhatsApp : $telephone\n"
       . "Nature de la demande : $nature\nDomaine concerné : " . ($domaine ?: '—') . "\n"
       . "Pièce jointe : " . ($piece ? $piece['nom'] : 'aucune') . "\n\n"
       . "Message :\n$message\n\n— Consentement au traitement des données : oui (" . date('d/m/Y H:i') . ")\n";

function encoder(string $s): string { return '=?UTF-8?B?' . base64_encode($s) . '?='; }

$frontiere = 'asc_' . bin2hex(random_bytes(12));
$entetes = [
    'From: ' . encoder(NOM_CABINET . ' — site internet') . ' <' . EXPEDITEUR . '>',
    'Reply-To: ' . encoder($nom) . ' <' . $email . '>',
    'MIME-Version: 1.0',
];
if ($piece) {
    $entetes[] = 'Content-Type: multipart/mixed; boundary="' . $frontiere . '"';
    $contenu = "--$frontiere\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
             . chunk_split(base64_encode($corps))
             . "--$frontiere\r\nContent-Type: {$piece['type']}; name=\"{$piece['nom']}\"\r\nContent-Transfer-Encoding: base64\r\n"
             . "Content-Disposition: attachment; filename=\"{$piece['nom']}\"\r\n\r\n"
             . chunk_split(base64_encode($piece['contenu'])) . "--$frontiere--";
} else {
    $entetes[] = 'Content-Type: text/plain; charset=UTF-8';
    $entetes[] = 'Content-Transfer-Encoding: base64';
    $contenu = chunk_split(base64_encode($corps));
}
$envoye = mail(DESTINATAIRE, encoder($sujet), $contenu, implode("\r\n", $entetes), '-f' . EXPEDITEUR);
if (!$envoye) repondre(false, 'Le serveur n\'a pas pu envoyer votre message.', 500);

// Accusé de réception automatique (texte du protocole, À VALIDER)
$accuse = "Bonjour,\n\nNous accusons réception de votre message adressé à " . NOM_CABINET . ". "
        . "Il sera examiné par notre équipe dans les meilleurs délais.\n\nCordialement,\nL'équipe d'" . NOM_CABINET . "\nhttps://asc-sarl.com\n";
mail($email, encoder('Accusé de réception — ' . NOM_CABINET), chunk_split(base64_encode($accuse)), implode("\r\n", [
    'From: ' . encoder(NOM_CABINET) . ' <' . EXPEDITEUR . '>',
    'Reply-To: ' . DESTINATAIRE,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
]), '-f' . EXPEDITEUR);

repondre(true, 'Merci, votre message a bien été envoyé.');
