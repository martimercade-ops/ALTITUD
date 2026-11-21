"""Extreu 5 colors dominants de cada captura de projecte -> src/data/mocks/paletes.json"""
import json, glob, os, colorsys
from PIL import Image
out = {}
for f in sorted(glob.glob("public/assets/altitud/projectes/*.jpg")):
    slug = os.path.basename(f)[:-4]
    im = Image.open(f).convert("RGB").resize((240, 150))
    q = im.quantize(colors=12, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[:36]
    counts = sorted(q.getcolors(), reverse=True)
    cols = []
    for n, i in counts:
        r, g, b = pal[i*3:i*3+3]
        h, l, s = colorsys.rgb_to_hls(r/255, g/255, b/255)
        if any(abs(r-c[0])+abs(g-c[1])+abs(b-c[2]) < 60 for c in cols):
            continue
        cols.append((r, g, b))
        if len(cols) == 5: break
    # color d'accent: el més saturat (si n'hi ha cap de prou viu)
    acc = None; best = 0
    for n, i in counts:
        r, g, b = pal[i*3:i*3+3]
        h, l, sat = colorsys.rgb_to_hls(r/255, g/255, b/255)
        score = sat * min(n, 400)
        if sat > .22 and .18 < l < .78 and score > best:
            best, acc = score, (r, g, b)
    # ordena de clar a fosc
    cols.sort(key=lambda c: -(0.299*c[0]+0.587*c[1]+0.114*c[2]))
    out[slug] = {"colors": ["#%02x%02x%02x" % c for c in cols], "accent": ("#%02x%02x%02x" % acc) if acc else None}
json.dump(out, open("src/data/mocks/paletes.json", "w"), indent=1)
print(len(out))
