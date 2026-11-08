"""Generate responsive previews; retain original photos for the full-size viewer.
Run with Python and Pillow after adding photos to src/media.json.
"""
from pathlib import Path
import json
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
media = json.loads((root / "src/media.json").read_text(encoding="utf-8"))
output = root / "public/assets/optimized"
output.mkdir(exist_ok=True)
assets = {}
original_bytes = 0
preview_bytes = 0
for photo in media["photos"]:
    source = root / "public" / photo["src"]
    original_bytes += source.stat().st_size
    variants = []
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        for width in (400, 800):
            width = min(width, image.width)
            name = f"{source.stem}-{width}.webp"
            preview = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            preview.save(output / name, "WEBP", quality=84, method=6)
            variants.append((f"assets/optimized/{name}", width))
        preview_bytes += (output / f"{source.stem}-400.webp").stat().st_size
    assets[photo["src"]] = {"src": variants[0][0], "srcSet": ", ".join(f"{url} {width}w" for url, width in variants)}
(root / "src/image-assets.json").write_text(json.dumps(assets, indent=2) + "\n", encoding="utf-8")
with Image.open(root / "public/assets/fhc-care.png") as image:
    image.convert("RGB").save(output / "fhc-care.webp", "WEBP", quality=88, method=6)
print(f"Gallery source bytes: {original_bytes:,}; 400px previews: {preview_bytes:,}; saved {100 * (1-preview_bytes/original_bytes):.1f}%")
