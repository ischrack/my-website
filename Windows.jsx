// Windows.jsx — window chrome, drag, resize, genie effect

const { useState, useEffect, useRef, useCallback } = React;

/* ─── GENIE CSS ─────────────────────── */
const GENIE_CSS = `
@keyframes genie-out {
  0%  { clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%);
        transform:translate(0px,0px); opacity:1; }
  18% { clip-path:polygon(0% 0%,100% 0%,65% 100%,35% 100%);
        transform:translate(calc(var(--gtx)*.08),calc(var(--gty)*.09)); opacity:1; }
  38% { clip-path:polygon(0% 0%,100% 0%,54% 100%,46% 100%);
        transform:translate(calc(var(--gtx)*.26),calc(var(--gty)*.30)); opacity:1; }
  55% { clip-path:polygon(0% 0%,100% 0%,52% 100%,48% 100%);
        transform:translate(calc(var(--gtx)*.48),calc(var(--gty)*.53)); opacity:.95; }
  70% { clip-path:polygon(6% 0%,94% 0%,52% 100%,48% 100%);
        transform:translate(calc(var(--gtx)*.66),calc(var(--gty)*.70)); opacity:.8; }
  83% { clip-path:polygon(22% 0%,78% 0%,51% 100%,49% 100%);
        transform:translate(calc(var(--gtx)*.84),calc(var(--gty)*.84)); opacity:.5; }
  93% { clip-path:polygon(40% 0%,60% 0%,51% 100%,49% 100%);
        transform:translate(calc(var(--gtx)*.96),calc(var(--gty)*.96)); opacity:.15; }
  100%{ clip-path:polygon(49% 0%,51% 0%,50% 100%,50% 100%);
        transform:translate(var(--gtx),var(--gty)); opacity:0; }
}
@keyframes genie-in {
  0%  { clip-path:polygon(49% 0%,51% 0%,50% 100%,50% 100%);
        transform:translate(var(--gtx),var(--gty)); opacity:0; }
  7%  { clip-path:polygon(40% 0%,60% 0%,51% 100%,49% 100%);
        transform:translate(calc(var(--gtx)*.96),calc(var(--gty)*.96)); opacity:.15; }
  17% { clip-path:polygon(22% 0%,78% 0%,51% 100%,49% 100%);
        transform:translate(calc(var(--gtx)*.84),calc(var(--gty)*.84)); opacity:.5; }
  30% { clip-path:polygon(6% 0%,94% 0%,52% 100%,48% 100%);
        transform:translate(calc(var(--gtx)*.66),calc(var(--gty)*.70)); opacity:.8; }
  45% { clip-path:polygon(0% 0%,100% 0%,52% 100%,48% 100%);
        transform:translate(calc(var(--gtx)*.48),calc(var(--gty)*.53)); opacity:.95; }
  62% { clip-path:polygon(0% 0%,100% 0%,54% 100%,46% 100%);
        transform:translate(calc(var(--gtx)*.26),calc(var(--gty)*.30)); opacity:1; }
  82% { clip-path:polygon(0% 0%,100% 0%,65% 100%,35% 100%);
        transform:translate(calc(var(--gtx)*.08),calc(var(--gty)*.09)); opacity:1; }
  100%{ clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%);
        transform:translate(0px,0px); opacity:1; }
}
`;

/* ─── HELPERS ─────────────────────── */
const parseSize = s => typeof s === 'string' ? parseInt(s) : (s || 400);

function useDraggable(initX, initY) {
  const [pos, setPosState] = useState({ x: initX, y: initY });
  const posRef = useRef({ x: initX, y: initY });
  const start = useRef(null);

  const setPos = useCallback((p) => {
    const np = typeof p === 'function' ? p(posRef.current) : p;
    posRef.current = np;
    setPosState(np);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const { x: px, y: py } = posRef.current;
    start.current = { mx: e.clientX, my: e.clientY, px, py };
    const onMove = (mv) => {
      if (!start.current) return;
      setPos({ x: Math.max(0, start.current.px + mv.clientX - start.current.mx), y: Math.max(28, start.current.py + mv.clientY - start.current.my) });
    };
    const onUp = () => { start.current = null; window.removeEventListener('mousemove', onMove); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp, { once: true });
  }, []);

  return { pos, posRef, setPos, handleMouseDown };
}

