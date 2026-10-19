from pathlib import Path
import shutil, json

source = Path('C:/Users/BHARATH REDDY/Pictures/sai')
target = Path('public/assets/foundation')
target.mkdir(parents=True, exist_ok=True)
photos = sorted(source.glob('*.jpeg'))
captions = [
    'A room at the foundation', 'Resident care room', 'Our care spaces',
    'A room at the foundation', 'Resident care room', 'Our care spaces',
    'Resident care room', 'Washroom facilities', 'Reception at the foundation',
    'Inside the foundation', 'Reception at the foundation', 'Welcome to our foundation',
    'Outside the foundation', 'Foundation information', 'Inside the foundation',
    'Our foundation building', 'An indoor space', 'Entrance to the foundation',
    'Our dining space', 'Our dining space', 'Inside the foundation',
    'Foundation information', 'A room at the foundation',
]
items=[]
for i, photo in enumerate(photos):
    name = f'photo-{i+1:02d}.jpeg'
    shutil.copy2(photo, target/name)
    from PIL import Image
    width,height=Image.open(photo).size
    items.append({'src': f'assets/foundation/{name}', 'caption': captions[i] if i<len(captions) else 'Community moments at the foundation', 'category': 'spaces' if i<23 else 'community', 'width':width,'height':height})
videos=[]
for i, video in enumerate(sorted(source.glob('*.mp4'))):
    name=f'foundation-clip-{i+1:02d}.mp4'
    shutil.copy2(video,target/name)
    videos.append({'src':f'assets/foundation/{name}','title':f'Community moments {i+1:02d}'})
shutil.copy2(Path('C:/Users/BHARATH REDDY/Pictures/WhatsApp Video 2026-10-08 at 00.21.13.mp4'),target/'foundation-film.mp4')
Path('src/media.json').write_text(json.dumps({'photos':items,'videos':videos},indent=2),encoding='utf-8')
print(f'Imported {len(items)} photos and {len(videos)+1} original videos.')
