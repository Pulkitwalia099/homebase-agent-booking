from pathlib import Path
import zipfile
import xml.etree.ElementTree as ET

path=Path(__file__).parent/'candidate.pptx'
A='http://schemas.openxmlformats.org/drawingml/2006/main'
R='http://schemas.openxmlformats.org/officeDocument/2006/relationships'
P='http://schemas.openxmlformats.org/presentationml/2006/main'
REL='http://schemas.openxmlformats.org/package/2006/relationships'
for prefix,uri in [('a',A),('r',R),('p',P)]:ET.register_namespace(prefix,uri)
with zipfile.ZipFile(path) as z:
 files={n:z.read(n) for n in z.namelist()}
root=ET.fromstring(files['ppt/slides/slide6.xml'])
rp='ppt/slides/_rels/slide6.xml.rels'
rels=ET.fromstring(files[rp])
links={
 'LinkedIn: pulkitwalia':'https://www.linkedin.com/in/pulkitwalia/',
 'Pulkit Walia':'https://www.linkedin.com/in/pulkitwalia/',
 'LinkedIn: rohit-jain-343437187':'https://www.linkedin.com/in/rohit-jain-343437187/',
 'Rohit Jain':'https://www.linkedin.com/in/rohit-jain-343437187/'
}
used={e.attrib['Id'] for e in rels};number=1000;count=0
for run in root.iter(f'{{{A}}}r'):
 t=run.find(f'{{{A}}}t')
 if t is None or t.text not in links:continue
 while f'rId{number}' in used:number+=1
 rid=f'rId{number}';used.add(rid)
 ET.SubElement(rels,f'{{{REL}}}Relationship',{'Id':rid,'Type':R+'/hyperlink','Target':links[t.text],'TargetMode':'External'})
 props=run.find(f'{{{A}}}rPr')
 if props is None:props=ET.Element(f'{{{A}}}rPr');run.insert(0,props)
 ET.SubElement(props,f'{{{A}}}hlinkClick',{f'{{{R}}}id':rid})
 count+=1
assert count==4,count
files['ppt/slides/slide6.xml']=ET.tostring(root,encoding='utf-8',xml_declaration=True)
files[rp]=ET.tostring(rels,encoding='utf-8',xml_declaration=True)
with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
 for n,data in files.items():z.writestr(n,data)
print('Added four native hyperlinks to the supplied LinkedIn profiles.')
