from pathlib import Path
import re, hashlib
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT
ROOT=Path('/Users/pulkitwalia/Documents/ChatGPT/Homebase')
OUT=ROOT/'output/docx/homebase-business-thesis.docx'
a=ROOT/'resources/archive/2026-10-06-before-short-word-edition'
if not a.exists():
    a.mkdir()
    for source,target in [
        (Path('/Users/pulkitwalia/Downloads/homebase-business-thesis.docx'),a/'user-edited/homebase-business-thesis.docx'),
        (OUT,a/'output/docx/homebase-business-thesis.docx'),
        (ROOT/'resources/business-thesis.md',a/'resources/business-thesis.md'),
        (ROOT/'resources/research-index.md',a/'resources/research-index.md'),
        (ROOT/'resources/archive/README.md',a/'resources/archive/README.md')]:
        target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(source.read_bytes())
    (a/'SNAPSHOT.md').write_text('# Before the short Word edition\n\nOctober 6 2026. Preserves the user-edited Word document from Downloads and the existing local copies before shortening. The Downloads file remains unchanged.\n')
blocks=[
('title','Homebase business thesis'),
('subtitle','Discussion draft for friends and advisors'),
('p','For years, many people started their search for a local service on Google: compare listings, visit websites and call businesses. Personal AI agents are creating another starting point. People can now ask their assistant, “Find me a cleaner before Friday,” and expect help getting it done.'),
('p','**Booking a ride through Uber or ordering food through DoorDash is straightforward. Booking a local service remains fragmented.** The agent still has to piece together prices, check availability, fill out forms and make calls. It takes on the work, but the booking process stays the same.'),
('p','Uber, DoorDash and Booking.com organize supply and transactions in one place. Where supported access exists, agents can use that structure to complete a purchase.[1, 2] Local services are spread across independent businesses, booking systems and AI front offices. That creates an opening for a shared booking layer.'),
('p','**We will build Homebase to connect personal agents with local businesses they can book.** We will recruit participating providers and connect their existing software, giving agents access to services, prices, availability and booking through one connection.'),
('flow','Personal agent  →  Homebase  →  Provider software  →  Local business'),
('p','We organize the supply once and make it available to multiple agents. Each agent company then has less supplier recruitment, integration and coordination to handle itself. Businesses keep their existing software and authorize Homebase to arrange bookings.'),
('p','We will start with one service, audience and location. More relevant demand can attract providers, while better supplier coverage gives agents more reason to use Homebase. That cycle depends on reliable bookings and enough useful supply.'),
('h','Distribution options to explore'),
('p','Plugin ecosystems in ChatGPT and Claude already provide routes for adding custom connectors.[3, 4] Our intended experience is simple: “Add Homebase so you can book a cleaner for me.” Setup and authorization vary by platform; a single prompt will not complete every connection.'),
('p','**A built-in partnership** can bring requests through an agent’s existing booking flow, without users having to discover Homebase separately. We need an agreement on which relevant requests the partner routes to us; integration alone does not guarantee traffic.'),
('p','**A user-added connector** makes customer distribution our responsibility. We need to reach users, give them a reason to add Homebase and help them complete setup. Directories can help people discover us. Niche marketing can reach users around a specific need. These routes remain open for discussion.'),
('p','The starting wedge needs **a clear audience, an urgent problem and people already using personal agents**. For example, move-in cleaning could serve people who need a cleaner before their furniture arrives. We would choose a location and recruit providers around that need. This is an option to explore; the audience and its agent usage still need to be established.'),
('h','Two questions to resolve'),
('p','**1. Why will agents use Homebase instead of connecting directly?** Identify the supplier access and booking work we handle better than direct integrations or existing marketplaces.'),
('p','**2. How will the first customers reach us?** Establish which agent partner will route requests to Homebase, or which audience has a strong enough need to add and use our connector.'),
('p','These choices determine where we start. The next step is to identify a route to real requests, then test whether they turn into reliable bookings at a price that covers delivery costs.')
]
sources=[('1','DoorDash agentic ordering','https://developer.doordash.com/en-US/mcp/'),('2','Booking.com Demand API','https://developers.booking.com/demand/docs/getting-started/overview'),('3','ChatGPT custom MCP apps','https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt'),('4','Claude connectors','https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities')]
d=Document();sec=d.sections[0]
sec.page_width=Inches(8.5);sec.page_height=Inches(11)
sec.left_margin=sec.right_margin=Inches(.8);sec.top_margin=sec.bottom_margin=Inches(.65)
sec.header_distance=Inches(.25);sec.footer_distance=Inches(.3)
for name in ['Normal','Title','Subtitle','Heading 1']:
    st=d.styles[name];st.font.name='Calibri';st.font.color.rgb=RGBColor(0,0,0)
    for el in st.element.xpath('.//w:color'):
        for attr in ['themeColor','themeTint','themeShade']:el.attrib.pop(qn('w:'+attr),None)
