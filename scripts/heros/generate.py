"""
Génère les illustrations d'en-tête (SVG 1600 × 900) des pages qui n'en ont pas encore,
dans le style des illustrations fournies par le cabinet (hero-asc-*.svg) :
ciel en dégradé, nuages, soleil levant à droite, deux rangs de collines, prairie, colline de premier plan,
et un motif thématique à droite (objets à aplats, ombre portée légère, pictogrammes au trait arrondi).

Zone utile : sur grand écran, l'en-tête (≈ 545 px de haut) ne montre que la bande centrale de l'image, dont le haut
passe sous le menu flottant ; les motifs sont dessinés entre y ≈ 240 et y ≈ 680 puis réduits de 15 % vers le sol
(ils occupent alors y ≈ 300 à 685), à droite (x ≥ 980), côté non couvert par le voile.

Usage (depuis le dossier site) :  python scripts/heros/generate.py
Sortie : public/images/hero-<nom>.svg
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / 'public' / 'images'

# Palette des illustrations fournies
FOREST, YELLOW, LIGHT, CREAM, INK = '#3f7d20', '#f6c62d', '#b7dd7e', '#eef3e6', '#17301a'
WOOD, WOOD_DARK, WATER, WATER_LIGHT = '#7a5638', '#5f4129', '#9fcfdc', '#d3eaf0'

# ---------- Pictogrammes (grille 24 × 24, trait arrondi) ----------
ICONS = {
    'leaf': ['M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z', 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'],
    'thermometer': ['M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z'],
    'droplet': ['M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'],
    'map': ['M14.1 5.55a2 2 0 0 0 1.8 0l3.66-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.56 2.27a2 2 0 0 1-1.78 0l-4.22-2.1a2 2 0 0 0-1.78 0l-3.66 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9l4.56-2.27a2 2 0 0 1 1.78 0z', 'M15 5.76v15', 'M9 3.24v15'],
    'sprout': ['M12 21v-8', 'M12 13c0-4-3-6-7-6 0 4 3 6 7 6z', 'M12 11c0-3 2-5 6-5 0 3-2 5-6 5z'],
    'store': ['M3 9l1.5-5h15L21 9', 'M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z', 'M5 13v8h14v-8', 'M10 21v-5h4v5'],
    'trees': ['M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z', 'M7 16v6', 'M13 19v3', 'M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5'],
    'users': ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'CIRCLE 9 7 4', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
    'user': ['CIRCLE 12 8 4', 'M20 21a8 8 0 0 0-16 0'],
    'search': ['CIRCLE 11 11 7', 'M21 21l-4.3-4.3'],
    'clipboard': ['M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M9 14l2 2 4-4'],
    'bulb': ['M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5', 'M9 18h6', 'M10 22h4'],
    'heart': ['M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'],
    'target': ['CIRCLE 12 12 10', 'CIRCLE 12 12 6', 'CIRCLE 12 12 2'],
    'compass': ['CIRCLE 12 12 10', 'M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z'],
    'check': ['M20 6 9 17l-5-5'],
    'coins': ['CIRCLE 8 8 6', 'M18.09 10.37A6 6 0 1 1 10.34 18', 'M7 6h1v4', 'M16.71 13.88l.7.71-2.82 2.82'],
    'binoculars': ['CIRCLE 6 16 4', 'CIRCLE 18 16 4', 'M10 16h4', 'M6 12V6a2 2 0 0 1 4 0v10', 'M18 12V6a2 2 0 0 0-4 0v10'],
    'chart': ['M3 3v18h18', 'M8 17v-5', 'M13 17V8', 'M18 17v-8'],
    'building': ['M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z', 'M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2', 'M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2', 'M10 6h4', 'M10 10h4', 'M10 14h4', 'M10 18h4'],
    'pin': ['M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0', 'CIRCLE 12 10 3'],
    'rain': ['M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24', 'M16 14v6', 'M8 14v6', 'M12 16v6'],
    'flag': ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
    'message': ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
}


def icon(name, cx, cy, size, color, width=1.8):
    s = size / 24
    parts = []
    for d in ICONS[name]:
        if d.startswith('CIRCLE'):
            _, x, y, r = d.split()
            parts.append(f'<circle cx="{x}" cy="{y}" r="{r}"/>')
        else:
            parts.append(f'<path d="{d}"/>')
    return (f'<g transform="translate({cx - size / 2:.1f},{cy - size / 2:.1f}) scale({s:.3f})" fill="none" stroke="{color}" '
            f'stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round">{"".join(parts)}</g>')


def badge(cx, cy, r, fill, name, color, icon_size=None):
    """Pastille ronde avec ombre portée (comme les bulles des illustrations fournies)."""
    return (f'<circle cx="{cx}" cy="{cy + 8}" r="{r}" fill="#000" opacity="0.12"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>'
            + icon(name, cx, cy, icon_size or r * 1.05, color))


def shadow_rect(x, y, w, h, rx, fill):
    return (f'<rect x="{x}" y="{y + 8}" width="{w}" height="{h}" rx="{rx}" fill="#000" opacity="0.12"/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"/>')


def dashed(points):
    d = 'M' + ' L'.join(f'{x},{y}' for x, y in points)
    return f'<path d="{d}" stroke="#ffffff" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none" opacity="0.9"/>'


def tree(x, y, s=1.0, c='#3d7a2c'):
    return (f'<rect x="{x - 3 * s:.1f}" y="{y - 6 * s:.1f}" width="{6 * s:.1f}" height="{26 * s:.1f}" rx="{2 * s:.1f}" fill="{WOOD}"/>'
            f'<circle cx="{x}" cy="{y - 14 * s:.1f}" r="{18 * s:.1f}" fill="{c}"/><circle cx="{x + 12 * s:.1f}" cy="{y - 8 * s:.1f}" r="{12 * s:.1f}" fill="{c}"/>')


def base(clouds=((260, 150, 120), (380, 172, 90), (760, 110, 110), (1000, 190, 80)), pond=False, trees=True):
    """Paysage commun (repris des illustrations fournies)."""
    cl = ''.join(f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{rx * 0.21:.0f}" fill="#ffffff" opacity="0.5"/>' for x, y, rx in clouds)
    hills_trees = ''.join(tree(x, y, 0.9) for x, y in ((140, 520), (300, 512), (470, 516), (640, 508), (1500, 506))) if trees else ''
    pond_svg = (f'<ellipse cx="560" cy="560" rx="420" ry="20" fill="{WATER}"/><ellipse cx="540" cy="556" rx="240" ry="5" fill="{WATER_LIGHT}" opacity="0.7"/>'
                if pond else '')
    return f'''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86b9d1"/><stop offset="0.6" stop-color="#d9e8dc"/><stop offset="1" stop-color="#f8e8b8"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff3c4" stop-opacity="0.9"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>
<linearGradient id="meadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86b95e"/><stop offset="1" stop-color="#5f9f3d"/></linearGradient>
</defs>
<rect width="1600" height="560" fill="url(#sky)"/>
{cl}
<circle cx="1420" cy="450" r="280" fill="url(#glow)"/><circle cx="1420" cy="450" r="58" fill="#fff5cf"/>
<path d="M0,480 C200,440 380,462 560,466 C760,450 960,424 1180,452 C1360,474 1500,444 1600,458 L1600,540 L0,540 Z" fill="#a3c398"/>
<path d="M0,512 C240,486 420,506 640,500 C900,484 1100,496 1300,484 C1450,478 1550,494 1600,490 L1600,560 L0,560 Z" fill="#699d5b"/>
{hills_trees}
<rect x="0" y="530" width="1600" height="370" fill="url(#meadow)"/>
{pond_svg}
<path d="M0,900 L0,690 C260,650 560,676 860,716 C1100,748 1350,730 1600,690 L1600,900 Z" fill="#5f9f3d"/>'''


def foreground():
    return '<path d="M0,900 L0,790 C420,760 900,820 1600,775 L1600,900 Z" fill="#3d7a2c"/>'


def svg(content, fg=True):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" '
            'preserveAspectRatio="xMidYMid slice" aria-hidden="true">\n' + content + ('\n' + foreground() if fg else '') + '\n</svg>\n')


# ---------- Motifs ----------
def m_cabinet():
    # Bâtiment de bureaux (siège), mât et drapeau soleil, arbres
    b = shadow_rect(1080, 330, 250, 300, 14, '#2f6a1c')
    b += f'<rect x="1080" y="318" width="250" height="26" rx="10" fill="{INK}" opacity="0.85"/>'
    for row in range(4):
        for col in range(4):
            b += f'<rect x="{1102 + col * 56}" y="{366 + row * 52}" width="38" height="32" rx="5" fill="{CREAM if (row + col) % 3 else LIGHT}"/>'
    b += f'<rect x="1176" y="572" width="58" height="58" rx="6" fill="{YELLOW}"/><rect x="1203" y="572" width="4" height="58" fill="#d9a915"/>'
    b += f'<rect x="1388" y="300" width="8" height="330" rx="3" fill="{WOOD_DARK}"/><path d="M1396,306 L1488,330 L1396,356 Z" fill="{YELLOW}"/>'
    b += tree(1030, 610, 1.6) + tree(1440, 618, 1.3, '#2f6a1c')
    b += badge(1000, 360, 46, '#ffffff', 'pin', FOREST)
    return b


def m_vision():
    # Sommet avec drapeau (vision), pastilles cible / boussole / cœur (vision, mission, valeurs)
    m = f'<path d="M1020,640 L1250,330 L1330,420 L1380,370 L1540,640 Z" fill="#2f6a1c"/>'
    m += f'<path d="M1250,330 L1292,386 L1262,378 L1236,398 L1222,368 Z" fill="{CREAM}"/>'
    m += f'<path d="M1250,640 C1240,560 1300,520 1260,450 C1240,420 1252,380 1250,340" stroke="{YELLOW}" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round" fill="none"/>'
    m += f'<rect x="1247" y="250" width="6" height="84" rx="2" fill="{WOOD_DARK}"/><path d="M1253,254 L1318,272 L1253,292 Z" fill="{YELLOW}"/>'
    m += dashed([(1080, 300), (1150, 330)]) + dashed([(1460, 300), (1380, 330)])
    m += badge(1040, 280, 50, '#ffffff', 'target', FOREST)
    m += badge(1500, 280, 46, FOREST, 'compass', '#ffffff')
    m += badge(1470, 470, 40, LIGHT, 'heart', INK)
    return m


def m_equipe():
    # Pastilles de profils reliées autour d'une pastille centrale
    c = (1270, 440)
    pts = [(1090, 330), (1450, 330), (1100, 580), (1440, 580)]
    e = ''.join(dashed([c, p]) for p in pts)
    e += badge(*c, 74, YELLOW, 'users', INK, 72)
    e += badge(*pts[0], 46, '#ffffff', 'user', FOREST)
    e += badge(*pts[1], 46, FOREST, 'user', '#ffffff')
    e += badge(*pts[2], 46, LIGHT, 'user', INK)
    e += badge(*pts[3], 46, '#ffffff', 'user', FOREST)
    return e


def m_approche():
    # Chemin sinueux jalonné de cinq étapes (comprendre, diagnostiquer, concevoir, accompagner, évaluer)
    a = (f'<path d="M980,900 C1020,800 1180,770 1200,690 C1225,600 1080,590 1120,520 C1150,470 1300,480 1340,430 C1370,390 1330,350 1380,320" '
         f'stroke="#e7d3a6" stroke-width="58" stroke-linecap="round" fill="none"/>'
         f'<path d="M980,900 C1020,800 1180,770 1200,690 C1225,600 1080,590 1120,520 C1150,470 1300,480 1340,430 C1370,390 1330,350 1380,320" '
         f'stroke="#ffffff" stroke-width="4" stroke-dasharray="2 16" stroke-linecap="round" fill="none" opacity="0.8"/>')
    steps = [(1185, 640, 'search', '#ffffff', FOREST), (1112, 525, 'clipboard', LIGHT, INK), (1290, 462, 'bulb', YELLOW, INK),
             (1352, 380, 'users', '#ffffff', FOREST), (1460, 290, 'check', FOREST, '#ffffff')]
    for x, y, n, f, c in steps:
        a += badge(x, y, 38, f, n, c)
    return a


def m_expertises():
    # Huit pastilles de domaines en constellation
    pos = [(1010, 330), (1130, 280), (1260, 300), (1390, 270), (1060, 470), (1190, 430), (1320, 450), (1450, 420)]
    names = ['leaf', 'thermometer', 'droplet', 'map', 'sprout', 'store', 'trees', 'users']
    fills = [('#ffffff', FOREST), (YELLOW, INK), (WATER, INK), ('#ffffff', FOREST), (LIGHT, INK), (YELLOW, INK), (FOREST, '#ffffff'), ('#ffffff', FOREST)]
    e = dashed(pos[:4]) + dashed(pos[4:])
    for (x, y), n, (f, c) in zip(pos, names, fills):
        e += badge(x, y, 40, f, n, c)
    return e


def m_eies():
    # Planche de relevés sur chevalet, loupe, feuille
    e = f'<path d="M1150,640 L1190,420 M1330,640 L1290,420 M1240,640 L1240,430" stroke="{WOOD}" stroke-width="10" stroke-linecap="round"/>'
    e += shadow_rect(1140, 300, 200, 250, 16, CREAM)
    e += f'<rect x="1200" y="286" width="80" height="30" rx="8" fill="{FOREST}"/>'
    for i, y in enumerate((350, 410, 470)):
        e += f'<path d="M1166,{y + 10} l12,12 l22,-24" stroke="{FOREST}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
        e += f'<rect x="1214" y="{y + 6}" width="{100 - i * 18}" height="10" rx="5" fill="#c9d3bd"/>'
    e += badge(1400, 330, 54, YELLOW, 'search', INK)
    e += badge(1060, 380, 42, '#ffffff', 'leaf', FOREST)
    return e


def m_climat():
    # Nuage de pluie, thermomètre, jeunes plants (mangrove)
    c = f'<g opacity="0.95"><ellipse cx="1180" cy="330" rx="120" ry="58" fill="#a9bccb"/><circle cx="1130" cy="310" r="56" fill="#b8c9d6"/><circle cx="1220" cy="290" r="70" fill="#b8c9d6"/></g>'
    for x in (1110, 1160, 1210, 1260):
        c += f'<path d="M{x},400 l-10,28" stroke="{WATER}" stroke-width="7" stroke-linecap="round"/><path d="M{x - 18},446 l-10,28" stroke="{WATER}" stroke-width="7" stroke-linecap="round"/>'
    c += f'<ellipse cx="1240" cy="610" rx="230" ry="26" fill="{WATER}"/>'
    for x, h in ((1080, 60), (1140, 80), (1200, 55), (1270, 85), (1340, 62), (1400, 74)):
        c += f'<path d="M{x},612 v-{h}" stroke="{WOOD}" stroke-width="5" stroke-linecap="round"/><ellipse cx="{x - 12}" cy="{612 - h}" rx="16" ry="8" fill="{FOREST}" transform="rotate(-30 {x - 12} {612 - h})"/><ellipse cx="{x + 12}" cy="{612 - h + 10}" rx="16" ry="8" fill="#5f9f3d" transform="rotate(30 {x + 12} {612 - h + 10})"/>'
    c += badge(1440, 330, 50, YELLOW, 'thermometer', INK)
    return c


def m_eau():
    # Rivière sinueuse, château d'eau, échelle de mesure, goutte
    r = (f'<path d="M1120,900 C1100,800 1260,760 1230,680 C1200,610 1080,610 1120,560" stroke="{WATER}" stroke-width="70" stroke-linecap="round" fill="none"/>'
         f'<path d="M1120,900 C1100,800 1260,760 1230,680 C1200,610 1080,610 1120,560" stroke="{WATER_LIGHT}" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.7"/>')
    r += f'<path d="M1370,640 L1390,470 M1470,640 L1450,470 M1380,560 L1460,560" stroke="{WOOD_DARK}" stroke-width="9" stroke-linecap="round"/>'
    r += shadow_rect(1352, 390, 136, 90, 18, '#ffffff') + f'<rect x="1352" y="440" width="136" height="40" rx="0" fill="{WATER}"/><rect x="1352" y="390" width="136" height="90" rx="18" fill="none" stroke="{CREAM}" stroke-width="6"/>'
    r += f'<rect x="1286" y="520" width="14" height="130" rx="4" fill="#ffffff"/>' + ''.join(f'<rect x="1286" y="{530 + i * 22}" width="14" height="8" fill="{FOREST}"/>' for i in range(5))
    r += badge(1140, 360, 54, WATER, 'droplet', INK)
    return r


def m_amenagement():
    # Carte dépliée avec itinéraire et repère, petites maisons
    mp = (f'<g transform="rotate(-6 1270 430)">'
          f'<path d="M1100,320 L1210,350 L1330,320 L1440,350 L1440,560 L1330,530 L1210,560 L1100,530 Z" fill="#000" opacity="0.12" transform="translate(0,10)"/>'
          f'<path d="M1100,320 L1210,350 L1210,560 L1100,530 Z" fill="{CREAM}"/><path d="M1210,350 L1330,320 L1330,530 L1210,560 Z" fill="#dfe9cf"/>'
          f'<path d="M1330,320 L1440,350 L1440,560 L1330,530 Z" fill="{CREAM}"/>'
          f'<path d="M1130,500 C1180,440 1230,500 1280,430 C1320,380 1380,430 1410,390" stroke="{FOREST}" stroke-width="7" stroke-dasharray="4 14" stroke-linecap="round" fill="none"/>'
          f'<rect x="1150" y="380" width="40" height="30" rx="4" fill="{LIGHT}"/><rect x="1350" y="460" width="50" height="40" rx="4" fill="{LIGHT}"/></g>')
    mp += f'<path d="M1405,330 c0,-34 52,-34 52,0 c0,26 -26,48 -26,48 c0,0 -26,-22 -26,-48z" fill="{YELLOW}"/><circle cx="1431" cy="330" r="10" fill="#ffffff"/>'
    for x, c in ((1110, '#ffffff'), (1180, CREAM), (1250, '#ffffff')):
        mp += f'<rect x="{x}" y="600" width="54" height="44" rx="4" fill="{c}"/><path d="M{x - 6},604 L{x + 27},574 L{x + 60},604 Z" fill="#b45b3e"/><rect x="{x + 20}" y="620" width="14" height="24" fill="{FOREST}"/>'
    mp += badge(1030, 380, 42, '#ffffff', 'map', FOREST)
    return mp


def m_agriculture():
    # Champ en sillons, grenier traditionnel, pousse
    a = f'<path d="M960,900 L1110,600 L1600,600 L1600,900 Z" fill="#b5703f"/>'
    for i in range(8):
        x0, x1 = 1130 + i * 60, 980 + i * 95
        a += f'<path d="M{x0},600 L{x1},900" stroke="#8f532c" stroke-width="5"/>'
        for t in (0.25, 0.5, 0.75):
            a += f'<circle cx="{x0 + (x1 - x0) * t:.0f}" cy="{600 + 300 * t:.0f}" r="{6 + 6 * t:.0f}" fill="#6cb14a"/>'
    a += (f'<ellipse cx="1420" cy="560" rx="70" ry="12" fill="#000" opacity="0.12"/><rect x="1362" y="470" width="116" height="90" rx="20" fill="#d9b58a"/>'
          f'<path d="M1340,478 L1420,392 L1500,478 Z" fill="#c9a24e"/><path d="M1362,478 L1420,416 L1478,478" stroke="#a9842f" stroke-width="5" fill="none"/>'
          f'<rect x="1404" y="508" width="32" height="52" rx="6" fill="{WOOD_DARK}"/>')
    a += badge(1200, 380, 52, LIGHT, 'sprout', INK)
    return a


def m_economie():
    # Étal de marché à auvent rayé, produits, pièces
    e = f'<ellipse cx="1260" cy="640" rx="190" ry="16" fill="#000" opacity="0.12"/>'
    e += f'<rect x="1100" y="380" width="10" height="260" fill="{WOOD_DARK}"/><rect x="1410" y="380" width="10" height="260" fill="{WOOD_DARK}"/>'
    for i in range(6):
        e += f'<path d="M{1080 + i * 60},360 h60 v44 a30 30 0 0 1 -60 0 z" fill="{YELLOW if i % 2 == 0 else FOREST}"/>'
    e += f'<rect x="1070" y="340" width="380" height="24" rx="8" fill="{INK}" opacity="0.85"/>'
    e += f'<rect x="1090" y="530" width="340" height="30" rx="6" fill="#c08a52"/><rect x="1100" y="560" width="320" height="80" rx="6" fill="#a8743f"/>'
    for x, c in ((1135, '#f08c2e'), (1170, '#f6c62d'), (1205, '#f08c2e'), (1260, '#6cb14a'), (1295, '#6cb14a'), (1330, '#e05a3b'), (1365, '#f6c62d'), (1395, '#e05a3b')):
        e += f'<circle cx="{x}" cy="520" r="17" fill="{c}"/>'
    e += badge(1500, 330, 46, YELLOW, 'coins', INK)
    e += badge(1010, 420, 40, '#ffffff', 'store', FOREST)
    return e


def m_tourisme():
    # Forêt, case d'accueil, oiseaux, jumelles
    t = ''.join(tree(x, y, s, c) for x, y, s, c in ((1100, 620, 2.6, '#2f6a1c'), (1190, 600, 3.2, '#3d7a2c'), (1300, 625, 2.4, '#2f6a1c'), (1530, 615, 2.8, '#3d7a2c')))
    t += (f'<ellipse cx="1420" cy="640" rx="80" ry="12" fill="#000" opacity="0.12"/><rect x="1360" y="560" width="120" height="80" rx="8" fill="#d9b58a"/>'
          f'<path d="M1340,566 L1420,500 L1500,566 Z" fill="#c9a24e"/><rect x="1406" y="592" width="28" height="48" rx="4" fill="{WOOD_DARK}"/>')
    for x, y in ((1250, 300), (1300, 280), (1340, 310)):
        t += f'<path d="M{x - 16},{y} q8,-10 16,0 q8,-10 16,0" stroke="{INK}" stroke-width="4" fill="none" stroke-linecap="round"/>'
    t += badge(1460, 380, 50, '#ffffff', 'binoculars', FOREST)
    return t


def m_formation():
    # Tableau de présentation, public, bulle d'échange
    f = f'<path d="M1270,640 L1300,540 M1430,640 L1400,540" stroke="{WOOD}" stroke-width="9" stroke-linecap="round"/>'
    f += shadow_rect(1210, 330, 280, 210, 14, '#ffffff')
    f += f'<rect x="1210" y="330" width="280" height="210" rx="14" fill="none" stroke="{CREAM}" stroke-width="8"/>'
    for i, (h, c) in enumerate(((60, LIGHT), (100, FOREST), (80, YELLOW), (130, FOREST))):
        f += f'<rect x="{1250 + i * 54}" y="{510 - h}" width="34" height="{h}" rx="5" fill="{c}"/>'
    for x, c in ((1060, YELLOW), (1140, FOREST), (1220, '#ffffff')):
        f += f'<path d="M{x - 34},680 a34,40 0 0 1 68,0 z" fill="{c}"/><circle cx="{x}" cy="610" r="22" fill="#7a4b2e"/>'
    f += shadow_rect(1030, 420, 130, 84, 28, '#ffffff') + f'<polygon points="1080,502 1066,530 1112,502" fill="#ffffff"/>'
    f += ''.join(f'<circle cx="{x}" cy="462" r="8" fill="{FOREST}"/>' for x in (1065, 1095, 1125))
    return f


PAGES = {
    'cabinet': (m_cabinet, {}),
    'vision': (m_vision, {}),
    'equipe': (m_equipe, {'pond': True}),
    'approche': (m_approche, {}),
    'expertises': (m_expertises, {'pond': True}),
    'expertise-etudes-environnementales-sociales': (m_eies, {}),
    'expertise-changements-climatiques': (m_climat, {}),
    'expertise-hydraulique-gire': (m_eau, {}),
    'expertise-amenagement-territoire': (m_amenagement, {}),
    'expertise-agriculture-developpement-rural': (m_agriculture, {}),
    'expertise-economie-locale': (m_economie, {}),
    'expertise-tourisme-conservation': (m_tourisme, {}),
    'expertise-formation-sensibilisation': (m_formation, {'pond': True}),
}

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (motif, opts) in PAGES.items():
        # Motif réduit de 15 % autour d'un point au sol (1270, 700) : il reste sous le menu flottant,
        # y compris sur très grand écran où la bande visible de l'image est la plus étroite.
        m = f'<g transform="translate(1270 700) scale(0.85) translate(-1270 -700)">{motif()}</g>'
        (OUT / f'hero-{name}.svg').write_text(svg(base(**opts) + '\n' + m), encoding='utf-8')
        print('ok', name)
