import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I)){
const g=readFileSync(join(I,d,'program.bin')),n=readFileSync(join(I,d,'input.bin'));
const s=[],c=[],m=new Int32Array(256),o=[];let p=0,t=0,q=0,e;
while(e===undefined){
if(t>=1e6){e=10;break}
if(p<0||p>=g.length){e=9;break}
const op=g[p];if(!(op<=7||op>=16&&op<=30||op>=32&&op<=34||op>=48&&op<=52||op==64||op==65||op>=80&&op<=83)){e=5;break}
const L=op==1?1:op==2?4:op>=48&&op<=51?2:0;
if(p+1+L>g.length){e=9;break}
t++;const nx=p+1+L,w=((g[p+1]|g[p+2]<<8)<<16)>>16,nd=k=>s.length<k,fl=()=>s.length>255;
if(op==0)e=0;
else if(op==1){if(fl())e=3;else{s.push(g[p+1]<<24>>24);p=nx}}
else if(op==2){if(fl())e=3;else{s.push(g[p+1]|g[p+2]<<8|g[p+3]<<16|g[p+4]<<24);p=nx}}
else if(op==3){if(nd(1))e=2;else{s.pop();p=nx}}
else if(op==4){if(nd(1))e=2;else if(fl())e=3;else{s.push(s.at(-1));p=nx}}
else if(op==5){if(nd(2))e=2;else{const b=s.pop(),a=s.pop();s.push(b,a);p=nx}}
else if(op==6){if(nd(2))e=2;else if(fl())e=3;else{s.push(s.at(-2));p=nx}}
else if(op==7){if(nd(3))e=2;else{const z=s.pop(),b=s.pop(),a=s.pop();s.push(b,z,a);p=nx}}
else if(op==23){if(nd(1))e=2;else{s.push(-s.pop()|0);p=nx}}
else if(op==27){if(nd(1))e=2;else{s.push(~s.pop());p=nx}}
else if(op==48)p=nx+w;
else if(op==49){if(nd(1))e=2;else p=s.pop()==0?nx+w:nx}
else if(op==50){if(nd(1))e=2;else p=s.pop()!=0?nx+w:nx}
else if(op==51){if(c.length>63)e=7;else{c.push(nx);p=g[p+1]|g[p+2]<<8}}
else if(op==52){if(!c.length)e=8;else p=c.pop()}
else if(op==64){if(nd(1))e=2;else{const a=s.pop();if(a<0||a>255)e=6;else{s.push(m[a]);p=nx}}}
else if(op==65){if(nd(2))e=2;else{const a=s.pop(),v=s.pop();if(a<0||a>255)e=6;else{m[a]=v;p=nx}}}
else if(op==80){if(nd(1))e=2;else{const v=String(s.pop());if(o.length+v.length>65536)e=11;else{for(const h of v)o.push(h.charCodeAt(0));p=nx}}}
else if(op==81){if(nd(1))e=2;else if(o.length>65535)e=11;else{o.push(s.pop()&255);p=nx}}
else if(op==82){if(fl())e=3;else{s.push(q<n.length?n[q++]:-1);p=nx}}
else if(op==83){if(nd(1))e=2;else e=s.pop()&255}
else{if(nd(2))e=2;else{const b=s.pop(),a=s.pop();
if((op==19||op==20||op==21||op==22)&&b==0)e=4;
else{s.push(op==16?a+b|0:op==17?a-b|0:op==18?Math.imul(a,b):op==19?Math.trunc(a/b)|0:op==20?a%b|0:op==21?Math.trunc((a>>>0)/(b>>>0))|0:op==22?(a>>>0)%(b>>>0)|0:op==24?a&b:op==25?a|b:op==26?a^b:op==28?a<<(b&31):op==29?a>>(b&31):op==30?a>>>(b&31)|0:op==32?a==b?1:0:op==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0);p=nx}}}
}
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),Buffer.from(o));
writeFileSync(join(O,d,'exit.txt'),e+'\n');
}
