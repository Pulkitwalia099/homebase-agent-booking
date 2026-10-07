from pathlib import Path
from datetime import datetime
import hashlib, re
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT=Path('/Users/pulkitwalia/Documents/ChatGPT/Homebase')
OUT=ROOT/'output/docx/homebase-business-thesis.docx'
ARCH=ROOT/'resources/archive/2026-10-06-before-word-edition'
if not ARCH.exists():
    ARCH.mkdir()
    for name in ['resources/business-thesis.md','resources/research-index.md','resources/archive/README.md']:
        p=ROOT/name; dest=ARCH/name;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(p.read_bytes())
    (ARCH/'SNAPSHOT.md').write_text('# Before the Word edition\n\nOctober 6 2026. Exact user-edited thesis and supporting files preserved before the Word edition and connector-distribution additions.\n')

pages=[
[
('title','Homebase business thesis'),
('subtitle','Discussion draft for friends and advisors  |  October 6 2026'),
('p','For years, Google was the default starting point for many people looking for a local service: search for a cleaner, compare Google or Maps listings, visit websites and call two or three businesses to make one booking. Personal AI agents are creating more ways to start that journey. People can ask their assistant, “Find me a cleaner before Friday,” and expect help getting it done. These assistants create a new entry point for local businesses to reach customers.'),
('p','**Booking a ride through Uber, ordering food through DoorDash or reserving a room through Booking.com is straightforward. Booking a local service remains a fragmented journey.** An agent may still have to search Google, bounce between websites, piece together prices, fill out forms, make calls or request a callback. One cleaner lists a starting price, another needs to inspect the home, and a third asks you to call for availability.'),
('p','Uber, DoorDash and Booking.com organize supply and transactions: what is available, what it costs and how to buy it. Agents can use that structure where supported access exists. DoorDash offers agent-ordering tools in limited beta, and Booking.com provides a partner API for search, availability and orders.[1, 2] Local services span independent businesses, different booking systems and, increasingly, AI front offices. The agent takes on the work, but the underlying process remains fragmented.'),
('p','**We will build Homebase as a shared booking layer between personal agents and participating local businesses.** We will onboard providers through the software they already use, connecting their service offerings, pricing, availability and booking operations. An assistant can then find suitable options and complete a booking through one connection. Homebase will also support changes and handle booking problems, keeping requests pending until the supplier accepts them.'),
('flow','Personal agent  →  Homebase  →  Provider software  →  Local business'),
('p','The opportunity is to organize useful supply once and make it available to multiple agents, reducing the recruitment, integration and coordination each agent company handles itself. Think of the one-integration logic of Stripe, applied to local-service booking, with the added work of service scope and fulfillment. We will start with one service, audience and location. Each business must agree to participate; connecting its software alone does not make its services bookable.'),
],
[
('h','Distribution options to explore'),
('p','A plugin and connector ecosystem already exists across platforms such as ChatGPT and Claude, including routes for custom MCP integrations. Availability and setup differ by platform, plan and permissions.[3, 4, 5] This gives Homebase a way to reach people inside the assistants they already use.'),
('p','The intended experience is simple: **“Add Homebase so you can find and book a cleaner for me.”** Where supported, the agent can help the user through setup. Account connection, authentication or approval may still require user action. One-prompt onboarding is a product goal to verify on the chosen agent, rather than a universal capability today.'),
('p','**A built-in partner integration brings Homebase into the agent’s existing booking flow.** If the partner routes eligible requests to us, customers can reach our supply without discovering and adding Homebase separately. The partnership must establish the categories, geography and routing behavior it covers. Being integrated does not automatically give us every search query.'),
('p','**A third-party connector makes customer-side distribution our responsibility.** We must give users a compelling reason to add it, help them complete setup and make Homebase useful when they next need the service. A directory listing supports discovery; active usage depends on reaching the right users and completing real tasks.'),
('p','Three routes remain open for discussion. Directory discovery and niche marketing can both support the user-added connector route.'),
('table',None),
],
[
('h','The starting wedge and the questions to resolve'),
('p','For a user-added connector, the starting wedge needs **a specific audience, an urgent problem and a meaningful concentration of existing personal-agent users**. Existing agent usage reduces the behavior change we ask of customers. We still need to establish that concentration within the chosen audience; it is a selection criterion, not an adoption figure we have measured.'),
('p','For example, “Arrange your move-in clean through your AI assistant” targets people facing a deadline in a defined city. A relocation service or apartment community could provide access to that audience. The useful segment is people who already delegate tasks to an agent and need a cleaner within a narrow time window. We then recruit suppliers whose scope, geography and capacity match those requests. This is one option to explore, not a chosen wedge.'),
('p','Homebase could develop network effects within one city and service category: relevant demand attracts participating businesses; better coverage and availability give agents more reason to use Homebase; completed bookings generate feedback that can improve matching and reliability. This depends on sufficient demand, genuinely bookable supply and permission to use the outcome data.'),
('p','**1. Where does a shared booking layer create lasting value for personal agents?** Identify the supplier access, integration work and booking coordination that Homebase can handle better than agents connecting directly to businesses, software vendors or existing marketplaces. This determines the role we can build into a business.'),
('p','**2. Which route gets Homebase into real booking flows?** Establish what a built-in partner will route to us, or which niche audience will add and use our connector. For the user-added route, the immediate questions are where those users gather, which agents they use and what pain is strong enough to motivate setup.'),
('p','These are the two decisions to resolve next. A connector is a useful feature; ongoing manual coordination can support a service business. Repeatable delivery in a niche can support vertical software. A venture-scale case requires economical expansion across supply and demand partners. Representative demand, paid continuation and production booking reliability remain to be established.'),
('sources',None)
]]
rows=[
['Route','How requests reach Homebase','What to establish'],
['Agent partnership','A partner integrates Homebase and routes eligible booking requests.','Relevant demand, agreed routing and a reason to partner rather than build directly.'],
['Directories and marketplaces','Users or agent builders discover Homebase and add the connector.','Where target users look, setup completion and conversion to fulfilled jobs.'],
['Direct niche marketing','We reach a specific audience with a painful task and help them add Homebase.','Existing agent usage, a compelling need and sustainable customer-acquisition costs.']]
sources=[
('1','DoorDash agentic ordering','https://developer.doordash.com/en-US/mcp/'),
('2','Booking.com Demand API','https://developers.booking.com/demand/docs/getting-started/overview'),
('3','ChatGPT connected apps','https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt'),
('4','Claude connectors','https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities'),
('5','ChatGPT custom MCP apps','https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt')]

