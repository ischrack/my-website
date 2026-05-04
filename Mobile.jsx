// Mobile.jsx — iOS-style mobile experience
// Pulls all content from window.SITE_CONTENT (single source of truth)

const { useState: mUseState, useEffect: mUseEffect, useRef: mUseRef } = React;

/* ─── iOS STATUS BAR ─────────────────────────────────────── */
function IOSStatusBar({ dark = true }) {
  const [t, setT] = mUseState(new Date());
  mUseEffect(() => { const iv = setInterval(() => setT(new Date()), 30000); return () => clearInterval(iv); }, []);
  const time = `${t.getHours()}:${String(t.getMinutes()).padStart(2,'0')}`;
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{ position:'sticky', top:0, height:'52px', display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 28px 8px', fontFamily:'-apple-system, "SF Pro Text", system-ui, sans-serif', fontSize:'15px', fontWeight:600, color:c, zIndex:100, pointerEvents:'none' }}>
      <span>{time}</span>
      <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
        {/* Cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11"><g fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.6"/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.6"/>
          <rect x="9" y="3" width="3" height="8" rx="0.6"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.6"/>
        </g></svg>
        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <path d="M8 2.5c2.6 0 5 1 6.7 2.6l1.3-1.3C13.9 1.7 11 .5 8 .5S2.1 1.7 0 3.8l1.3 1.3C3 3.5 5.4 2.5 8 2.5zm0 3.5c1.6 0 3.1.6 4.2 1.7l1.3-1.3A8.4 8.4 0 0 0 8 4.5c-2.1 0-4 .8-5.5 2.1L3.8 7.7C4.9 6.6 6.4 6 8 6zm0 3.5c.8 0 1.6.3 2.2.8l-2.2 2.2-2.2-2.2c.6-.5 1.4-.8 2.2-.8z"/>
        </svg>
        {/* Battery */}
        <svg width="26" height="12" viewBox="0 0 26 12">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke={c} strokeOpacity="0.5"/>
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill={c}/>
          <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill={c} opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

/* ─── HOME INDICATOR ─────────────────────────────────────── */
function HomeIndicator({ dark = true }) {
  return (
    <div style={{ position:'fixed', bottom:'8px', left:'50%', transform:'translateX(-50%)', width:'140px', height:'5px', borderRadius:'3px', background: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.4)', zIndex:200, pointerEvents:'none' }}/>
  );
}

/* ─── HOME SCREEN ────────────────────────────────────────── */
const M_APPS = [
  { id:'about',        label:'About',        bg:'linear-gradient(135deg,#1a2129,#0d1117)', icon: 'AVATAR' },
  { id:'expertise',    label:'Expertise',    bg:'linear-gradient(135deg,#062920,#031914)', icon: 'TERM' },
  { id:'publications', label:'Publications', bg:'linear-gradient(135deg,#1e6bb8,#0d4a8a)', icon: 'DOC' },
  { id:'contact',      label:'Contact',      bg:'linear-gradient(135deg,#2a1438,#150a1f)', icon: 'MAIL' },
  { id:'github',       label:'GitHub',       bg:'#24292e', icon: 'GH', href:'https://github.com/ischrack' },
  { id:'linkedin',     label:'LinkedIn',     bg:'linear-gradient(135deg,#0a66c2,#004182)', icon: 'IN', href:'https://www.linkedin.com/feed/' },
  { id:'orcid',        label:'ORCID',        bg:'linear-gradient(135deg,#a6ce39,#739928)', icon: 'OR', href:'https://orcid.org/0000-0002-6189-2087' },
  { id:'mail',         label:'Mail',         bg:'linear-gradient(135deg,#3fb950,#1f7c2c)', icon: 'EM', href:'mailto:Schrack.ia@gmail.com' },
];

function AppIcon({ app, onTap }) {
  const C = window.SITE_CONTENT;
  const renderInside = () => {
    switch (app.icon) {
      case 'AVATAR':
        return <img src={C.identity.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>;
      case 'TERM':
        return (
          <div style={{ width:'100%', height:'100%', position:'relative', fontFamily:'"JetBrains Mono",monospace' }}>
            <div style={{ position:'absolute', top:'18%', left:'14%', color:'#3fb950', fontSize:'22px', fontWeight:600 }}>$_</div>
            <div style={{ position:'absolute', top:'52%', left:'14%', right:'14%', height:'2px', background:'rgba(63,185,80,0.5)', borderRadius:'1px' }}/>
            <div style={{ position:'absolute', top:'66%', left:'14%', right:'30%', height:'2px', background:'rgba(63,185,80,0.3)', borderRadius:'1px' }}/>
          </div>
        );
      case 'DOC':
        return (
          <div style={{ position:'absolute', inset:'18%', background:'#fff', borderRadius:'4px', padding:'8px 6px' }}>
            <div style={{ height:'2px', background:'#1e6bb8', marginBottom:'4px', width:'80%' }}/>
            <div style={{ height:'1px', background:'#1e6bb8', opacity:0.5, marginBottom:'3px' }}/>
            <div style={{ height:'1px', background:'#1e6bb8', opacity:0.5, marginBottom:'3px', width:'70%' }}/>
            <div style={{ height:'1px', background:'#1e6bb8', opacity:0.3, marginBottom:'3px' }}/>
            <div style={{ height:'1px', background:'#1e6bb8', opacity:0.3, width:'60%' }}/>
          </div>
        );
      case 'MAIL':
        return (
          <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ padding:'18%' }}>
            <rect x="2" y="10" width="60" height="40" rx="4" fill="none" stroke="#fff" strokeWidth="2.5" strokeOpacity="0.95"/>
            <polyline points="2,11 32,32 62,11" fill="none" stroke="#fff" strokeWidth="2.5" strokeOpacity="0.95"/>
          </svg>
        );
      case 'GH':
        return (
          <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ padding:'18%' }}>
            <path fill="white" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>
          </svg>
        );
      case 'IN':
        return (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'-apple-system,sans-serif', fontSize:'28px', fontWeight:700, letterSpacing:'-0.05em' }}>in</div>
        );
      case 'OR':
        return (
          <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'-apple-system,sans-serif', fontSize:'24px', fontWeight:700, letterSpacing:'-0.04em' }}>iD</div>
        );
      case 'EM':
        return (
          <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ padding:'20%' }}>
            <rect x="2" y="10" width="60" height="40" rx="4" fill="none" stroke="#fff" strokeWidth="3" strokeOpacity="0.95"/>
            <polyline points="2,11 32,32 62,11" fill="none" stroke="#fff" strokeWidth="3" strokeOpacity="0.95"/>
          </svg>
        );
    }
  };
  const Wrapper = app.href ? 'a' : 'div';
  return (
    <Wrapper {...(app.href ? { href: app.href, target:'_blank', rel:'noopener' } : { onClick: onTap })}
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', textDecoration:'none', cursor:'pointer', userSelect:'none', WebkitTapHighlightColor:'transparent' }}>
      <div style={{ width:'62px', height:'62px', borderRadius:'15px', background:app.bg, position:'relative', overflow:'hidden', boxShadow:'0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
        {renderInside()}
      </div>
      <span style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'12px', color:'#fff', textShadow:'0 1px 3px rgba(0,0,0,0.6)', fontWeight:400 }}>{app.label}</span>
    </Wrapper>
  );
}

