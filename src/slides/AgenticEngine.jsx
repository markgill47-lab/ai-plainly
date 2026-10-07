import Slide from '../components/Slide.jsx'

/*
  Ported from Beyond the Chatbot, "Anatomy of an Agent Framework"
  (src/slides/AgentFramework.jsx). Same geometry and six reveal phases;
  only the palette and frame are NextEd. Manager = Spirit Red,
  workers = Gateway Blue, checkers = Glacier Blue, tasks = gray.
*/
const TRACKS = [190, 380, 570]
const LY = { input: 48, manager: 150, tasks: 252, workers: 352, checkers: 452, report: 556 }
const NW = 150, NH = 44

const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.5s ease ${d}s` })

function Node({ x, y, label, sub, color, show, d = 0, w = NW }) {
  return (
    <g style={fade(show, d)}>
      <rect x={x - w / 2} y={y - NH / 2} width={w} height={NH} fill="var(--raised)" stroke="var(--line)" strokeWidth="1" />
      <rect x={x - w / 2} y={y - NH / 2} width={w} height={4} fill={color} />
      <text x={x - w / 2 + 14} y={sub ? y - 2 : y + 3} fontFamily="var(--font-display)" fontWeight="700" fontSize="13" fill="var(--ink)" dominantBaseline="middle">{label}</text>
      {sub && <text x={x - w / 2 + 14} y={y + 13} fontFamily="var(--font-body)" fontSize="9.5" fill="var(--ink-muted)" dominantBaseline="middle">{sub}</text>}
    </g>
  )
}

function Line({ x1, y1, x2, y2, show, d = 0, color = 'var(--line-strong)', dashed }) {
  const cy1 = y1 + (y2 - y1) * 0.4, cy2 = y1 + (y2 - y1) * 0.6
  return <path d={`M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`} fill="none" stroke={color} strokeWidth="1.2" strokeDasharray={dashed ? '3 4' : 'none'} style={fade(show, d)} />
}

const LEGEND = [
  { color: 'var(--spirit-red)', label: 'Manager · plans, delegates' },
  { color: 'var(--gateway)', label: 'Workers · execute' },
  { color: 'var(--glacier)', label: 'Checkers · verify' },
]

export default function AgenticEngine({ phase, slide }) {
  const RED = 'var(--spirit-red)', BLUE = 'var(--gateway)', GLACIER = 'var(--glacier)', GRAY = 'var(--silver)'
  return (
    <Slide slide={slide} title={<>The <em>agentic</em> engine</>}>
      <div style={{ width: '100%', height: '100%', display: 'flex', gap: 24, alignItems: 'stretch', justifyContent: 'center' }}>
        <svg viewBox="0 0 760 610" style={{ height: '100%', maxHeight: '62vh', width: 'auto', maxWidth: '100%', overflow: 'visible' }}>
          <Line x1={380 - 90} y1={LY.input + NH / 2} x2={380} y2={LY.manager - NH / 2} show={phase >= 1} color={GLACIER} />
          <Line x1={380 + 90} y1={LY.input + NH / 2} x2={380} y2={LY.manager - NH / 2} show={phase >= 1} color={GRAY} d={0.1} />
          {TRACKS.map((tx, i) => <Line key={`mt${i}`} x1={380} y1={LY.manager + NH / 2} x2={tx} y2={LY.tasks - NH / 2} show={phase >= 2} color={GRAY} d={0.08 * i} />)}
          {TRACKS.map((tx, i) => <Line key={`tw${i}`} x1={tx} y1={LY.tasks + NH / 2} x2={tx} y2={LY.workers - NH / 2} show={phase >= 3} color={BLUE} d={0.08 * i} />)}
          {TRACKS.map((tx, i) => <Line key={`wc${i}`} x1={tx} y1={LY.workers + NH / 2} x2={tx} y2={LY.checkers - NH / 2} show={phase >= 4} color={GLACIER} d={0.08 * i} />)}
          {TRACKS.map((tx, i) => <Line key={`cr${i}`} x1={tx} y1={LY.checkers + NH / 2} x2={380} y2={LY.report - 12} show={phase >= 5} color={RED} dashed d={0.08 * i} />)}
          <path d={`M 380 ${LY.report - 12} C 410 ${LY.report - 60}, 470 ${LY.manager + 60}, 392 ${LY.manager + NH / 2 + 4}`} fill="none" stroke={RED} strokeWidth="1.2" strokeDasharray="3 3" style={fade(phase >= 5, 0.3)} />

          <g style={fade(phase >= 2, 0.3)}>
            <rect x={380 - 36} y={LY.tasks - NH / 2 - 28} width={72} height={17} fill="var(--wash)" />
            <text x={380} y={LY.tasks - NH / 2 - 19} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="9" letterSpacing="0.14em" fill="var(--blue)">PARALLEL</text>
          </g>

          <Node x={380 - 90} y={LY.input} label="Knowledge" sub="Files, data, context" color={GLACIER} show={phase >= 0} w={130} />
          <Node x={380 + 90} y={LY.input} label="Goal" sub="What needs to happen" color={GRAY} show={phase >= 0} d={0.12} w={130} />
          <Node x={380} y={LY.manager} label="Manager agent" sub="Plans and delegates" color={RED} show={phase >= 1} w={170} />
          {['Data analysis', 'Draft report', 'Build charts'].map((s, i) => <Node key={`t${i}`} x={TRACKS[i]} y={LY.tasks} label={`Task ${i + 1}`} sub={s} color={GRAY} show={phase >= 2} d={0.08 * i} />)}
          {['Runs analysis', 'Writes content', 'Generates visuals'].map((s, i) => <Node key={`w${i}`} x={TRACKS[i]} y={LY.workers} label="Worker" sub={s} color={BLUE} show={phase >= 3} d={0.08 * i} />)}
          {['Validates numbers', 'Reviews accuracy', 'Checks format'].map((s, i) => <Node key={`c${i}`} x={TRACKS[i]} y={LY.checkers} label="Checker" sub={s} color={GLACIER} show={phase >= 4} d={0.08 * i} />)}

          <g style={fade(phase >= 5)}>
            <rect x={380 - 84} y={LY.report - 14} width={168} height={28} fill="var(--spirit-red)" />
            <text x={380} y={LY.report + 1} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="10" letterSpacing="0.14em" fill="#fff">REPORT TO MANAGER</text>
          </g>
        </svg>

        <aside style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 210 }}>
          <div className="kicker">Legend</div>
          {LEGEND.map(r => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-soft)' }}>
              <span style={{ width: 16, height: 6, background: r.color, flexShrink: 0 }} /> {r.label}
            </div>
          ))}
          <p className="small" style={{ marginTop: 10, maxWidth: 240, ...fade(phase >= 5, 0.4) }}>You are no longer operating software. You are directing it.</p>
        </aside>
      </div>
    </Slide>
  )
}