doc=Document();sec=doc.sections[0]
sec.page_width=Inches(8.5);sec.page_height=Inches(11)
sec.top_margin=Inches(.65);sec.bottom_margin=Inches(.65);sec.left_margin=Inches(.8);sec.right_margin=Inches(.8)
sec.header_distance=Inches(.25);sec.footer_distance=Inches(.3)
for name in ['Normal','Title','Subtitle','Heading 1','Heading 2']:
    st=doc.styles[name];st.font.name='Calibri';st.font.color.rgb=RGBColor.from_string('000000')
    for c in list(st.element.xpath('.//w:color')):
        for attr in ('themeColor','themeTint','themeShade'):
            c.attrib.pop(qn('w:'+attr),None)
normal=doc.styles['Normal'];normal.font.size=Pt(11.5)
normal.paragraph_format.line_spacing=1.12;normal.paragraph_format.space_after=Pt(10)
normal.paragraph_format.widow_control=True
for name in ['Heading 1','Heading 2']:
    st=doc.styles[name];st.font.size=Pt(20 if name=='Heading 1' else 13)
    st.paragraph_format.space_after=Pt(12);st.paragraph_format.space_before=Pt(0)
    st.paragraph_format.keep_with_next=True
st=doc.styles['Title'];st.font.size=Pt(27);st.font.bold=True;st.paragraph_format.space_after=Pt(5)
st=doc.styles['Subtitle'];st.font.size=Pt(10);st.paragraph_format.space_after=Pt(19)
header=sec.header.paragraphs[0];header.text='HOMEBASE';header.runs[0].font.size=Pt(8);header.runs[0].font.bold=True
footer=sec.footer.paragraphs[0];footer.alignment=WD_ALIGN_PARAGRAPH.RIGHT
r=footer.add_run('Homebase  ·  Discussion draft  |  ');r.font.size=Pt(8);r.font.color.rgb=RGBColor.from_string('65717D')
fld=OxmlElement('w:fldSimple');fld.set(qn('w:instr'),'PAGE');footer._p.append(fld)

def para(text,style=None):
    p=doc.add_paragraph(style=style)
    for i,t in enumerate(re.split(r'\*\*(.*?)\*\*',text)):
        r=p.add_run(t);r.bold=(i%2==1)
    return p