function MobileHome({ onOpen }) {
  const C = window.SITE_CONTENT;
  const [t, setT] = mUseState(new Date());
  mUseEffect(() => { const iv = setInterval(() => setT(new Date()), 30000); return () => clearInterval(iv); }, []);
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const mos = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div style={{ position:'relative', minHeight:'100vh', background:'linear-gradient(180deg,#1a2238 0%,#0a0e1a 60%, #050810 100%)', paddingBottom:'40px' }}>
      <IOSStatusBar dark/>
      {/* Lock-screen-style date + name */}
      <div style={{ textAlign:'center', padding:'18px 24px 28px', color:'#fff' }}>
        <div style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'15px', fontWeight:500, color:'rgba(255,255,255,0.85)', letterSpacing:'0.02em' }}>{days[t.getDay()]}, {mos[t.getMonth()]} {t.getDate()}</div>
        <h1 style={{ fontFamily:'-apple-system,"SF Pro Display",system-ui,sans-serif', fontSize:'40px', fontWeight:700, marginTop:'6px', letterSpacing:'-0.03em', lineHeight:1 }}>{C.identity.name}</h1>
        <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#3fb950', marginTop:'10px', letterSpacing:'0.04em' }}>{C.identity.role}</div>
      </div>

      {/* Apps grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'18px 0', padding:'8px 18px 80px' }}>
        {M_APPS.map(app => <AppIcon key={app.id} app={app} onTap={() => onOpen(app.id)}/>)}
      </div>

      {/* Dock */}
      <div style={{ position:'fixed', bottom:'20px', left:'12px', right:'12px', background:'rgba(255,255,255,0.18)', backdropFilter:'blur(28px) saturate(1.5)', WebkitBackdropFilter:'blur(28px) saturate(1.5)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'24px', padding:'10px 14px', display:'flex', justifyContent:'space-around', zIndex:50 }}>
        {['about','expertise','publications','contact'].map(id => {
          const app = M_APPS.find(a => a.id === id);
          return (
            <div key={id} onClick={() => onOpen(id)} style={{ cursor:'pointer' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'13px', background:app.bg, position:'relative', overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.4)' }}>
                <AppIconInner app={app}/>
              </div>
            </div>
          );
        })}
      </div>

      <HomeIndicator/>
    </div>
  );
}
function AppIconInner({ app }) {
  // Render just the inner icon graphic (used inside dock)
  const C = window.SITE_CONTENT;
  if (app.icon === 'AVATAR') return <img src={C.identity.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>;
  if (app.icon === 'TERM') return (
    <div style={{ width:'100%', height:'100%', position:'relative', fontFamily:'"JetBrains Mono",monospace' }}>
      <div style={{ position:'absolute', top:'18%', left:'14%', color:'#3fb950', fontSize:'18px', fontWeight:600 }}>$_</div>
      <div style={{ position:'absolute', top:'52%', left:'14%', right:'14%', height:'2px', background:'rgba(63,185,80,0.5)' }}/>
      <div style={{ position:'absolute', top:'66%', left:'14%', right:'30%', height:'2px', background:'rgba(63,185,80,0.3)' }}/>
    </div>
  );
  if (app.icon === 'DOC') return (
    <div style={{ position:'absolute', inset:'20%', background:'#fff', borderRadius:'3px', padding:'6px 5px' }}>
      <div style={{ height:'2px', background:'#1e6bb8', marginBottom:'3px', width:'80%' }}/>
      <div style={{ height:'1px', background:'#1e6bb8', opacity:0.5, marginBottom:'3px' }}/>
      <div style={{ height:'1px', background:'#1e6bb8', opacity:0.3, width:'70%' }}/>
    </div>
  );
  if (app.icon === 'MAIL') return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ padding:'20%' }}>
      <rect x="2" y="10" width="60" height="40" rx="4" fill="none" stroke="#fff" strokeWidth="3"/>
      <polyline points="2,11 32,32 62,11" fill="none" stroke="#fff" strokeWidth="3"/>
    </svg>
  );
  return null;
}

