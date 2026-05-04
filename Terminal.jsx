// Terminal.jsx — terminal window content (hero + expertise)
// Content sourced from window.SITE_CONTENT (see content.js)

const EXPERTISE = window.SITE_CONTENT.expertise;

function useTypewriter(text, speed, startDelay, trigger = true) {
  const [displayed, setDisplayed] = React.useState('');
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    if (!trigger) return;
    setDisplayed(''); setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, trigger]);
  return { displayed, done };
}

function BlinkCursor() {
  const [on, setOn] = React.useState(true);
  React.useEffect(() => { const iv = setInterval(() => setOn(p => !p), 530); return () => clearInterval(iv); }, []);
  return (
    <span style={{
      display: 'inline-block', width: '0.55em', height: '1em',
      background: on ? 'var(--accent)' : 'transparent',
      verticalAlign: 'text-bottom', marginLeft: '2px',
    }}/>
  );
}

function ExpertiseImage({ img, imgBg }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div style={{ position:'relative', width:'100%', aspectRatio:'16/9', overflow:'hidden', border:'1px solid #21262d', background: imgBg || '#0d1117' }}>
      <img
        src={img}
        alt=""
        onLoad={() => setLoaded(true)}
        style={{
          width:'100%', height:'100%', objectFit:'contain',
          display:'block',
          opacity: loaded ? 1 : 0,
          transition:'opacity 0.4s ease',
          padding:'8px',
        }}
      />
      {!loaded && (
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontFamily:'var(--t-mono)', fontSize:'10px', color:'rgba(140,180,140,0.4)', letterSpacing:'0.05em' }}>loading…</span>
        </div>
      )}
    </div>
  );
}

function ExpertiseSection({ item, index }) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1, root: el.closest('.t-scroll') });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      padding: '32px 0', borderTop: '1px solid #21262d',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ${index * 0.08}s, transform 0.6s ${index * 0.08}s`,
    }}>
      <div style={{ fontFamily: 'var(--t-mono)', fontSize: '11px', color: '#4a5568', marginBottom: '10px' }}>
        <span style={{ color: 'var(--accent)' }}>$</span> {item.cmd}
      </div>
      <h3 style={{ fontFamily: 'var(--t-mono)', fontSize: '20px', fontWeight: 500, color: '#e6edf3', marginBottom: '16px', letterSpacing: '-0.02em' }}>{item.title}</h3>
      <ExpertiseImage img={item.img} imgBg={item.imgBg} />
      <p style={{ fontFamily: 'var(--t-body)', fontSize: '14px', lineHeight: 1.8, color: '#8b949e', margin: '16px 0', fontWeight: 300 }}>{item.text}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {item.tags.map(t => (
          <span key={t} style={{ fontFamily: 'var(--t-mono)', fontSize: '10px', padding: '3px 8px', border: '1px solid #21262d', color: '#4a5568', background: '#161b22', letterSpacing: '0.03em', cursor: 'default', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.target.style.borderColor = '#21262d'; e.target.style.color = '#4a5568'; }}
          >{t}</span>
        ))}
      </div>
    </div>
  );
}

function TerminalContent() {
  const C = window.SITE_CONTENT;
  const { displayed: nameText, done: nameDone } = useTypewriter(C.identity.handle, 55, 300);
  const { displayed: roleText, done: roleDone } = useTypewriter(C.identity.role, 45, nameDone ? 200 : 99999, nameDone);
  const [showBody, setShowBody] = React.useState(false);
  React.useEffect(() => { if (roleDone) setTimeout(() => setShowBody(true), 300); }, [roleDone]);

  // Render an about paragraph string; tokens like {{Foo}} get accent treatment
  const renderPara = (str, key) => {
    const parts = str.split(/(\{\{[^}]+\}\})/g);
    return (
      <p key={key} style={{ fontFamily: 'var(--t-body)', fontSize: '13.5px', lineHeight: 1.85, color: '#8b949e', marginBottom: '12px', fontWeight: 300 }}>
        {parts.map((p, i) => p.startsWith('{{')
          ? <span key={i} style={{ color: 'var(--accent)', fontFamily: 'var(--t-mono)', fontSize: '12px' }}>{p.slice(2, -2)}</span>
          : <React.Fragment key={i}>{p}</React.Fragment>
        )}
      </p>
    );
  };

  return (
    <div style={{ position:'absolute', inset:0, background:'#0d1117', display:'flex', flexDirection:'column' }}>
    <div className="t-scroll" style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', scrollbarWidth: 'thin', scrollbarColor: '#21262d #0d1117' }}>
      {/* Prompt line */}
      <div style={{ fontFamily: 'var(--t-mono)', fontSize: '11px', color: '#4a5568', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ color: 'var(--accent)' }}>ian@schrack</span>
        <span style={{ color: '#21262d' }}>~</span>
        <span>whoami</span>
      </div>

      {/* Avatar + Name */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <div style={{ width:'72px', height:'72px', flexShrink:0, border:'1.5px solid var(--accent)', background:'#161b22', position:'relative', overflow:'hidden', borderRadius:'2px' }}>
          <img src={C.identity.avatar} alt={C.identity.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--t-mono)', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 500, color: '#e6edf3', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
            {nameText}{!nameDone && <BlinkCursor/>}
          </h1>
          <div style={{ fontFamily: 'var(--t-mono)', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.04em', opacity: nameDone ? 1 : 0, transition: 'opacity 0.4s' }}>
            {roleText}{nameDone && !roleDone && <BlinkCursor/>}
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ opacity: showBody ? 1 : 0, transform: showBody ? 'none' : 'translateY(10px)', transition: 'opacity 0.6s, transform 0.6s', marginBottom: '28px' }}>
        <div style={{ fontFamily: 'var(--t-mono)', fontSize: '11px', color: '#4a5568', marginBottom: '10px' }}><span style={{ color: 'var(--accent)' }}>$</span> cat about.md</div>
        {C.about.paragraphs.map((p, i) => renderPara(p, i))}
      </div>

      {/* Links */}
      {showBody && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {C.links.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener" style={{ fontFamily: 'var(--t-mono)', fontSize: '11px', color: '#4a5568', textDecoration: 'none', padding: '6px 12px', border: '1px solid #21262d', background: '#161b22', letterSpacing: '0.04em', display: 'flex', gap: '6px', alignItems: 'center', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#21262d'; e.currentTarget.style.color = '#4a5568'; }}
            ><span style={{ color: 'var(--accent)', opacity: 0.7 }}>$</span>{label}</a>
          ))}
        </div>
      )}

      {/* Expertise */}
      {showBody && (
        <>
          <div style={{ fontFamily: 'var(--t-mono)', fontSize: '11px', color: '#4a5568', marginBottom: '6px' }}><span style={{ color: 'var(--accent)' }}>$</span> ls ./expertise/</div>
          <div style={{ fontFamily: 'var(--t-mono)', fontSize: '10px', color: '#2a3540', marginBottom: '24px', letterSpacing: '0.15em' }}>AREAS OF EXPERTISE</div>
          {EXPERTISE.map((item, i) => <ExpertiseSection key={item.id} item={item} index={i}/>)}
          <div style={{ padding: '24px 0', fontFamily: 'var(--t-mono)', fontSize: '11px', color: '#21262d' }}>
            <BlinkCursor/>
          </div>
        </>
      )}
    </div>
    </div>
  );
}

Object.assign(window, { TerminalContent });