def hyperlink(p,label,url):
    h=OxmlElement('w:hyperlink');h.set(qn('r:id'),p.part.relate_to(url,RT.HYPERLINK,is_external=True))
    r=OxmlElement('w:r');rp=OxmlElement('w:rPr');color=OxmlElement('w:color');color.set(qn('w:val'),'176B70');rp.append(color)
    size=OxmlElement('w:sz');size.set(qn('w:val'),'17');rp.append(size);r.append(rp)
    t=OxmlElement('w:t');t.text=label;r.append(t);h.append(r);p._p.append(h)

md=[]
for page_no,blocks in enumerate(pages):
    if page_no:doc.add_page_break()
    for kind,text in blocks:
        if kind=='title':para(text,'Title');md.append('# '+text)
        elif kind=='subtitle':para(text,'Subtitle');md.append(text)
        elif kind=='h':para(text,'Heading 1');md.append('## '+text)
        elif kind=='p':para(text);md.append(text)
        elif kind=='flow':
            p=para(text);p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.paragraph_format.space_before=Pt(2);p.paragraph_format.space_after=Pt(12)
            for r in p.runs:r.font.color.rgb=RGBColor.from_string('176B70');r.font.bold=True;r.font.size=Pt(10.5)
            md.append(text)
        elif kind=='table':
            table=doc.add_table(rows=0,cols=3);table.alignment=WD_TABLE_ALIGNMENT.CENTER;table.autofit=False
            widths=[1.3,2.75,2.85]
            for col,w in zip(table.columns,widths):col.width=Inches(w)
            pr=table._tbl.tblPr
            borders=OxmlElement('w:tblBorders')
            for edge in ['top','left','bottom','right','insideH','insideV']:
                el=OxmlElement('w:'+edge);el.set(qn('w:val'),'single');el.set(qn('w:sz'),'5');el.set(qn('w:color'),'D9D9D9');borders.append(el)
            pr.append(borders)
            for i,row in enumerate(rows):
                cells=table.add_row().cells
                trpr=table.rows[-1]._tr.get_or_add_trPr();n=OxmlElement('w:cantSplit');trpr.append(n)
                if i==0:trpr.append(OxmlElement('w:tblHeader'))
                for cell,txt,w in zip(cells,row,widths):
                    cell.width=Inches(w);cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
                    cp=cell._tc.get_or_add_tcPr();sh=OxmlElement('w:shd');sh.set(qn('w:fill'),'173B50' if i==0 else ('F0F5F7' if i%2 else 'FFFFFF'));cp.append(sh)
                    margins=OxmlElement('w:tcMar')
                    for e,v in [('top',110),('bottom',110),('left',110),('right',110)]:
                        el=OxmlElement('w:'+e);el.set(qn('w:w'),str(v));el.set(qn('w:type'),'dxa');margins.append(el)
                    cp.append(margins)
                    p=cell.paragraphs[0];p.paragraph_format.space_after=Pt(0);p.paragraph_format.line_spacing=1.05
                    r=p.add_run(txt);r.font.size=Pt(10);r.bold=i==0 or cell==cells[0]
                    r.font.color.rgb=RGBColor.from_string('FFFFFF' if i==0 else '172B36')
            md.append('\n'.join(['| '+' | '.join(rows[0])+' |','| --- | --- | --- |']+['| '+' | '.join(r)+' |' for r in rows[1:]]))
        elif kind=='sources':
            p=para('Sources');p.paragraph_format.space_before=Pt(6);p.paragraph_format.space_after=Pt(4)
            for r in p.runs:r.bold=True;r.font.size=Pt(9)
            p=doc.add_paragraph();p.paragraph_format.space_after=Pt(0);p.paragraph_format.line_spacing=1.1
            for i,(n,label,url) in enumerate(sources):
                if i:p.add_run('  •  ').font.size=Pt(8.5)
                hyperlink(p,f'[{n}] {label}',url)
            md.append('## Sources\n\n'+'\n'.join(f'- [{n}] [{label}]({url})' for n,label,url in sources))
for el in list(doc.styles.element.xpath('.//w:pBdr')) + list(doc.element.xpath('.//w:pBdr')) + list(doc.styles.element.xpath('.//w:contextualSpacing')):
    el.getparent().remove(el)
doc.core_properties.title='Homebase business thesis';doc.core_properties.subject='Local service booking through personal agents';doc.core_properties.author='Homebase';doc.core_properties.keywords='Homebase, personal agents, local services, distribution'
OUT.parent.mkdir(parents=True,exist_ok=True);doc.save(OUT)
(ROOT/'resources/business-thesis.md').write_text('\n\n'.join(md)+'\n')
print(OUT)
print('Words:',len(' '.join(md).split()))
