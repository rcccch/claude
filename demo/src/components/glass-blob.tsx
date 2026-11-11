"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { glassState } from "@/lib/gsap";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uHeat;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  // Ashima simplex noise (MIT)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    // Heißes Glas ist flüssig und bewegt sich stark, kaltes kaum.
    float amp = mix(0.035, 0.17, uHeat);
    vec3 p = position + vec3(uPointer * 0.35, 0.0);
    float n = snoise(p * 1.05 + vec3(0.0, uTime * 0.22, uTime * 0.1));
    float n2 = snoise(p * 2.2 - uTime * 0.15) * 0.2;
    float d = (n + n2) * amp;
    // Schwerkraft: heißes Glas sackt nach unten
    float sag = -max(0.0, -position.y) * 0.12 * uHeat;
    vec3 displaced = position + normal * d + vec3(0.0, sag, 0.0);
    vNoise = n;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vView = normalize(-mv.xyz);
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uHeat;
  uniform vec3 uHot;
  uniform vec3 uCore;
  uniform vec3 uCold;
  uniform vec3 uRim;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vNoise;

  void main(){
    float fres = pow(1.0 - max(dot(normalize(vNormal), vView), 0.0), 2.2);
    // Glut von innen
    vec3 molten = mix(uHot, uCore, smoothstep(-0.4, 0.8, vNoise));
    vec3 glass = mix(uCold, uRim, smoothstep(0.0, 1.0, fres + vNoise * 0.15));
    // Abkühlen von außen nach innen: der glühende Kern zieht sich zurück.
    float core = (1.0 - fres) * 0.7 + vNoise * 0.3;
    float glow = smoothstep(-0.12, 0.22, core + uHeat * 1.1 - 0.75);
    vec3 col = mix(glass, molten, glow);
    col += fres * mix(vec3(0.75, 0.85, 1.0), vec3(1.0, 0.85, 0.5), glow) * 0.5;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Blob({ animate }: { animate: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2());
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHeat: { value: 1 },
      uPointer: { value: new THREE.Vector2() },
      uHot: { value: new THREE.Color("#ff8a1f") },
      uCore: { value: new THREE.Color("#ffd27a") },
      uCold: { value: new THREE.Color("#1d2f86") },
      uRim: { value: new THREE.Color("#9fc3ff") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const u = material.current?.uniforms;
    if (!u) return;
    if (animate) u.uTime.value += delta;
    u.uHeat.value = THREE.MathUtils.damp(
      u.uHeat.value,
      glassState.heat,
      4,
      delta,
    );
    pointer.current.lerp(state.pointer, 0.05);
    u.uPointer.value.copy(pointer.current);
    if (mesh.current && animate) {
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x = pointer.current.y * 0.25;
    }
  });

  return (
    <mesh ref={mesh} scale={1.18}>
      <icosahedronGeometry args={[1, 40]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function GlassBlob() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Render-Loop pausieren, sobald die Szene nicht sichtbar ist (spart Akku und Main-Thread).
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrapper.current) io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="size-full">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={reduced || !visible ? "demand" : "always"}
        aria-hidden="true"
      >
        <Blob animate={!reduced} />
      </Canvas>
    </div>
  );
}
