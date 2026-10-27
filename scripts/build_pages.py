#!/usr/bin/env python3
"""Build static GitHub project Pages from site/, with no dependencies."""
from pathlib import Path
import argparse,re,shutil
ROOT=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base-path',default='/thaikim-design-studio/')
a=parser.parse_args()
base='/' + a.base_path.strip('/') + '/' if a.base_path.strip('/') else '/'
if not re.fullmatch(r'/[A-Za-z0-9_/-]*/?',base):raise SystemExit('Invalid base path')
source=ROOT/'site';output=ROOT/'docs'
if not (source/'index.html').is_file():raise SystemExit('site/index.html missing')
output.mkdir(exist_ok=True)
for old in output.iterdir():
 if old.is_dir():shutil.rmtree(old)
 else:old.unlink()
text_extensions={'.html','.js','.css','.json','.svg','.txt'}
# Rebase quoted root-relative URLs, including JS template literals.
# This deliberately does not rewrite regex literals or https:// URLs.
pattern=re.compile(r"""(["'`])/(?!/)(?=[A-Za-z0-9${?#]|["'`])""")
for p in source.rglob('*'):
 if not p.is_file() or p.is_symlink():continue
 rel=p.relative_to(source);dest=output/rel;dest.parent.mkdir(parents=True,exist_ok=True)
 if p.suffix in text_extensions:
  text=p.read_text()
  if base!='/':
   text=pattern.sub(lambda m:m.group(1)+base,text)
   text=re.sub(r'url\(/(?!/)',lambda m:'url('+base,text)
  dest.write_text(text)
 else:shutil.copy2(p,dest)
(output/'.nojekyll').write_text('')
print('Built',sum(p.is_file() for p in output.rglob('*')),'static files; base path',base)
