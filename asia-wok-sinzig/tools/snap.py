import re, numpy as np
P=['#b74207','#c89456','#5a5a19','#ceab7e','#bd610e','#c37f35','#4a3414','#996b3c','#783b14','#c08305']
h2r=lambda h: np.array([int(h[i:i+2],16) for i in (1,3,5)],float)
r2h=lambda r: '#%02x%02x%02x'%tuple(np.clip(r,0,255).round().astype(int))
C=np.array([h2r(p) for p in P])
svg=open("07_vtracer_k10.svg").read()
snap=lambda h: P[int(np.argmin(((C-h2r(h))**2).sum(1)))]
svg=re.sub(r'fill="(#[0-9A-Fa-f]{6})"',lambda m:f'fill="{snap(m.group(1).lower())}"',svg)
svg=svg.replace('width="1573" height="1402"','viewBox="0 0 1573 1402" width="1573" height="1402"')
svg=re.sub(r'<!--.*?-->\n','',svg)
open("08_logo_foto-farben.svg","w").write(svg)
# white-balance correction: paper photographed #c69500 assumed printed ~#f2b800
gain=np.array([1.22,1.24,1.22])
corr={p:r2h(h2r(p)*gain) for p in P}
corr['#5a5a19']='#5b7a2e'   # logo green, between photo 1 and 4 estimates
corr['#4a3414']='#3b2a14'   # shadow brown
svg2=re.sub(r'fill="(#[0-9a-f]{6})"',lambda m:f'fill="{corr[m.group(1)]}"',svg)
open("08_logo_farbkorrigiert.svg","w").write(svg2)
# dark-background variant: shadow + outlines lightened so they read on dark green
dark=dict(corr); dark['#5a5a19']='#9cc25c'; dark['#4a3414']='#0c140e'
svg3=re.sub(r'fill="(#[0-9a-f]{6})"',lambda m:f'fill="{dark[m.group(1)]}"',svg)
open("08_logo_dunkel.svg","w").write(svg3)
print(corr)