n=d.styles['Normal'];n.font.size=Pt(12);n.paragraph_format.line_spacing=1.18;n.paragraph_format.space_after=Pt(10);n.paragraph_format.widow_control=True
st=d.styles['Title'];st.font.size=Pt(25);st.font.bold=True;st.paragraph_format.space_after=Pt(4)
st=d.styles['Subtitle'];st.font.size=Pt(10);st.paragraph_format.space_after=Pt(15);st.font.italic=False
st=d.styles['Heading 1'];st.font.size=Pt(15);st.font.bold=True;st.paragraph_format.space_before=Pt(9);st.paragraph_format.space_after=Pt(8);st.paragraph_format.keep_with_next=True
h=sec.header.paragraphs[0];h.text='HOMEBASE';h.runs[0].font.size=Pt(8);h.runs[0].bold=True
f=sec.footer.paragraphs[0];f.alignment=WD_ALIGN_PARAGRAPH.RIGHT
r=f.add_run('Homebase  |  October 6 2026  |  ');r.font.size=Pt(8);r.font.color.rgb=RGBColor.from_string('65717D')
fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');f._p.append(fld)
md=[]
for kind,text in blocks:
    style={'title':'Title','subtitle':'Subtitle','h':'Heading 1'}.get(kind)
    p=d.add_paragraph(style=style)
    if kind=='h' and text=='Distribution options to explore':p.paragraph_format.page_break_before=True
    for i,t in enumerate(re.split(r'\*\*(.*?)\*\*',text)):
        r=p.add_run(t)
        if i%2:r.bold=True
    if kind=='flow':
        p.alignment=WD_ALIGN_PARAGRAPH.CENTER
        for r in p.runs:r.font.color.rgb=RGBColor.from_string('176B70');r.bold=True;r.font.size=Pt(10.5)
    md.append(('# ' if kind=='title' else '## ' if kind=='h' else '')+text)
p=d.add_paragraph();p.paragraph_format.space_before=Pt(3);p.paragraph_format.space_after=Pt(0)
for i,(n,label,url) in enumerate(sources):
    if i:p.add_run('  •  ').font.size=Pt(8.5)
    h=OxmlElement('w:hyperlink');h.set(qn('r:id'),p.part.relate_to(url,RT.HYPERLINK,is_external=True))
    r=OxmlElement('w:r');rp=OxmlElement('w:rPr');color=OxmlElement('w:color');color.set(qn('w:val'),'176B70');rp.append(color)
    sz=OxmlElement('w:sz');sz.set(qn('w:val'),'17');rp.append(sz);r.append(rp)
    t=OxmlElement('w:t');t.text=f'[{n}] {label}';r.append(t);h.append(r);p._p.append(h)
for el in list(d.styles.element.xpath('.//w:pBdr'))+list(d.element.xpath('.//w:pBdr'))+list(d.styles.element.xpath('.//w:contextualSpacing')):el.getparent().remove(el)
d.core_properties.title='Homebase business thesis';d.core_properties.author='Homebase';d.core_properties.subject='Local-service booking through personal agents'
d.save(OUT)
md.append('## Sources\n\n'+'\n'.join(f'- [{n}] [{label}]({url})' for n,label,url in sources))
(ROOT/'resources/business-thesis.md').write_text('\n\n'.join(md)+'\n')
print('Words:',len(' '.join(text for _,text in blocks).split()))
print(OUT)
