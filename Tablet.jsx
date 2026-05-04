// Tablet.jsx — iPadOS-style tablet experience
// Pulls all content from window.SITE_CONTENT (single source of truth)

const { useState: tUseState, useEffect: tUseEffect, useRef: tUseRef } = React;

/* ─── iPadOS STATUS BAR ──────────────────────────────────── */
function PadStatusBar() {
  const [t, setT] = tUseState(new Date());
  tUseEffect(() => { const iv = setInterval(() => setT(new Date()), 30000); return () => clearInterval(iv); }, []);
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const mos = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const time = `${t.getHours()}:${String(t.getMinutes()).padStart(2,'0')}`;
  return (
    <div style={{ position:'sticky', top:0, height:'24px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 22px', fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'13px', fontWeight:600, color:'#fff', zIndex:9999, pointerEvents:'none', textShadow:'0 1px 2px rgba(0,0,0,0.4)' }}>
      <span>{time}</span>
      <span style={{ fontWeight:500, opacity:0.85 }}>{days[t.getDay()]} {mos[t.getMonth()]} {t.getDate()}</span>
      <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="#fff"><path d="M7 2.5c2.2 0 4.2.8 5.7 2.2l1.1-1.1A9.4 9.4 0 0 0 7 .5c-2.6 0-5 1-6.8 2.6l1.1 1.1C2.8 3.3 4.8 2.5 7 2.5zm0 3c1.4 0 2.7.5 3.7 1.4l1.1-1.1A7.2 7.2 0 0 0 7 4c-1.8 0-3.4.7-4.7 1.8l1.1 1.1A5.5 5.5 0 0 1 7 5.5zm0 3c.7 0 1.3.3 1.8.7L7 11l-1.8-1.8c.5-.4 1.1-.7 1.8-.7z"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10">
          <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" fill="none" stroke="#fff" strokeOpacity="0.5"/>
          <rect x="2" y="2" width="15" height="6" rx="1.5" fill="#fff"/>
          <rect x="19.5" y="3" width="1.2" height="4" rx="0.4" fill="#fff" opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

/* ─── HOME INDICATOR ─────────────────────────────────────── */
function PadHomeIndicator() {
  return <div style={{ position:'fixed', bottom:'7px', left:'50%', transform:'translateX(-50%)', width:'150px', height:'4px', borderRadius:'2px', background:'rgba(255,255,255,0.85)', zIndex:9999 }}/>;
}

/* ─── DOCK APP ICONS ─────────────────────────────────────── */
const T_APPS = [
  { id:'about',        label:'About',        bg:'linear-gradient(135deg,#1a2129,#0d1117)', kind:'AVATAR' },
  { id:'expertise',    label:'Expertise',    bg:'linear-gradient(135deg,#062920,#031914)', kind:'TERM' },
  { id:'publications', label:'Publications', bg:'linear-gradient(135deg,#1e6bb8,#0d4a8a)', kind:'DOC' },
  { id:'contact',      label:'Contact',      bg:'linear-gradient(135deg,#2a1438,#150a1f)', kind:'MAIL' },
];
const T_LINKS = [
  { id:'github',   label:'GitHub',   bg:'#24292e',                                    kind:'GH', href:'https://github.com/ischrack' },
  { id:'linkedin', label:'LinkedIn', bg:'linear-gradient(135deg,#0a66c2,#004182)',    kind:'IN', href:'https://www.linkedin.com/feed/' },
];

function PadAppIcon({ app, size = 60, onTap, active }) {
  const C = window.SITE_CONTENT;
  const inner = (() => {
    if (app.kind === 'AVATAR') return <img src={C.identity.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>;
    if (app.kind === 'TERM') return (
      <div style={{ width:'100%', height:'100%', position:'relative', fontFamily:'"JetBrains Mono",monospace' }}>
        <div style={{ position:'absolute', top:'18%', left:'14%', color:'#3fb950', fontSize: `${size*0.32}px`, fontWeight:600 }}>$_</div>
        <div style={{ position:'absolute', top:'52%', left:'14%', right:'14%', height:'2px', background:'rgba(63,185,80,0.5)' }}/>
        <div style={{ position:'absolute', top:'66%', left:'14%', right:'30%', height:'2px', background:'rgba(63,185,80,0.3)' }}/>
      </div>
    );
    if (app.kind === 'DOC') return (
      <div style={{ position:'absolute', inset:'18%', background:'#fff', borderRadius:'4px', padding:'7px 5px' }}>
        <div style={{ height:'2px', background:'#1e6bb8', marginBottom:'4px', width:'80%' }}/>
        <div style={{ height:'1px', background:'#1e6bb8', opacity:0.5, marginBottom:'3px' }}/>
        <div style={{ height:'1px', background:'#1e6bb8', opacity:0.3, width:'70%' }}/>
      </div>
    );
    if (app.kind === 'MAIL') return (
      <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ padding:'20%' }}>
        <rect x="2" y="10" width="60" height="40" rx="4" fill="none" stroke="#fff" strokeWidth="3"/>
        <polyline points="2,11 32,32 62,11" fill="none" stroke="#fff" strokeWidth="3"/>
      </svg>
    );
    if (app.kind === 'GH') return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ padding:'18%' }}>
        <path fill="white" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>
      </svg>
    );
    if (app.kind === 'IN') return (
      <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'-apple-system,sans-serif', fontSize:`${size*0.45}px`, fontWeight:700, letterSpacing:'-0.05em' }}>in</div>
    );
  })();
  const Wrapper = app.href ? 'a' : 'div';
  return (
    <Wrapper {...(app.href ? { href:app.href, target:'_blank', rel:'noopener' } : { onClick:onTap })}
      title={app.label}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', cursor:'pointer', textDecoration:'none', WebkitTapHighlightColor:'transparent' }}>
      <div style={{ width:`${size}px`, height:`${size}px`, borderRadius:`${size*0.235}px`, background:app.bg, position:'relative', overflow:'hidden', boxShadow: active ? '0 0 0 2px #3fb950, 0 4px 14px rgba(0,0,0,0.4)' : '0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)', transition:'box-shadow 0.2s' }}>
        {inner}
      </div>
      {active && <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#fff' }}/>}
    </Wrapper>
  );
}

