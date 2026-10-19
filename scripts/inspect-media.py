from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import sys
sys.path.insert(0, str(Path('.tools').resolve()))

photos = sorted(Path('C:/Users/BHARATH REDDY/Pictures/sai').glob('*.jpeg'))
sheet = Image.new('RGB', (1000, ((len(photos)+4)//5)*170), 'white')
for i, photo in enumerate(photos):
    im = Image.open(photo)
    im = ImageOps.exif_transpose(im)
    im.thumbnail((194,140))
    x, y = (i%5)*200, (i//5)*170
    sheet.paste(im, (x+(194-im.width)//2,y))
    ImageDraw.Draw(sheet).text((x+6,y+143), f'{i+1:02d} | {Image.open(photo).size}', fill='black')
Path('media-review').mkdir(exist_ok=True)
sheet.save('media-review/photos.jpg')
print(f'{len(photos)} photos')
