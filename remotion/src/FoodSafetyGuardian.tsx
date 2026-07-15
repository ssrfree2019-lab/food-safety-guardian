import '@fontsource/noto-sans-sc/500.css';
import '@fontsource/noto-sans-sc/700.css';
import '@fontsource/noto-sans-sc/900.css';
import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Easing, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';

const C={navy:'#061525',blue:'#28B8FF',white:'#F4FAFF',red:'#FF3B3B',gold:'#FFC857'};
const ease=Easing.bezier(0.16,1,0.3,1);

const enter=(f:number,delay=0,duration=18)=>interpolate(f,[delay,delay+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
const sceneOpacity=(f:number,d:number)=>interpolate(f,[0,10,d-12,d],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

const Grain=()=> <AbsoluteFill style={{opacity:.15,backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.28%22/%3E%3C/svg%3E")',mixBlendMode:'soft-light'}}/>;

const Factory=({warm=false}:{warm?:boolean})=>{
  const f=useCurrentFrame();
  const drift=interpolate(f,[0,900],[0,-60]);
  return <AbsoluteFill style={{overflow:'hidden',background:warm?'radial-gradient(circle at 60% 24%,#163d4c 0%,#081d2b 38%,#061525 78%)':'radial-gradient(circle at 50% 18%,#173040 0%,#091b2b 36%,#061525 76%)'}}>
    <div style={{position:'absolute',inset:0,opacity:.32,translate:`${drift}px 0`,backgroundImage:'linear-gradient(90deg,transparent 9%,#7ba4b322 10%,transparent 11%),linear-gradient(0deg,transparent 14%,#a8cbd622 15%,transparent 16%)',backgroundSize:'180px 220px'}}/>
    <div style={{position:'absolute',left:-160,right:-160,bottom:245,height:330,background:'linear-gradient(180deg,#91aab31e,#172d38 55%,#07111b)',clipPath:'polygon(0 32%,12% 21%,25% 30%,38% 12%,52% 27%,66% 11%,82% 23%,100% 12%,100% 100%,0 100%)'}}/>
    {[130,380,650,900].map((x,i)=><div key={x} style={{position:'absolute',left:x,bottom:420,width:110,height:500,border:'3px solid #8bb7c322',background:'#bbd4da09',boxShadow:'inset 0 0 35px #b9e9ff10'}}><div style={{height:12,background:i===2&&warm?C.blue:'#799aa633',marginTop:95}}/><div style={{height:8,background:'#799aa633',marginTop:112}}/></div>)}
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:390,background:'linear-gradient(170deg,#102b38 0%,#06121d 65%)',borderTop:'3px solid #8bb7c32f'}}/>
    <Grain/>
  </AbsoluteFill>;
};

const Worker=({action='walk',blue=false}:{action?:'walk'|'inspect'|'stop'|'stand';blue?:boolean})=>{
  const f=useCurrentFrame();
  const bob=action==='walk'?Math.sin(f*.28)*8:0;
  const arm=action==='inspect'?-28:action==='stop'?-62:10;
  return <div style={{position:'relative',width:320,height:820,filter:`drop-shadow(0 28px 26px #000a)`,translate:`0 ${bob}px`}}>
    <div style={{position:'absolute',left:90,top:14,width:146,height:154,borderRadius:'52% 52% 46% 46%',background:'linear-gradient(145deg,#dfeaf0,#91a6af)',border:'10px solid #d7edf4',boxShadow:`0 0 35px ${blue?C.blue+'77':'#9bc0cf33'}`}}/>
    <div style={{position:'absolute',left:106,top:88,width:112,height:54,borderRadius:18,background:'#d9f0f4',border:'3px solid #8fb5c2'}}/>
    <div style={{position:'absolute',left:51,top:150,width:230,height:410,borderRadius:'74px 74px 38px 38px',background:'linear-gradient(90deg,#c7d9df,#eef6f8 46%,#b5cbd3)',border:'3px solid #8aa7b3',overflow:'hidden'}}><div style={{position:'absolute',left:'50%',top:0,bottom:0,width:4,background:'#829da8'}}/><div style={{position:'absolute',left:30,top:78,width:68,height:8,background:blue?C.blue:'#78939d',boxShadow:blue?`0 0 20px ${C.blue}`:'none'}}/></div>
    <div style={{position:'absolute',left:30,top:208,width:74,height:330,borderRadius:40,background:'#d5e5e9',rotate:`${arm}deg`,transformOrigin:'50% 10%'}}/>
    <div style={{position:'absolute',right:12,top:210,width:74,height:332,borderRadius:40,background:'#bfd3da',rotate:`${-arm*.55}deg`,transformOrigin:'50% 10%'}}/>
    <div style={{position:'absolute',left:64,top:520,width:92,height:282,borderRadius:'18px 18px 44px 44px',background:'#c1d4da'}}/>
    <div style={{position:'absolute',right:57,top:520,width:92,height:282,borderRadius:'18px 18px 44px 44px',background:'#b4cbd3'}}/>
  </div>;
};

const Caption=({children}:{children:React.ReactNode})=> <div style={{position:'absolute',left:80,right:80,bottom:132,minHeight:126,display:'flex',alignItems:'center',justifyContent:'center',padding:'24px 38px',boxSizing:'border-box',borderRadius:28,background:'#03101bd9',border:'2px solid #a8dfff33',boxShadow:'0 20px 50px #0008',color:C.white,fontSize:50,fontWeight:700,lineHeight:1.35,textAlign:'center',letterSpacing:2}}>{children}</div>;
const Kicker=({children,color=C.blue}:{children:React.ReactNode;color?:string})=><div style={{color,fontSize:34,fontWeight:700,letterSpacing:8,textTransform:'uppercase'}}>{children}</div>;

const Scene1=()=>{const f=useCurrentFrame();const a=enter(f,4,25);return <AbsoluteFill style={{opacity:sceneOpacity(f,90)}}><Factory/><div style={{position:'absolute',top:180,left:82,right:82,opacity:a,translate:`0 ${interpolate(a,[0,1],[70,0])}px`}}><Kicker>QUALITY / 01</Kicker><div style={{fontSize:104,fontWeight:900,lineHeight:1.08,color:C.white,marginTop:20,textShadow:'0 15px 50px #000'}}>每一次放行<br/>都是一次考验</div></div><div style={{position:'absolute',left:380,bottom:360,scale:interpolate(a,[0,1],[.88,1])}}><Worker action="walk"/></div><div style={{position:'absolute',top:0,bottom:0,left:0,width:18,background:C.red,opacity:interpolate(f,[0,30],[0,.8])}}/><Caption>每一次放行，都可能是一场考验</Caption></AbsoluteFill>};

const Barrier=({label,left,delay}:{label:string;left:number;delay:number})=>{const f=useCurrentFrame();const a=enter(f,delay,16);return <div style={{position:'absolute',left,top:290,width:250,height:990,opacity:a,translate:`${interpolate(a,[0,1],[260,0])}px 0`,background:'linear-gradient(180deg,#ff3b3b12,#ff3b3b66,#ff3b3b16)',border:`5px solid ${C.red}`,boxShadow:`0 0 55px ${C.red}55,inset 0 0 70px ${C.red}22`,backdropFilter:'blur(3px)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{fontSize:66,fontWeight:900,color:C.white,writingMode:'vertical-rl',letterSpacing:14,textShadow:`0 0 22px ${C.red}`}}>{label}</div></div>};
const Scene2=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{opacity:sceneOpacity(f,150)}}><Factory/><div style={{position:'absolute',left:40,bottom:330,scale:.83}}><Worker action="walk"/></div><Barrier label="交期" left={360} delay={10}/><Barrier label="产量" left={650} delay={24}/><Barrier label="别停线" left={940} delay={38}/><div style={{position:'absolute',top:150,left:80,opacity:enter(f,5)}}><Kicker color={C.red}>PRESSURE / 02</Kicker><div style={{fontSize:96,fontWeight:900,color:C.white}}>层层压力</div></div><Caption>进度、成本、人情……层层压力迎面而来</Caption></AbsoluteFill>};

const Gauge=({label,value,alert,delay}:{label:string;value:string;alert?:boolean;delay:number})=>{const f=useCurrentFrame();const a=enter(f,delay);return <div style={{width:410,padding:'28px 32px',opacity:a,translate:`${interpolate(a,[0,1],[50,0])}px 0`,borderRadius:24,background:'#051522e8',border:`2px solid ${alert?C.red:C.blue}`,boxShadow:`0 0 35px ${alert?C.red:C.blue}33`}}><div style={{fontSize:30,color:'#b6d4df'}}>{label}</div><div style={{fontSize:64,fontWeight:900,color:alert?C.red:C.white,marginTop:8}}>{value}</div></div>};
const Scene3=()=>{const f=useCurrentFrame();const scan=interpolate(f,[10,125],[160,1460],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});return <AbsoluteFill style={{opacity:sceneOpacity(f,150)}}><Factory/><div style={{position:'absolute',left:60,bottom:330,scale:.92}}><Worker action="inspect" blue/></div><div style={{position:'absolute',right:82,top:310,display:'flex',flexDirection:'column',gap:26}}><Gauge label="关键温度" value="6.8°C" alert delay={12}/><Gauge label="异物风险" value="已锁定" alert delay={27}/><Gauge label="批次状态" value="待隔离" delay={42}/></div><div style={{position:'absolute',left:0,right:0,top:scan,height:8,background:C.blue,boxShadow:`0 0 45px 16px ${C.blue}66`}}/><div style={{position:'absolute',left:80,top:150}}><Kicker>INSPECTION / 03</Kicker><div style={{fontSize:88,fontWeight:900,color:C.white,marginTop:16}}>风险不会消失</div></div><Caption>风险，不会因为催促而消失</Caption></AbsoluteFill>};

const Scene4=()=>{const f=useCurrentFrame();const shake=Math.sin(f*2.1)*interpolate(f,[0,90,150],[2,10,3]);return <AbsoluteFill style={{opacity:sceneOpacity(f,150),translate:`${shake}px 0`}}><Factory/><div style={{position:'absolute',left:385,bottom:350,scale:.92}}><Worker action="stand"/></div>{['先生产再整改','这次先放过'].map((t,i)=>{const a=enter(f,10+i*23);return <div key={t} style={{position:'absolute',left:80,right:80,top:280+i*310,height:210,opacity:a,scale:interpolate(a,[0,1],[1.35,1]),display:'flex',alignItems:'center',justifyContent:'center',background:'#6d1018dd',border:`5px solid ${C.red}`,boxShadow:`0 0 80px ${C.red}55`,fontSize:78,fontWeight:900,color:C.white}}>{t}</div>})}<div style={{position:'absolute',left:80,right:80,top:1120,textAlign:'center',fontSize:92,fontWeight:900,color:C.white}}>先放行？<span style={{color:C.red}}>还是守底线？</span></div><Caption>面对妥协，他必须作出选择</Caption></AbsoluteFill>};

const ActionPill=({label,index}:{label:string;index:number})=>{const f=useCurrentFrame();const a=enter(f,32+index*18,14);return <div style={{opacity:a,scale:interpolate(a,[0,1],[.5,1]),width:196,height:100,borderRadius:54,display:'flex',alignItems:'center',justifyContent:'center',background:index===0?C.red:'#08314b',border:`3px solid ${index===0?C.red:C.blue}`,boxShadow:`0 0 32px ${index===0?C.red:C.blue}55`,fontSize:42,fontWeight:900,color:C.white}}>{label}</div>};
const Scene5=()=>{const f=useCurrentFrame();const hit=enter(f,8,8);const burst=interpolate(f,[18,62],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});return <AbsoluteFill style={{opacity:sceneOpacity(f,150)}}><Factory warm/><div style={{position:'absolute',left:390,bottom:390,scale:.9}}><Worker action="stop" blue/></div><div style={{position:'absolute',right:120,top:300,width:260,height:260,borderRadius:'50%',background:`radial-gradient(circle,${C.red},#78151b)`,border:'18px solid #c6d8dd',boxShadow:`0 0 ${30+hit*80}px ${C.red}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:56,fontWeight:900,color:C.white}}>停线</div><div style={{position:'absolute',left:80,right:80,top:760,display:'flex',gap:22,justifyContent:'center'}}>{['停线','隔离','整改','复核'].map((x,i)=><ActionPill key={x} label={x} index={i}/>)}</div>{Array.from({length:18}).map((_,i)=><div key={i} style={{position:'absolute',left:540,top:950,width:18,height:80,background:i%3===0?C.gold:C.blue,opacity:burst,rotate:`${i*20}deg`,transformOrigin:`50% ${200+burst*420}px`,translate:`0 ${burst*500}px`}}/>)}<div style={{position:'absolute',left:82,top:150}}><Kicker>ACTION / 05</Kicker><div style={{fontSize:94,fontWeight:900,color:C.white}}>用专业冲破阻力</div></div><Caption>停线、隔离、整改、复核——用专业冲破阻力</Caption></AbsoluteFill>};

const Shield=()=> <div style={{width:340,height:410,background:`linear-gradient(145deg,${C.blue},#0b5277)`,clipPath:'polygon(50% 0,92% 16%,86% 70%,50% 100%,14% 70%,8% 16%)',display:'flex',alignItems:'center',justifyContent:'center',filter:`drop-shadow(0 0 45px ${C.blue}88)`}}><div style={{width:88,height:170,borderRight:`28px solid ${C.white}`,borderBottom:`28px solid ${C.white}`,rotate:'42deg',translate:'-10px -25px'}}/></div>;
const Scene6=()=>{const f=useCurrentFrame();const a=enter(f,8,30);return <AbsoluteFill style={{opacity:sceneOpacity(f,120)}}><Factory warm/><div style={{position:'absolute',left:370,top:260,opacity:a,scale:interpolate(a,[0,1],[.55,1])}}><Shield/></div><div style={{position:'absolute',left:80,right:80,top:800,textAlign:'center',opacity:enter(f,22)}}><Kicker>RELEASE / 06</Kicker><div style={{fontSize:112,fontWeight:900,color:C.white,lineHeight:1.15,marginTop:22}}>守住底线<br/><span style={{color:C.blue}}>放心交付</span></div></div><div style={{position:'absolute',left:180,right:180,top:1180,height:10,background:C.blue,boxShadow:`0 0 34px ${C.blue}`}}/><Caption>因为守住底线，才能放心交付</Caption></AbsoluteFill>};

const Final=()=>{const f=useCurrentFrame();const glow=interpolate(f,[0,90],[.2,1]);return <AbsoluteFill style={{background:C.navy,overflow:'hidden'}}><div style={{position:'absolute',left:'50%',top:'36%',width:850,height:850,borderRadius:'50%',translate:'-50% -50%',background:`radial-gradient(circle,${C.blue}33 0%,transparent 68%)`,scale:glow}}/><div style={{position:'absolute',left:80,right:80,top:250,bottom:190,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:50,textAlign:'center'}}><div style={{opacity:enter(f,5,18),scale:interpolate(enter(f,5,18),[0,1],[.75,1])}}><Shield/></div><div style={{opacity:enter(f,18,18),fontSize:96,fontWeight:900,lineHeight:1.18,color:C.white}}>食品安全<br/><span style={{color:C.blue}}>质量人用行动守护</span></div><div style={{width:200,height:6,background:C.gold,opacity:enter(f,30)}}/><div style={{opacity:enter(f,36),fontSize:54,fontWeight:900,color:C.gold,letterSpacing:10}}>食界公益行</div><div style={{opacity:enter(f,48),fontSize:42,fontWeight:700,color:'#c9e4ee',letterSpacing:4}}>老张的食安与精益</div></div></AbsoluteFill>};

export const FoodSafetyGuardian=({title}:{title:string})=><AbsoluteFill style={{fontFamily:'"Noto Sans SC",sans-serif',background:C.navy}}>
  <Audio src={staticFile('cinematic-bed.wav')} volume={0.55}/>
  <Sequence from={0} durationInFrames={90}><Scene1/></Sequence>
  <Sequence from={90} durationInFrames={150}><Scene2/></Sequence>
  <Sequence from={240} durationInFrames={150}><Scene3/></Sequence>
  <Sequence from={390} durationInFrames={150}><Scene4/></Sequence>
  <Sequence from={540} durationInFrames={150}><Scene5/></Sequence>
  <Sequence from={690} durationInFrames={120}><Scene6/></Sequence>
  <Sequence from={810} durationInFrames={90}><Final/></Sequence>
  <div style={{display:'none'}}>{title}</div>
</AbsoluteFill>;
