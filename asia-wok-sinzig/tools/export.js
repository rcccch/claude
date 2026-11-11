// node export.js svg out.png width [bg] [viewBox]
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const [svgf,out,w,bg='transparent',vb]=process.argv.slice(2);
let svg=fs.readFileSync(svgf,'utf8');
if(vb) svg=svg.replace(/viewBox="[^"]*"/,`viewBox="${vb}"`).replace(/ width="\d+" height="\d+"/,'');
const m=svg.match(/viewBox="([\d. -]+)"/)[1].split(/\s+/).map(Number); const W=+w, H=Math.round(W*m[3]/m[2]);
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:W,height:H}});
await p.setContent(`<body style="margin:0;background:${bg}"><img style="width:${W}px;height:${H}px;display:block" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body>`);
await p.waitForTimeout(200); await p.screenshot({path:out,omitBackground:bg==='transparent'}); await b.close();})();
