from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader
import hashlib,json,subprocess,zipfile,xml.etree.ElementTree as E
root=Path('/Users/pulkitwalia/Documents/ChatGPT/Homebase')
work=root/'tmp/pdfs/application-final-2026-10-10'
source=root/'output/pptx/golocal-pitch-v25.pptx'
source_hash=hashlib.sha256(source.read_bytes()).hexdigest()
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main','p':'http://schemas.openxmlformats.org/presentationml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
with zipfile.ZipFile(source) as z:
    assert len([n for n in z.namelist() if n.startswith('ppt/slides/slide') and n.endswith('.xml')])==6
    size=E.fromstring(z.read('ppt/presentation.xml')).find('p:sldSz',ns)
    page_w=int(size.get('cx'))/12700;page_h=int(size.get('cy'))/12700
    e=E.fromstring(z.read('ppt/slides/slide6.xml'))
    rels={x.get('Id'):x.get('Target') for x in E.fromstring(z.read('ppt/slides/_rels/slide6.xml.rels'))}
    links=[]
    for s in e.findall('.//p:sp',ns):
        x=s.find('.//a:hlinkClick',ns)
        if x is None:continue
        uri=rels[x.get('{'+ns['r']+'}id')]
        xf=s.find('p:spPr/a:xfrm',ns)
        off=xf.find('a:off',ns);ext=xf.find('a:ext',ns)
        left=int(off.get('x'))/12700;top=int(off.get('y'))/12700;w=int(ext.get('cx'))/12700;h=int(ext.get('cy'))/12700
        links.append((uri,(left,page_h-top-h,left+w,page_h-top)))
assert len(links)==2
out=work/'candidate.pdf'
c=canvas.Canvas(str(out),pagesize=(page_w,page_h),pageCompression=1)
c.setTitle('GoLocal | Application Pitch Deck')
c.setAuthor('Pulkit Walia')
c.setSubject('Local services booked by a personal agent | Six-slide application deck')
titles=['Local-services opportunity','Shared data and booking layer','Customer experience','Launch and growth','Partnerships and pilot','The team']
image_checks=[]
for i,title in enumerate(titles,1):
    img=root/f'tmp/agent-logos-2026-10-10/final-renders/slide-{i}.png'
    image_checks.append({'slide':i,'sha256':hashlib.sha256(img.read_bytes()).hexdigest()})
    c.bookmarkPage(f'slide-{i}');c.addOutlineEntry(title,f'slide-{i}',level=0)
    c.drawImage(ImageReader(str(img)),0,0,width=page_w,height=page_h)
    if i==6:
        for uri,rect in links:c.linkURL(uri,rect,relative=0,thickness=0)
    c.showPage()
c.save()
pdf=PdfReader(out)
assert len(pdf.pages)==6
assert all(abs(float(p.mediabox.width)-960)<.01 and abs(float(p.mediabox.height)-540)<.01 for p in pdf.pages)
assert len(pdf.pages[5].get('/Annots'))==2
assert hashlib.sha256(source.read_bytes()).hexdigest()==source_hash
render=work/'pdf-review';render.mkdir(exist_ok=True)
subprocess.run(['/Users/pulkitwalia/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm','-r','144','-png',str(out),str(render/'page')],check=True)
report={'source_deck':'output/pptx/golocal-pitch-v25.pptx','source_sha256':source_hash,'source_unchanged':True,'page_count':6,'page_size_pt':[page_w,page_h],'outline_count':6,'linkedin_links':2,'bytes':out.stat().st_size,'approved_slide_images':image_checks,'export':'High-resolution approved slide renders, losslessly embedded; source deck remains editable','native_export_fallback':'Artifact Tool PDF export encountered missing #standard-fonts/Helvetica; approved renders used for fidelity','content_changes':False}
(work/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'pages':6,'bytes':out.stat().st_size,'linkedin_links':2,'source_unchanged':True}))
