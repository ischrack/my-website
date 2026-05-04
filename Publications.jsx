// Publications.jsx — continuous scroll PDF viewer + contact
// Content sourced from window.SITE_CONTENT (see content.js)

const PUBS = window.SITE_CONTENT.publications;
const PRESENTATIONS = window.SITE_CONTENT.presentations;

/* Shared text styles for the paper */
const paper = {
  wrap: { fontFamily:"-apple-system,'Helvetica Neue',sans-serif", color:'#1a1a2e' },
  h1:   { fontSize:22, fontWeight:700, color:'#1a1a2e', marginBottom:4, letterSpacing:'-0.02em' },
  meta: { fontSize:12, color:'#666', marginBottom:10 },
  divider: { borderTop:'2px solid #1a1a2e', margin:'0 0 28px' },
  sectionTitle: { fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'#888', margin:'32px 0 14px', paddingBottom:8, borderBottom:'1px solid #e8e8e8' },
  entry: (first) => ({ paddingLeft:16, borderLeft:`3px solid ${first ? '#2563eb' : '#e2e8f0'}`, marginBottom:22 }),
  title: { fontSize:13.5, fontWeight:600, color:'#1a1a2e', marginBottom:3, lineHeight:1.4 },
  authors: { fontSize:11.5, color:'#444', marginBottom:2, lineHeight:1.5 },
  journalLine: { fontSize:11, color:'#666', fontStyle:'italic' },
  badge: (c,bg) => ({ display:'inline-block', fontSize:10, padding:'2px 7px', background:bg, color:c, borderRadius:2, marginTop:5, marginRight:4 }),
  award: { display:'inline-block', fontSize:11, color:'#92400e', background:'#fef3c7', padding:'3px 8px', borderRadius:2, marginTop:5 },
  pageNum: { fontSize:10, color:'#ccc', textAlign:'right', marginTop:48, paddingTop:12, borderTop:'1px solid #eee' },
};