/* ─── iOS APP HEADER ─────────────────────────────────────── */
function IOSAppHeader({ title, subtitle, onBack, accent = '#3fb950', big = true }) {
  return (
    <>
      <IOSStatusBar dark/>
      <div style={{ position:'sticky', top:'52px', background:'rgba(13,17,23,0.85)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'0.5px solid rgba(255,255,255,0.08)', padding:'10px 16px 12px', zIndex:50, display:'flex', alignItems:'center', gap:'4px' }}>
        <button onClick={onBack} style={{ background:'transparent', border:'none', color:accent, fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'17px', display:'flex', alignItems:'center', gap:'2px', cursor:'pointer', padding:'4px 8px 4px 4px', WebkitTapHighlightColor:'transparent' }}>
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none"><path d="M10 2 L2 10 L10 18" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ marginLeft:'2px' }}>Home</span>
        </button>
        <div style={{ flex:1, textAlign:'center' }}>
          <div style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'17px', fontWeight:600, color:'#fff' }}>{title}</div>
          {subtitle && <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'10px', color:accent, marginTop:'1px' }}>{subtitle}</div>}
        </div>
        <div style={{ width:'72px' }}/>
      </div>
      {big && (
        <h1 style={{ fontFamily:'-apple-system,"SF Pro Display",system-ui,sans-serif', fontSize:'34px', fontWeight:700, color:'#fff', padding:'14px 18px 8px', letterSpacing:'-0.03em' }}>{title}</h1>
      )}
    </>
  );
}