/* ─── TRAFFIC LIGHTS ─────────────────────── */
function TrafficLights({ onClose, onMinimize, onMaximize }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ display:'flex', gap:'8px', alignItems:'center' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {[['#ff5f57','✕',onClose],['#febc2e','–',onMinimize],['#28c840','+',onMaximize]].map(([color,sym,action]) => (
        <button key={color} onClick={e => { e.stopPropagation(); action?.(); }}
          style={{ width:13, height:13, borderRadius:'50%', background:color, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'rgba(0,0,0,0.55)', fontWeight:800, fontFamily:'monospace', flexShrink:0 }}>
          {hover ? sym : ''}
        </button>
      ))}
    </div>
  );
}

/* ─── WINDOW ─────────────────────── */
const RESIZE_HANDLES = [
  { dir:'n',  s:{ top:0, left:6, right:6, height:5, cursor:'n-resize' } },
  { dir:'ne', s:{ top:0, right:0, width:10, height:10, cursor:'ne-resize' } },
  { dir:'e',  s:{ top:6, right:0, bottom:6, width:5, cursor:'e-resize' } },
  { dir:'se', s:{ bottom:0, right:0, width:10, height:10, cursor:'se-resize' } },
  { dir:'s',  s:{ bottom:0, left:6, right:6, height:5, cursor:'s-resize' } },
  { dir:'sw', s:{ bottom:0, left:0, width:10, height:10, cursor:'sw-resize' } },
  { dir:'w',  s:{ top:6, left:0, bottom:6, width:5, cursor:'w-resize' } },
  { dir:'nw', s:{ top:0, left:0, width:10, height:10, cursor:'nw-resize' } },
];

