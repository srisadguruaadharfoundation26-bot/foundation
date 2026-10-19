from pathlib import Path
import sys, subprocess, json, re
sys.path.insert(0,str(Path('.tools').resolve()))
import cv2, qrcode, qrcode.image.svg, imageio_ffmpeg

qr_source = cv2.imread('public/assets/donation-qr.jpg')
detector=cv2.QRCodeDetector()
payload,points,_=detector.detectAndDecode(qr_source)
if not payload:
    payload,points,_=detector.detectAndDecode(cv2.imread('public/assets/uco-bank-payment.jpg'))
if not payload:
    raise RuntimeError('Could not decode supplied QR. Do not invent payment data.')
if not payload.startswith('upi://pay?'):
    raise RuntimeError('Unexpected payment QR payload. Review before regenerating.')
qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,box_size=12,border=4)
qr.add_data(payload)
qr.make(fit=True)
qr.make_image(image_factory=qrcode.image.svg.SvgPathImage).save('public/assets/donation-qr-clear.svg')
verification = qr.make_image().convert('RGB')
import numpy as np
decoded,_,_=detector.detectAndDecode(cv2.cvtColor(np.array(verification),cv2.COLOR_RGB2BGR))
assert decoded==payload, 'Regenerated QR payload does not match original'
print('QR rebuilt as SVG and independently decoded: exact payload match.')

ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
records=[]
paths=[Path('public/assets/foundation/foundation-film.mp4')]+sorted(Path('public/assets/foundation').glob('foundation-clip-*.mp4'))
for i,path in enumerate(paths):
    # Move MP4 index to the start without recompressing or changing picture/audio quality.
    prepared=path.with_name('prepared-'+path.name)
    subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-i',str(path),'-map','0:v:0','-map','0:a?','-c','copy','-movflags','+faststart',str(prepared)],check=True)
    prepared.replace(path)
    cap=cv2.VideoCapture(str(path))
    width=int(cap.get(cv2.CAP_PROP_FRAME_WIDTH));height=int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps=cap.get(cv2.CAP_PROP_FPS);frames=cap.get(cv2.CAP_PROP_FRAME_COUNT)
    duration=frames/fps if fps else 0
    cap.set(cv2.CAP_PROP_POS_MSEC,min(2000,duration*250))
    ok,frame=cap.read();cap.release()
    assert ok, f'Cannot read {path}'
    poster=path.parent/('film-poster.jpg' if i==0 else f'clip-poster-{i}.jpg')
    cv2.imwrite(str(poster),frame,[cv2.IMWRITE_JPEG_QUALITY,95])
    records.append({'file':path.name,'width':width,'height':height,'duration':round(duration,2),'fps':round(fps,2)})
Path('media-review/video-info.json').write_text(json.dumps(records,indent=2))
print(json.dumps(records))
