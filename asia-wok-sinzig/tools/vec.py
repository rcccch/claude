import numpy as np, vtracer, cv2
from PIL import Image
from sklearn.cluster import KMeans
im=Image.open("05_freigestellt_4x_getrimmt.png").convert("RGBA")
im=im.resize((im.width//2,im.height//2),Image.LANCZOS)
a=np.asarray(im).astype(np.float32)
rgb=a[...,:3]; al=a[...,3]
# median filter to flatten JPEG noise before quantizing
rgb=cv2.bilateralFilter(rgb.astype(np.uint8),9,40,9).astype(np.float32)
mask=al>128
for K in (10,16):
    km=KMeans(K,n_init=4,random_state=0).fit(rgb[mask][::7])
    lab=km.predict(rgb.reshape(-1,3)).reshape(al.shape)
    q=km.cluster_centers_[lab]
    out=np.dstack([q,np.where(mask,255,0)]).astype(np.uint8)
    p=f"06_quantisiert_k{K}.png"; Image.fromarray(out,"RGBA").save(p)
    vtracer.convert_image_to_svg_py(p,f"07_vtracer_k{K}.svg",colormode="color",hierarchical="stacked",mode="spline",
        filter_speckle=6,color_precision=8,layer_difference=8,corner_threshold=60,length_threshold=4,splice_threshold=45,path_precision=2)
    print(K,[ '#%02x%02x%02x'%tuple(int(v) for v in c) for c in km.cluster_centers_])
