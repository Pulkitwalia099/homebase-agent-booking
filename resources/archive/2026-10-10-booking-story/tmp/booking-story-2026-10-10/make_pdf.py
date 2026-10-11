from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader
import subprocess

root=Path('/Users/pulkitwalia/Documents/ChatGPT/Homebase')
work=root/'tmp/booking-story-2026-10-10'
out=root/'output/pdf/golocal-pitch-v12.pdf'
c=canvas.Canvas(str(out),pagesize=(960,540))
c.setTitle('GoLocal | Local-services opportunity')
c.setAuthor('Pulkit Walia')
c.setSubject('Six-slide pitch: local services, booked by your personal agent')
for i in range(1,7):
    c.drawImage(ImageReader(str(work/f'final-renders/slide-{i}.png')),0,0,width=960,height=540)
    c.showPage()
c.save()
assert len(PdfReader(out).pages)==6
render=work/'pdf-review'; render.mkdir(exist_ok=True)
subprocess.run(['pdftoppm','-r','96','-png',str(out),str(render/'page')],check=True)
print(f'PDF verified: 6 pages, {out.stat().st_size:,} bytes')