function Window({ id, title, subtitle, children, width, height, initX, initY, zIndex, onFocus, onClose, onDocked, genieState, isTerminal }) {
  const { pos, posRef, setPos, handleMouseDown } = useDraggable(initX, initY);
  const [size, setSize] = useState({ w: parseSize(width), h: parseSize(height) });
  const sizeRef = useRef(size);
  useEffect(() => { sizeRef.current = size; }, [size]);

  const [maximized, setMaximized] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [anim, setAnim] = useState(null);
  const winRef = useRef(null);
  const prevState = useRef(genieState);

  // Inject genie CSS once
  useEffect(() => {
    if (!document.getElementById('genie-style')) {
      const s = document.createElement('style');
      s.id = 'genie-style';
      s.textContent = GENIE_CSS;
      document.head.appendChild(s);
    }
  }, []);

  // Watch genieState transitions
  useEffect(() => {
    if (prevState.current === genieState) return;
    const prev = prevState.current;
    prevState.current = genieState;

    if (genieState === 'minimizing' && prev === 'open') {
      if (winRef.current) {
        // Compute translation to exact dock icon
        const dockEl = document.querySelector(`[data-dock-id="${id}"]`);
        const wr = winRef.current.getBoundingClientRect();
        const winCX = wr.left + wr.width / 2;
        const winCY = wr.top + wr.height / 2;
        let dockCX = window.innerWidth / 2;
        let dockCY = window.innerHeight - 50;
        if (dockEl) {
          const dr = dockEl.getBoundingClientRect();
          dockCX = dr.left + dr.width / 2;
          dockCY = dr.top + dr.height / 2;
        }
        winRef.current.style.setProperty('--gtx', `${dockCX - winCX}px`);
        winRef.current.style.setProperty('--gty', `${dockCY - winCY}px`);
      }
      setAnim('out');
      setAnimating(true);
    }

    if (genieState === 'restoring' && prev === 'docked') {
      if (winRef.current) {
        const dockEl = document.querySelector(`[data-dock-id="${id}"]`);
        const wr = winRef.current.getBoundingClientRect();
        const winCX = wr.left + wr.width / 2;
        const winCY = wr.top + wr.height / 2;
        let dockCX = window.innerWidth / 2;
        let dockCY = window.innerHeight - 50;
        if (dockEl) {
          const dr = dockEl.getBoundingClientRect();
          dockCX = dr.left + dr.width / 2;
          dockCY = dr.top + dr.height / 2;
        }
        winRef.current.style.setProperty('--gtx', `${dockCX - winCX}px`);
        winRef.current.style.setProperty('--gty', `${dockCY - winCY}px`);
      }
      setAnim('in');
      setAnimating(true);
    }
  }, [genieState, id]);

  const handleAnimEnd = () => {
    setAnimating(false);
    if (anim === 'out') { setAnim(null); onDocked?.(id); }
    else setAnim(null);
  };

  // Resize
  const handleResizeStart = useCallback((e, dir) => {
    e.preventDefault(); e.stopPropagation();
    const sx = e.clientX, sy = e.clientY;
    const { w: sw, h: sh } = sizeRef.current;
    const { x: px, y: py } = posRef.current;
    const onMove = (mv) => {
      const dx = mv.clientX - sx, dy = mv.clientY - sy;
      let nw = sw, nh = sh, nx = px, ny = py;
      if (dir.includes('e')) nw = Math.max(320, sw + dx);
      if (dir.includes('s')) nh = Math.max(200, sh + dy);
      if (dir.includes('w')) { nw = Math.max(320, sw - dx); nx = px + sw - nw; }
      if (dir.includes('n')) { nh = Math.max(200, sh - dy); ny = py + sh - nh; }
      setSize({ w: nw, h: nh });
      setPos({ x: nx, y: Math.max(28, ny) });
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', () => window.removeEventListener('mousemove', onMove), { once: true });
  }, []);

  const isVisible = genieState !== 'docked' && genieState !== 'closed';
  if (!isVisible && !animating) return null;

  const eff = maximized
    ? { left:0, top:28, width:'100vw', height:'calc(100vh - 28px)' }
    : { left:pos.x, top:pos.y, width:size.w, height:size.h };

  const borderCol = isTerminal ? '#30363d' : '#c8c8c8';

  return (
    <div ref={winRef} onMouseDown={onFocus}
      onAnimationEnd={handleAnimEnd}
      style={{
        position:'fixed', ...eff, zIndex,
        display:'flex', flexDirection:'column',
        borderRadius: maximized ? 0 : 10,
        overflow:'hidden',
        border:`1px solid ${borderCol}`,
        boxShadow:'0 28px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4)',
        animation: animating ? `genie-${anim === 'out' ? 'out' : 'in'} 0.5s cubic-bezier(0.25,0.1,0.25,1) forwards` : 'none',
        transformOrigin:'center center',
        userSelect: animating ? 'none' : 'auto',
      }}>

      {/* Resize handles */}
      {!maximized && RESIZE_HANDLES.map(({ dir, s }) => (
        <div key={dir} onMouseDown={e => handleResizeStart(e, dir)}
          style={{ position:'absolute', zIndex:10, ...s }} />
      ))}

      {/* Title bar */}
      <div onMouseDown={handleMouseDown} style={{
        height:38, flexShrink:0,
        background: isTerminal ? 'linear-gradient(180deg,#262c36,#1c2128)' : 'linear-gradient(180deg,#f4f4f4,#e4e4e4)',
        display:'flex', alignItems:'center', padding:'0 12px',
        cursor:'grab', userSelect:'none',
        borderBottom:`1px solid ${borderCol}`,
        position:'relative',
      }}>
        <TrafficLights
          onClose={onClose}
          onMinimize={() => onDocked?.(id, 'start')}
          onMaximize={() => setMaximized(m => !m)}
        />
        <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', textAlign:'center', pointerEvents:'none' }}>
          <div style={{ fontFamily: isTerminal ? "'JetBrains Mono',monospace" : "-apple-system,sans-serif", fontSize:13, fontWeight:500, color: isTerminal ? '#8b949e' : '#444' }}>{title}</div>
          {subtitle && <div style={{ fontFamily: isTerminal ? "'JetBrains Mono',monospace" : "-apple-system,sans-serif", fontSize:10, color: isTerminal ? '#4a5568' : '#999' }}>{subtitle}</div>}
        </div>
        {/* Resize grip hint in corner */}
        {!maximized && !isTerminal && (
          <div style={{ position:'absolute', right:8, bottom:6, opacity:0.25 }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><line x1="10" y1="0" x2="0" y2="10" stroke="#888" strokeWidth="1"/><line x1="10" y1="4" x2="4" y2="10" stroke="#888" strokeWidth="1"/></svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        {children}
      </div>

      {/* Bottom-right resize visual for terminal */}
      {!maximized && isTerminal && (
        <div onMouseDown={e => handleResizeStart(e, 'se')}
          style={{ position:'absolute', bottom:0, right:0, width:14, height:14, cursor:'se-resize', zIndex:10, display:'flex', alignItems:'flex-end', justifyContent:'flex-end', padding:'2px' }}>
          <svg width="8" height="8" viewBox="0 0 8 8" style={{ opacity:0.25 }}>
            <line x1="8" y1="0" x2="0" y2="8" stroke="#8b949e" strokeWidth="1"/>
            <line x1="8" y1="3" x2="3" y2="8" stroke="#8b949e" strokeWidth="1"/>
          </svg>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Window, useDraggable, TrafficLights });
