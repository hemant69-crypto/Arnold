// Original Arnold artwork. UVs and the lens centre share the same bottom-left origin.
export const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main(){ vUv=uv; gl_Position=vec4(position,0.,1.); }
`;

export const fieldFragment = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform float uScene;
uniform sampler2D tFlow;
uniform vec4 uLens;
uniform vec2 uVelocity;
uniform float uHasFlow;
float grain(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 artwork(vec2 uv){
  float t=uTime*.09;
  vec2 p=(uv-.5)*vec2(uResolution.x/uResolution.y,1.);
  vec2 q=p;
  q.x+=.19*sin(p.y*3.7+t)+.075*sin(p.y*8.-t*.6);
  q.y+=.15*sin(p.x*2.4-t*.7)+.06*cos(p.x*6.+t);
  float curve=q.y+.10+.24*sin(q.x*1.65+t*.6);
  float current=1.-smoothstep(.10,.47,abs(curve));
  float edge=exp(-abs(abs(curve)-.31)*42.);
  float fold=.5+.5*sin(q.x*5.+q.y*7.+sin(q.x*3.-t)*1.5);
  float warm=smoothstep(-.12,.65,q.x+.20*sin(q.y*3.+t));
  vec3 blue=mix(vec3(.025,.055,.26),vec3(.16,.30,.91),fold);
  vec3 ember=mix(vec3(.27,.014,.035),vec3(.94,.27,.09),fold);
  ember=mix(ember,vec3(.51,.045,.20),clamp(uScene*.12,0.,.35));
  vec3 hue=mix(blue,ember,warm);
  vec3 col=hue*(current*.82+edge*.85);
  col+=vec3(.12,.20,.48)*pow(fold,14.)*current*.35;
  float darkCentre=1.-.28*exp(-dot(p*vec2(1.5,2.),p*vec2(1.5,2.)));
  float vignette=1.-smoothstep(.60,1.55,length(p*vec2(.70,1.)));
  return col*darkCentre*vignette;
}
void main(){
  float aspect=uResolution.x/uResolution.y;
  vec2 uv=vUv;
  vec3 flow=texture2D(tFlow,uv).rgb;
  uv-=(flow.rg-.5)*flow.b*.22*uHasFlow;
  vec2 delta=(vUv-uLens.xy)*vec2(aspect,1.);
  float distancePx=length(delta)*uResolution.y;
  float radius=max(uLens.z,1.);
  float inside=(1.-smoothstep(radius-2.,radius+2.,distancePx))*uLens.w;
  float radial=1.-clamp(distancePx/radius,0.,1.);
  vec2 ray=delta/vec2(aspect,1.);
  uv-=ray*radial*.20*inside;
  uv-=uVelocity*exp(-dot(delta,delta)*48.)*.018*uLens.w;
  vec3 col=artwork(uv);
  if(inside>.001){
    col.r=artwork(uv+ray*.009*inside).r;
    col.b=artwork(uv-ray*.009*inside).b;
    col*=1.+.10*inside;
  }
  float rim=exp(-pow((distancePx-radius)/1.25,2.))*uLens.w;
  col+=vec3(.35,.39,.48)*rim;
  col+=(grain(gl_FragCoord.xy)-.5)*.027;
  gl_FragColor=vec4(max(col,vec3(0.)),1.);
}
`;

// Unsigned-byte feedback avoids a mandatory float-render-target extension.
// RG stores signed velocity around 0.5; B stores the dissipating wake strength.
export const flowFragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tPrevious;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uAspect;
uniform float uDecay;
uniform float uStamp;
void main(){
  vec3 previous=texture2D(tPrevious,vUv).rgb;
  vec2 velocity=(previous.rg-.5)*uDecay;
  float energy=previous.b*uDecay;
  vec2 delta=(vUv-uMouse)*vec2(uAspect,1.);
  float influence=(1.-smoothstep(0.,.17,length(delta)))*uStamp;
  velocity=mix(velocity,uVelocity*.5,influence);
  energy=max(energy,influence);
  gl_FragColor=vec4(velocity+.5,energy,1.);
}
`;
