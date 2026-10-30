/* Build-time LaTeX -> accessible inline SVG; no runtime CDN dependency. */
const fs = require('fs');
const root = (() => {
  try { return require.resolve('mathjax-full/package.json').replace(/package\.json$/, 'js/'); }
  catch (_) { return '/opt/nvm/versions/node/v22.16.0/lib/node_modules/mathjax-full/js/'; }
})();
const {mathjax}=require(root+'mathjax.js');
const {TeX}=require(root+'input/tex.js');
const {SVG}=require(root+'output/svg.js');
const {liteAdaptor}=require(root+'adaptors/liteAdaptor.js');
const {RegisterHTMLHandler}=require(root+'handlers/html.js');
const {AllPackages}=require(root+'input/tex/AllPackages.js');
const adaptor=liteAdaptor();RegisterHTMLHandler(adaptor);
const doc=mathjax.document('',{InputJax:new TeX({packages:AllPackages}),OutputJax:new SVG({fontCache:'local'})});
const input=JSON.parse(fs.readFileSync(0,'utf8'));
const output=input.map(({latex,display})=>{
 try {const html=adaptor.outerHTML(doc.convert(latex,{display}));
  if(html.includes('data-mjx-error'))throw Error('MathJax reported an error in '+latex);
  return html;
 } catch(err){ throw Error(latex+' :: '+err); }
});
process.stdout.write(JSON.stringify(output));