/* ─── HOME SCREEN ────────────────────────────────────────── */
function PadHome({ onOpen }) {
  const C = window.SITE_CONTENT;
  const [t] = tUseState(new Date());
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mos = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return (
    <div style={{ position:'relative', minHeight:'100vh', background:'linear-gradient(135deg,#1a2238 0%,#0a0e1a 60%,#050810 100%)', display:'flex', flexDirection:'column' }}>
      <PadStatusBar/>
      {/* Center label */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', padding:'48px 32px 0' }}>
        <div style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'17px', color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{days[t.getDay()]}, {mos[t.getMonth()]} {t.getDate()}</div>
        <h1 style={{ fontFamily:'-apple-system,"SF Pro Display",system-ui,sans-serif', fontSize:'56px', fontWeight:700, color:'#fff', marginTop:'8px', letterSpacing:'-0.03em', lineHeight:1 }}>{C.identity.name}</h1>
        <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'14px', color:'#3fb950', marginTop:'14px', letterSpacing:'0.04em' }}>{C.identity.role}</div>
      </div>

      {/* Apps grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:'40px 24px', padding:'40px 60px 24px', maxWidth:'820px', margin:'0 auto', width:'100%' }}>
        {[...T_APPS, ...T_LINKS].map(app => (
          <div key={app.id} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
            <PadAppIcon app={app} size={76} onTap={() => onOpen(app.id)}/>
            <span style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'13px', color:'#fff', textShadow:'0 1px 3px rgba(0,0,0,0.6)' }}>{app.label}</span>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div style={{ display:'flex', justifyContent:'center', paddingBottom:'34px' }}>
        <div style={{ background:'rgba(255,255,255,0.18)', backdropFilter:'blur(28px) saturate(1.5)', WebkitBackdropFilter:'blur(28px) saturate(1.5)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'24px', padding:'10px 16px', display:'flex', gap:'14px' }}>
          {T_APPS.map(app => <PadAppIcon key={app.id} app={app} size={56} onTap={() => onOpen(app.id)}/>)}
          <div style={{ width:'1px', background:'rgba(255,255,255,0.25)', alignSelf:'stretch' }}/>
          {T_LINKS.map(app => <PadAppIcon key={app.id} app={app} size={56}/>)}
        </div>
      </div>
      <PadHomeIndicator/>
    </div>
  );
}

/* ─── iPadOS WINDOW SHELL ────────────────────────────────── */
function PadWindow({ title, accent='#3fb950', onClose, children, light=false }) {
  return (
    <div style={{ position:'absolute', inset:'12px', borderRadius:'18px', overflow:'hidden', background: light ? '#f2f2f7' : '#0d1117', boxShadow:'0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)', display:'flex', flexDirection:'column' }}>
      {/* Title bar */}
      <div style={{ height:'40px', flexShrink:0, background: light ? 'rgba(242,242,247,0.85)' : 'rgba(22,27,34,0.9)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom: light ? '0.5px solid rgba(0,0,0,0.1)' : '0.5px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', padding:'0 14px', position:'relative' }}>
        <div style={{ display:'flex', gap:'8px' }}>
          <button onClick={onClose} title="Close" style={{ width:'13px', height:'13px', borderRadius:'50%', background:'#ff5f57', border:'none', cursor:'pointer', padding:0 }}/>
          <div style={{ width:'13px', height:'13px', borderRadius:'50%', background:'#febc2e' }}/>
          <div style={{ width:'13px', height:'13px', borderRadius:'50%', background:'#28c840' }}/>
        </div>
        <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'13px', fontWeight:600, color: light ? '#1a1a2e' : '#e6edf3' }}>{title}</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', WebkitOverflowScrolling:'touch' }}>
        {children}
      </div>
    </div>
  );
}

/* ─── PAD ABOUT ──────────────────────────────────────────── */
function PadAboutContent() {
  const C = window.SITE_CONTENT;
  const renderPara = (str, key) => {
    const parts = str.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'16px', lineHeight:1.65, color:'#c9d1d9', marginBottom:'16px', fontWeight:400 }}>
        {parts.map((p, i) => p.startsWith('{{')
          ? <span key={i} style={{ color:'#3fb950', fontFamily:'"JetBrains Mono",monospace', fontSize:'14px' }}>{p.slice(2,-2)}</span>
          : <React.Fragment key={i}>{p}</React.Fragment>)}
      </p>
    );
  };
  return (
    <div style={{ padding:'32px 36px' }}>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'11px', color:'#4a5568', marginBottom:'18px' }}><span style={{ color:'#3fb950' }}>$</span> cat about.md</div>
      <div style={{ display:'flex', gap:'20px', alignItems:'center', marginBottom:'28px' }}>
        <img src={C.identity.avatar} alt="" style={{ width:'92px', height:'92px', borderRadius:'12px', objectFit:'cover', border:'1.5px solid #3fb950' }}/>
        <div>
          <h2 style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'30px', fontWeight:500, color:'#e6edf3', letterSpacing:'-0.03em', lineHeight:1 }}>{C.identity.handle}</h2>
          <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'13px', color:'#3fb950', marginTop:'8px' }}>{C.identity.role}</div>
        </div>
      </div>
      {C.about.paragraphs.map((p,i) => renderPara(p, i))}
      <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'24px' }}>
        {C.links.map(({label, href}) => (
          <a key={label} href={href} target="_blank" rel="noopener" style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#8b949e', textDecoration:'none', padding:'8px 14px', border:'1px solid #21262d', background:'#161b22', borderRadius:'8px', display:'inline-flex', gap:'6px', alignItems:'center' }}>
            <span style={{ color:'#3fb950' }}>$</span>{label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── PAD EXPERTISE ──────────────────────────────────────── */
function PadExpertiseContent() {
  const C = window.SITE_CONTENT;
  return (
    <div style={{ padding:'32px 36px' }}>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'11px', color:'#4a5568', marginBottom:'8px' }}><span style={{ color:'#3fb950' }}>$</span> ls ./expertise/</div>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'10px', color:'#2a3540', marginBottom:'24px', letterSpacing:'0.15em' }}>AREAS OF EXPERTISE</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'18px' }}>
        {C.expertise.map(item => (
          <div key={item.id} style={{ background:'#161b22', border:'1px solid #21262d', borderRadius:'12px', padding:'18px' }}>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'10.5px', color:'#4a5568', marginBottom:'8px' }}>
              <span style={{ color:'#3fb950' }}>$</span> {item.cmd}
            </div>
            <h3 style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'17px', fontWeight:500, color:'#e6edf3', marginBottom:'12px', letterSpacing:'-0.02em' }}>{item.title}</h3>
            <div style={{ aspectRatio:'16/9', background:item.imgBg, border:'1px solid #21262d', borderRadius:'6px', overflow:'hidden', marginBottom:'12px' }}>
              <img src={item.img} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'contain', padding:'6px' }}/>
            </div>
            <p style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'13px', lineHeight:1.55, color:'#8b949e', marginBottom:'12px' }}>{item.text}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
              {item.tags.map(t => (
                <span key={t} style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'10px', padding:'3px 7px', border:'1px solid #21262d', color:'#4a5568', background:'#0d1117', borderRadius:'3px' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAD PUBLICATIONS ───────────────────────────────────── */
function PadPublicationsContent() {
  const C = window.SITE_CONTENT;
  const [tab, setTab] = tUseState('pubs');
  return (
    <div style={{ background:'#f2f2f7', minHeight:'100%' }}>
      <div style={{ position:'sticky', top:0, zIndex:5, background:'rgba(242,242,247,0.92)', backdropFilter:'blur(20px)', padding:'16px 24px 12px', borderBottom:'0.5px solid rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontFamily:'-apple-system,"SF Pro Display",system-ui,sans-serif', fontSize:'28px', fontWeight:700, color:'#1a1a2e', letterSpacing:'-0.02em', marginBottom:'12px' }}>Publications</h1>
        <div style={{ background:'rgba(120,120,128,0.16)', borderRadius:'9px', padding:'2px', display:'flex', gap:'2px', maxWidth:'420px' }}>
          {[['pubs','Publications'],['pres','Presentations']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex:1, background: tab === id ? '#fff' : 'transparent', color:'#1a1a2e', border:'none', borderRadius:'7px', padding:'7px 0', fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'13px', fontWeight: tab === id ? 600 : 500, cursor:'pointer', boxShadow: tab === id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:'18px 24px 30px' }}>
        {(tab === 'pubs' ? C.publications : C.presentations).map((p, i) => (
          <div key={i} style={{ background:'#fff', borderRadius:'12px', padding:'16px 20px', marginBottom:'12px', borderLeft: p.first ? '3px solid #2563eb' : '3px solid #e2e8f0' }}>
            <div style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'15px', fontWeight:600, color:'#1a1a2e', lineHeight:1.4, marginBottom:'5px' }}>{p.title}</div>
            <div style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'12.5px', color:'#444', marginBottom:'4px', lineHeight:1.5 }}>{p.authors}</div>
            <div style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'12px', color:'#666', fontStyle:'italic' }}>
              {p.journal || p.venue}{p.note ? ` · ${p.note}` : ''}{` · ${p.year}`}
              {p.doi && <> · <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener" style={{ color:'#2563eb', fontStyle:'normal', textDecoration:'none' }}>DOI: {p.doi}</a></>}
            </div>
            {p.first && <span style={{ display:'inline-block', fontSize:10, padding:'2px 7px', background:'#dcfce7', color:'#166534', borderRadius:3, marginTop:6 }}>first author</span>}
            {p.journal === 'In preparation' && <span style={{ display:'inline-block', fontSize:10, padding:'2px 7px', background:'#fef9c3', color:'#92400e', borderRadius:3, marginTop:6, marginLeft:4 }}>in prep</span>}
            {p.award && <div style={{ display:'inline-block', fontSize:11, color:'#92400e', background:'#fef3c7', padding:'3px 8px', borderRadius:3, marginTop:6 }}>{p.award}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PAD CONTACT ────────────────────────────────────────── */
function PadContactContent() {
  const C = window.SITE_CONTENT;
  return (
    <div style={{ padding:'32px 36px' }}>
      <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'11px', color:'#4a5568', marginBottom:'18px' }}><span style={{ color:'#3fb950' }}>$</span> open contact_form.sh</div>
      <h2 style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'24px', fontWeight:500, color:'#e6edf3', marginBottom:'8px', letterSpacing:'-0.02em' }}>Get in touch</h2>
      <p style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'15px', color:'#8b949e', lineHeight:1.6, marginBottom:'24px' }}>{C.contact.blurb}</p>
      <div style={{ background:'#161b22', borderRadius:'14px', overflow:'hidden', border:'1px solid #21262d' }}>
        {C.contact.rows.map(({label, val, href}, i) => (
          <a key={label} href={href} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', textDecoration:'none', borderBottom: i < C.contact.rows.length - 1 ? '0.5px solid #21262d' : 'none' }}>
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#3fb950', minWidth:'80px' }}>{label}</span>
            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#8b949e' }}>{val}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── TABLET APP ROOT ────────────────────────────────────── */
function TabletApp() {
  const [active, setActive] = tUseState(null); // null = home

  const apps = {
    about:        { title:'About — ian_schrack', content: <PadAboutContent/> },
    expertise:    { title:'Expertise — ian_schrack', content: <PadExpertiseContent/> },
    publications: { title:'Publications.pdf — Preview', content: <PadPublicationsContent/>, light: true },
    contact:      { title:'contact.sh', content: <PadContactContent/> },
  };

  if (!active || !apps[active]) {
    return <PadHome onOpen={(id) => apps[id] && setActive(id)}/>;
  }

  const app = apps[active];
  return (
    <div style={{ position:'fixed', inset:0, background:'linear-gradient(135deg,#1a2238 0%,#0a0e1a 60%,#050810 100%)', overflow:'hidden' }}>
      <PadStatusBar/>
      {/* Stage Manager: small thumbnails on left of inactive apps */}
      <div style={{ position:'absolute', top:'40px', left:'8px', bottom:'80px', width:'80px', display:'flex', flexDirection:'column', gap:'12px', alignItems:'center', paddingTop:'8px', zIndex:5 }}>
        {Object.entries(apps).filter(([id]) => id !== active).map(([id, a]) => {
          const appDef = T_APPS.find(x => x.id === id);
          return (
            <div key={id} onClick={() => setActive(id)} style={{ cursor:'pointer', width:'68px', height:'48px', background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateX(4px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}>
              <PadAppIcon app={appDef} size={32}/>
            </div>
          );
        })}
      </div>

      {/* Active window */}
      <div style={{ position:'absolute', top:'30px', left:'100px', right:'12px', bottom:'72px' }}>
        <PadWindow title={app.title} onClose={() => setActive(null)} light={app.light}>
          {app.content}
        </PadWindow>
      </div>

      {/* Dock */}
      <div style={{ position:'fixed', bottom:'14px', left:'50%', transform:'translateX(-50%)', zIndex:50 }}>
        <div style={{ background:'rgba(255,255,255,0.18)', backdropFilter:'blur(28px) saturate(1.5)', WebkitBackdropFilter:'blur(28px) saturate(1.5)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'20px', padding:'8px 14px', display:'flex', gap:'12px' }}>
          {T_APPS.map(app => <PadAppIcon key={app.id} app={app} size={48} onTap={() => setActive(app.id)} active={active === app.id}/>)}
          <div style={{ width:'1px', background:'rgba(255,255,255,0.25)', alignSelf:'stretch' }}/>
          {T_LINKS.map(app => <PadAppIcon key={app.id} app={app} size={48}/>)}
        </div>
      </div>
      <PadHomeIndicator/>
    </div>
  );
}

Object.assign(window, { TabletApp });