function PubEntry({ p }) {
  return (
    <div style={paper.entry(p.first)}>
      <div style={paper.title}>{p.title}</div>
      <div style={paper.authors}>{p.authors}</div>
      <div style={paper.journalLine}>
        <em>{p.journal}</em>
        {p.note ? ` · ${p.note}` : ''}
        {p.doi ? <> · <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener" style={{ color:'#2563eb', fontStyle:'normal', textDecoration:'none' }} onMouseEnter={e=>e.target.style.textDecoration='underline'} onMouseLeave={e=>e.target.style.textDecoration='none'}>DOI: {p.doi}</a></> : ''}
        {` · ${p.year}`}
      </div>
      {p.first && <span style={paper.badge('#166534','#dcfce7')}>first author</span>}
      {p.journal === 'In preparation' && <span style={paper.badge('#92400e','#fef9c3')}>in prep</span>}
    </div>
  );
}

function PresEntry({ p }) {
  return (
    <div style={paper.entry(false)}>
      <div style={paper.title}>{p.title}</div>
      <div style={paper.authors}>{p.authors}</div>
      <div style={paper.journalLine}><em>{p.venue}</em>{p.note ? ` · ${p.note}` : ''}{` · ${p.year}`}</div>
      {p.award && <div style={paper.award}>{p.award}</div>}
    </div>
  );
}

function PublicationsContent() {
  return (
    <div style={{ display:'flex', flexDirection:'column', position:'absolute', inset:0, background:'#686868' }}>
      {/* Preview-style toolbar */}
      <div style={{ height:40, background:'linear-gradient(180deg,#e8e8e8,#d4d4d4)', borderBottom:'1px solid #aaa', display:'flex', alignItems:'center', padding:'0 12px', gap:6, flexShrink:0 }}>
        <div style={{ display:'flex', background:'linear-gradient(180deg,#fff,#ddd)', border:'1px solid #aaa', borderRadius:5, overflow:'hidden' }}>
          {['‹','›'].map((a,i) => (
            <button key={i} style={{ width:28, height:26, background:'transparent', border:'none', borderRight: i===0 ? '1px solid #bbb' : 'none', cursor:'pointer', fontSize:15, color:'#444', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'serif' }}>{a}</button>
          ))}
        </div>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', gap:1, background:'linear-gradient(180deg,#fff,#ddd)', border:'1px solid #aaa', borderRadius:5, overflow:'hidden' }}>
          {['−','+'].map(z => <button key={z} style={{ width:28, height:26, background:'transparent', border:'none', cursor:'pointer', fontSize:13, color:'#444', display:'flex', alignItems:'center', justifyContent:'center' }}>{z}</button>)}
        </div>
        <span style={{ fontFamily:"-apple-system,sans-serif", fontSize:12, color:'#555', width:42, textAlign:'center' }}>100%</span>
        <div style={{ width:1, height:20, background:'#bbb', margin:'0 4px' }}/>
        <button style={{ height:26, padding:'0 10px', background:'linear-gradient(180deg,#fff,#ddd)', border:'1px solid #aaa', borderRadius:4, cursor:'pointer', fontFamily:"-apple-system,sans-serif", fontSize:11, color:'#444' }}>
          Thumbnails
        </button>
      </div>

      {/* Continuous scroll document */}
      <div style={{ flex:1, overflowY:'auto', padding:'28px 20px', background:'#686868', display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
        {/* Single continuous paper */}
        <div style={{ background:'#fff', width:'100%', maxWidth:660, boxShadow:'0 4px 28px rgba(0,0,0,0.45)', padding:'56px 60px', ...paper.wrap }}>

          {/* Header */}
          <div style={paper.divider}>
            <div style={paper.h1}>{window.SITE_CONTENT.identity.name}</div>
            <div style={paper.meta}>{window.SITE_CONTENT.identity.roleLong}</div>
            <div style={{ display:'flex', gap:20, fontSize:11, color:'#777', flexWrap:'wrap', marginBottom:16 }}>
              {window.SITE_CONTENT.contact.rows.filter(r => r.label !== 'LinkedIn').map(r => <span key={r.label}>{r.val}</span>)}
            </div>
          </div>

          {/* Publications */}
          <div style={paper.sectionTitle}>Peer-Reviewed Publications</div>
          {PUBS.map((p, i) => <PubEntry key={i} p={p} />)}

          {/* Separator */}
          <div style={{ borderTop:'1px solid #e8e8e8', margin:'8px 0 0' }}/>

          {/* Presentations */}
          <div style={paper.sectionTitle}>Presentations</div>
          {PRESENTATIONS.map((p, i) => <PresEntry key={i} p={p} />)}

          <div style={paper.pageNum}>Ian A. Schrack · Publications & Presentations</div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT ─────────────────────── */
function ContactContent() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const inp = { width:'100%', background:'#161b22', border:'1px solid #21262d', color:'#c9d1d9', fontFamily:'var(--t-body)', fontSize:13, padding:'10px 12px', outline:'none', transition:'border-color 0.15s' };
  return (
    <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column' }}>
    <div style={{ flex:1, overflowY:'auto', padding:'28px 32px', background:'#0d1117', scrollbarWidth:'thin', scrollbarColor:'#21262d #0d1117' }}>
      <div style={{ fontFamily:'var(--t-mono)', fontSize:11, color:'#4a5568', marginBottom:18 }}><span style={{ color:'var(--accent)' }}>$</span> open contact_form.sh</div>
      <h2 style={{ fontFamily:'var(--t-mono)', fontSize:20, fontWeight:500, color:'#e6edf3', marginBottom:6, letterSpacing:'-0.02em' }}>Get in touch</h2>
      <p style={{ fontFamily:'var(--t-body)', fontSize:14, color:'#8b949e', marginBottom:24, lineHeight:1.7, fontWeight:300 }}>{window.SITE_CONTENT.contact.blurb}</p>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:28 }}>
        {window.SITE_CONTENT.contact.rows.map(({label, val, href}) => (
          <a key={label} href={href} target="_blank" rel="noopener" style={{ display:'flex', alignItems:'center', gap:14, padding:'9px 14px', background:'#161b22', border:'1px solid #21262d', textDecoration:'none', transition:'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor='#21262d'}>
            <span style={{ fontFamily:'var(--t-mono)', fontSize:11, color:'var(--accent)', minWidth:56 }}>{label}</span>
            <span style={{ fontFamily:'var(--t-mono)', fontSize:11, color:'#8b949e' }}>{val}</span>
          </a>
        ))}
      </div>
      {!sent ? (
        <>
          <div style={{ fontFamily:'var(--t-mono)', fontSize:10, color:'#4a5568', marginBottom:12, letterSpacing:'0.08em' }}>// or send a direct message</div>
          {['name','email','message'].map(f => (
            <div key={f} style={{ marginBottom:12 }}>
              <label style={{ fontFamily:'var(--t-mono)', fontSize:10, color:'#4a5568', display:'block', marginBottom:5 }}><span style={{ color:'var(--accent)' }}>$</span> {f}</label>
              {f === 'message'
                ? <textarea rows={4} value={form[f]} onChange={e => setForm(p=>({...p,[f]:e.target.value}))} style={{ ...inp, resize:'vertical' }} onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='#21262d'}/>
                : <input type={f==='email'?'email':'text'} value={form[f]} onChange={e => setForm(p=>({...p,[f]:e.target.value}))} style={inp} onFocus={e=>e.target.style.borderColor='var(--accent)'} onBlur={e=>e.target.style.borderColor='#21262d'}/>}
            </div>
          ))}
          <button onClick={() => setSent(true)} style={{ fontFamily:'var(--t-mono)', fontSize:12, padding:'10px 22px', background:'transparent', border:'1px solid var(--accent)', color:'var(--accent)', cursor:'pointer', letterSpacing:'0.05em', transition:'all 0.15s' }}
            onMouseEnter={e=>{e.target.style.background='var(--accent)';e.target.style.color='#000';}}
            onMouseLeave={e=>{e.target.style.background='transparent';e.target.style.color='var(--accent)';}}>
            $ send_message
          </button>
        </>
      ) : (
        <div style={{ fontFamily:'var(--t-mono)', fontSize:13, color:'var(--accent)', padding:'14px 16px', border:'1px solid var(--accent)', background:'rgba(63,185,80,0.06)' }}>
          ✓ message sent — I'll be in touch soon.
        </div>
      )}
    </div>
    </div>
  );
}

Object.assign(window, { PublicationsContent, ContactContent });
