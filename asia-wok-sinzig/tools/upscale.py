import sys, numpy as np, onnxruntime as ort
from PIL import Image
M="/tmp/claude-0/-home-user/79c92132-490d-5b86-8a3c-8148e32cc91b/scratchpad/models/realesrgan-x4plus-128.onnx"
sess=ort.InferenceSession(M, providers=["CPUExecutionProvider"])
inp=sess.get_inputs()[0]; print(inp.name, inp.shape, inp.type)
T=128; S=4; PAD=12
def up(img):
    a=np.asarray(img.convert("RGB"),dtype=np.float32)/255.
    H,W,_=a.shape
    out=np.zeros((H*S,W*S,3),np.float32)
    step=T-2*PAD
    ap=np.pad(a,((PAD,PAD+T),(PAD,PAD+T),(0,0)),mode="reflect")
    for y in range(0,H,step):
        for x in range(0,W,step):
            tile=ap[y:y+T,x:x+T].transpose(2,0,1)[None]
            r=sess.run(None,{inp.name:tile.astype(np.float32)})[0][0].transpose(1,2,0)
            r=r[PAD*S:(PAD+step)*S, PAD*S:(PAD+step)*S]
            h=min(step,H-y); w=min(step,W-x)
            out[y*S:(y+h)*S, x*S:(x+w)*S]=r[:h*S,:w*S]
    return Image.fromarray((np.clip(out,0,1)*255+.5).astype(np.uint8))
src,dst=sys.argv[1],sys.argv[2]
up(Image.open(src)).save(dst); print("ok",dst)
