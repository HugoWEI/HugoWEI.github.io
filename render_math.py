"""Render LaTeX source into self-contained, accessible SVG math at build time."""
import json,re,subprocess
from pathlib import Path
from bs4 import BeautifulSoup,NavigableString
pattern=re.compile(r'\\\[(.*?)\\\]|\\\((.*?)\\\)',re.DOTALL)

def render(root):
 root=Path(root);tasks=[];matches={}
 for page in root.rglob('*.html'):
  soup=BeautifulSoup(page.read_text(encoding='utf8'),'html.parser')
  # Remove client-side MathJax (we render all equations directly at build time).
  for script in soup.find_all('script'):
   if script.get('src','').find('tex-chtml')>=0 or 'window.MathJax=' in str(script.string or ''):script.decompose()
  matched=[]
  for string in list(soup.find_all(string=True)):
   if string.parent.name in ('script','style','pre','code','textarea'):continue
   parts=list(pattern.finditer(str(string)))
   if not parts:continue
   for m in parts:
    latex=m.group(1) if m.group(1) is not None else m.group(2)
    tasks.append({'latex':latex,'display':m.group(1) is not None})
   matched.append((string,parts))
  matches[page]=(soup,matched)
 if not tasks:print('No math expressions found');return
 result=subprocess.run(['node',str(root/'math_render.cjs')],input=json.dumps(tasks),text=True,capture_output=True,check=True)
 rendered=iter(json.loads(result.stdout));total=0
 for page,(soup,entries) in matches.items():
  for textnode,parts in entries:
   old=str(textnode);pos=0;pieces=[]
   for m in parts:
    if m.start()>pos:pieces.append(NavigableString(old[pos:m.start()]))
    latex=m.group(1) if m.group(1) is not None else m.group(2)
    markup=next(rendered)
    converted=BeautifulSoup(markup,'html.parser').find('mjx-container')
    if converted is None:raise RuntimeError('Cannot parse MathJax output: '+latex)
    converted['data-latex']=latex
    converted['aria-label']='LaTeX math: '+latex
    pieces.append(converted);total+=1;pos=m.end()
   if pos<len(old):pieces.append(NavigableString(old[pos:]))
   for piece in reversed(pieces):textnode.insert_after(piece)
   textnode.extract()
  page.write_text(str(soup),encoding='utf8')
 print(f'Rendered {total} LaTeX expressions as self-contained SVG math over {len(matches)} HTML pages.')
if __name__=='__main__':render(Path(__file__).resolve().parent)
