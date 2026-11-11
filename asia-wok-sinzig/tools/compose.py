import numpy as np, cv2
from PIL import Image
C=np.asarray(Image.open("03_zuschnitt_esrgan4x.png").convert("RGB"),np.float32)/255
A=np.asarray(Image.open("03_alpha_esrgan4x.png").convert("L"),np.float32)/255
A=cv2.GaussianBlur(A,(0,0),0.8)
A=np.clip((A-0.04)/0.92,0,1)          # clean faint haze, keep soft edges
# background estimate via normalized convolution of clear-bg pixels
m=(A<0.02).astype(np.float32)
small=lambda x: cv2.resize(x,(C.shape[1]//8,C.shape[0]//8),interpolation=cv2.INTER_AREA)
ms=small(m); num=np.dstack([small(C[...,i]*m) for i in range(3)])
k=(0,0); s=25
den=cv2.GaussianBlur(ms,k,s)[...,None]+1e-6
B=np.dstack([cv2.GaussianBlur(num[...,i],k,s) for i in range(3)])/den
B=cv2.resize(B,(C.shape[1],C.shape[0]),interpolation=cv2.INTER_CUBIC)
a=A[...,None]
F=np.where(a>0.05,(C-(1-a)*B)/np.maximum(a,0.05),C)
F=np.clip(F,0,1)
out=np.dstack([F,A])
Image.fromarray((out*255+.5).astype(np.uint8),"RGBA").save("04_freigestellt_4x.png")
im=Image.open("04_freigestellt_4x.png"); bb=im.getbbox(); pad=60
im=im.crop((bb[0]-pad,bb[1]-pad,bb[2]+pad,bb[3]+pad)); im.save("05_freigestellt_4x_getrimmt.png"); print(im.size)