/* ─── ABOUT VIEW ─────────────────────────────────────────── */
function MobileAboutView({ onBack }) {
  const C = window.SITE_CONTENT;
  const renderPara = (str, key) => {
    const parts = str.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'16px', lineHeight:1.55, color:'#c9d1d9', marginBottom:'14px', fontWeight:400 }}>
        {parts.map((p, i) => p.startsWith('{{')
          ? <span key={i} style={{ color:'#3fb950', fontFamily:'"JetBrains Mono",monospace', fontSize:'14px' }}>{p.slice(2,-2)}</span>
          : <React.Fragment key={i}>{p}</React.Fragment>)}
      </p>
    );
  };
  return (
    <div style={{ background:'#0d1117', minHeight:'100vh', paddingBottom:'80px' }}>
      <IOSAppHeader title="About" onBack={onBack}/>
      <div style={{ padding:'0 18px' }}>
        <div style={{ display:'flex', gap:'18px', alignItems:'center', marginBottom:'24px' }}>
          <img src={C.identity.avatar} alt="" style={{ width:'82px', height:'82px', borderRadius:'12px', objectFit:'cover', border:'1.5px solid #3fb950' }}/>
          <div>
            <div style={{ fontFamily:'-apple-system,"SF Pro Display",system-ui,sans-serif', fontSize:'22px', fontWeight:600, color:'#e6edf3', letterSpacing:'-0.02em' }}>{C.identity.name}</div>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#3fb950', marginTop:'4px' }}>{C.identity.role}</div>
          </div>
        </div>
        {C.about.paragraphs.map((p,i) => renderPara(p, i))}
        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'20px' }}>
          {C.links.map(({label, href}) => (
            <a key={label} href={href} target="_blank" rel="noopener" style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#8b949e', textDecoration:'none', padding:'8px 14px', border:'1px solid #21262d', background:'#161b22', borderRadius:'8px', display:'inline-flex', gap:'6px', alignItems:'center' }}>
              <span style={{ color:'#3fb950' }}>$</span>{label}
            </a>
          ))}
        </div>
      </div>
      <HomeIndicator/>
    </div>
  );
}

/* ─── EXPERTISE VIEW ─────────────────────────────────────── */
function MobileExpertiseView({ onBack }) {
  const C = window.SITE_CONTENT;
  return (
    <div style={{ background:'#0d1117', minHeight:'100vh', paddingBottom:'80px' }}>
      <IOSAppHeader title="Expertise" subtitle="$ ls ./expertise/" onBack={onBack}/>
      <div style={{ padding:'4px 16px' }}>
        {C.expertise.map((item, i) => (
          <div key={item.id} style={{ background:'#161b22', border:'1px solid #21262d', borderRadius:'14px', padding:'18px', marginBottom:'14px' }}>
            <div style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'10.5px', color:'#4a5568', marginBottom:'8px' }}>
              <span style={{ color:'#3fb950' }}>$</span> {item.cmd}
            </div>
            <h3 style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'18px', fontWeight:500, color:'#e6edf3', marginBottom:'12px', letterSpacing:'-0.02em' }}>{item.title}</h3>
            <div style={{ aspectRatio:'16/9', background:item.imgBg, border:'1px solid #21262d', borderRadius:'8px', overflow:'hidden', marginBottom:'12px' }}>
              <img src={item.img} alt="" loading="lazy" style={{ width:'100%', height:'100%', objectFit:'contain', padding:'6px' }}/>
            </div>
            <p style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'14px', lineHeight:1.55, color:'#8b949e', marginBottom:'12px' }}>{item.text}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
              {item.tags.map(t => (
                <span key={t} style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'10px', padding:'3px 8px', border:'1px solid #21262d', color:'#4a5568', background:'#0d1117', borderRadius:'4px' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <HomeIndicator/>
    </div>
  );
}

/* ─── PUBLICATIONS VIEW ──────────────────────────────────── */
function MobilePublicationsView({ onBack }) {
  const C = window.SITE_CONTENT;
  const [tab, setTab] = mUseState('pubs');
  return (
    <div style={{ background:'#f2f2f7', minHeight:'100vh', paddingBottom:'80px' }}>
      <IOSAppHeader title="Publications" onBack={onBack} accent="#0a84ff"/>
      {/* Segmented control */}
      <div style={{ padding:'0 16px 14px', background:'#0d1117' }}>
        <div style={{ background:'#21262d', borderRadius:'9px', padding:'2px', display:'flex', gap:'2px' }}>
          {[['pubs','Publications'],['pres','Presentations']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex:1, background: tab === id ? '#0a84ff' : 'transparent', color: tab === id ? '#fff' : '#8b949e', border:'none', borderRadius:'7px', padding:'7px 0', fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'13px', fontWeight: tab === id ? 600 : 500, cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:'14px 14px 0' }}>
        {(tab === 'pubs' ? C.publications : C.presentations).map((p, i) => (
          <div key={i} style={{ background:'#fff', borderRadius:'12px', padding:'14px 16px', marginBottom:'10px', borderLeft: p.first ? '3px solid #0a84ff' : '3px solid #e2e8f0' }}>
            <div style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'14px', fontWeight:600, color:'#1a1a2e', lineHeight:1.35, marginBottom:'4px' }}>{p.title}</div>
            <div style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'12px', color:'#444', marginBottom:'4px', lineHeight:1.4 }}>{p.authors}</div>
            <div style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'11.5px', color:'#666', fontStyle:'italic' }}>
              {p.journal || p.venue}{p.note ? ` · ${p.note}` : ''}{` · ${p.year}`}
              {p.doi && <> · <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener" style={{ color:'#0a84ff', fontStyle:'normal', textDecoration:'none' }}>DOI</a></>}
            </div>
            {p.first && <span style={{ display:'inline-block', fontSize:10, padding:'2px 7px', background:'#dcfce7', color:'#166534', borderRadius:4, marginTop:6 }}>first author</span>}
            {p.journal === 'In preparation' && <span style={{ display:'inline-block', fontSize:10, padding:'2px 7px', background:'#fef9c3', color:'#92400e', borderRadius:4, marginTop:6, marginLeft:4 }}>in prep</span>}
            {p.award && <div style={{ display:'inline-block', fontSize:11, color:'#92400e', background:'#fef3c7', padding:'3px 8px', borderRadius:4, marginTop:6 }}>{p.award}</div>}
          </div>
        ))}
      </div>
      <HomeIndicator dark={false}/>
    </div>
  );
}

/* ─── CONTACT VIEW ───────────────────────────────────────── */
function MobileContactView({ onBack }) {
  const C = window.SITE_CONTENT;
  return (
    <div style={{ background:'#0d1117', minHeight:'100vh', paddingBottom:'80px' }}>
      <IOSAppHeader title="Contact" onBack={onBack}/>
      <div style={{ padding:'0 18px' }}>
        <p style={{ fontFamily:'-apple-system,"SF Pro Text",system-ui,sans-serif', fontSize:'15px', color:'#8b949e', lineHeight:1.55, marginBottom:'24px' }}>{C.contact.blurb}</p>
        <div style={{ background:'#161b22', borderRadius:'14px', overflow:'hidden', border:'1px solid #21262d' }}>
          {C.contact.rows.map(({label, val, href}, i) => (
            <a key={label} href={href} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', textDecoration:'none', borderBottom: i < C.contact.rows.length - 1 ? '0.5px solid #21262d' : 'none', WebkitTapHighlightColor:'rgba(63,185,80,0.1)' }}>
              <span style={{ fontFamily:'-apple-system,system-ui,sans-serif', fontSize:'15px', color:'#e6edf3', fontWeight:500 }}>{label}</span>
              <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'12px', color:'#8b949e' }}>{val}</span>
            </a>
          ))}
        </div>
      </div>
      <HomeIndicator/>
    </div>
  );
}

/* ─── MOBILE APP ROOT ────────────────────────────────────── */
function MobileApp() {
  const [view, setView] = mUseState('home');
  const open = (id) => {
    if (id === 'about' || id === 'expertise' || id === 'publications' || id === 'contact') {
      setView(id);
      window.scrollTo(0, 0);
    }
  };
  const back = () => { setView('home'); window.scrollTo(0, 0); };

  if (view === 'about')        return <MobileAboutView onBack={back}/>;
  if (view === 'expertise')    return <MobileExpertiseView onBack={back}/>;
  if (view === 'publications') return <MobilePublicationsView onBack={back}/>;
  if (view === 'contact')      return <MobileContactView onBack={back}/>;
  return <MobileHome onOpen={open}/>;
}

Object.assign(window, { MobileApp });
