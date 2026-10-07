import { useMemo, useRef, useState } from 'react'
import Slide from '../components/Slide.jsx'
import { fade } from './shared.js'
import {
  ROGERS_SEGMENTS, ROGERS_Y, bellCurve,
  GARTNER_POINTS, GARTNER_Y, GARTNER_MARKERS,
  JCURVE_POINTS, JCURVE_Y, WIN_START, WIN_END,
  segmentAt, gartnerPhaseAt, jcurveZoneAt, splineCurve, splineLookup,
} from '../data/adoptionTiming.js'

/*
  Adapted from the standalone Adoption Timing tool (C:\Projects\Adoption_Timing).
  Three curves on one axis: Rogers' adoption curve, the Gartner hype cycle,
  and the J-curve of return. Arrow keys layer the curves in (phases 0 to 2);
  the pills toggle them by hand. Click or drag on the chart to place yourself
  and the three readouts below follow.
*/
const W = 1200, H = 400
const PAD = { top: 26, right: 20, bottom: 56, left: 20 }
const CW = W - PAD.left - PAD.right, CH = H - PAD.top - PAD.bottom
const sx = (xN) => PAD.left + xN * CW
const sy = (yN) => PAD.top + CH - yN * CH
const clamp = (v) => Math.max(0, Math.min(1, v))

const INK = 'var(--line-strong)', BLUE = 'var(--gateway)', RED = 'var(--spirit-red)', YOU = 'var(--bold-orange)'
const CURVES = [
  { id: 'rogers', label: 'Adoption curve', color: INK, phase: 0 },
  { id: 'gartner', label: 'Hype cycle', color: BLUE, phase: 1 },
  { id: 'jcurve', label: 'J-curve of return', color: RED, phase: 2 },
]

const splinePath = (cp, { scale, off }) =>
  'M' + splineCurve(cp).map(p => `${sx(clamp(p.x)).toFixed(1)},${sy(clamp(p.y * scale + off)).toFixed(1)}`).join(' L')

const rogersY = (x) => bellCurve(x) * ROGERS_Y.scale + ROGERS_Y.off
const bellPoints = (from, to, n = 120) =>
  Array.from({ length: n + 1 }, (_, i) => from + ((to - from) * i) / n).map(x => `${sx(x).toFixed(1)},${sy(rogersY(x)).toFixed(1)}`)

const LABEL = { fontFamily: 'var(--font-display)', fontWeight: 700 }

export default function AdoptionTiming({ phase, slide }) {
  const [manual, setManual] = useState({})
  const [pos, setPos] = useState(null)
  const svgRef = useRef(null)
  const dragging = useRef(false)

  const paths = useMemo(() => ({
    rogers: 'M' + bellPoints(0, 1, 240).join(' L'),
    gartner: splinePath(GARTNER_POINTS, GARTNER_Y),
    jcurve: splinePath(JCURVE_POINTS, JCURVE_Y),
  }), [])
  const gartnerFn = useMemo(() => splineLookup(GARTNER_POINTS), [])
  const jcurveFn = useMemo(() => splineLookup(JCURVE_POINTS), [])
  const gartnerY = (x) => gartnerFn(x) * GARTNER_Y.scale + GARTNER_Y.off
  const jcurveY = (x) => jcurveFn(x) * JCURVE_Y.scale + JCURVE_Y.off

  const show = Object.fromEntries(CURVES.map(c => [c.id, manual[c.id] ?? phase >= c.phase]))

  const place = (e) => {
    const svg = svgRef.current
    if (!svg) return
    const pt = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    const local = pt.matrixTransform(svg.getScreenCTM().inverse())
    setPos(clamp((local.x - PAD.left) / CW))
  }

  const seg = pos === null ? null : segmentAt(pos)
  const gPhase = pos === null ? null : gartnerPhaseAt(pos)
  const jZone = pos === null ? null : jcurveZoneAt(pos)

  return (
    <Slide slide={slide} title={<>Adoption <em>timing</em></>} stageStyle={{ alignItems: 'stretch' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
        <div className="seg">
          {CURVES.map(c => (
            <button key={c.id} className={`pill${show[c.id] ? ' on' : ''}`} aria-pressed={show[c.id]}
              onClick={() => setManual(m => ({ ...m, [c.id]: !show[c.id] }))}>
              <span className="dot" style={{ background: show[c.id] ? c.color : 'var(--n400)' }} /> {c.label}
            </button>
          ))}
          <span className="small" style={{ marginLeft: 6 }}>Click the chart to place yourself.</span>
        </div>

        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ flex: '1 1 0', minHeight: 0, width: '100%', cursor: 'crosshair', touchAction: 'none', userSelect: 'none' }}
          onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); place(e) }}
          onPointerMove={(e) => { if (dragging.current) place(e) }}
          onPointerUp={() => { dragging.current = false }}
          onPointerCancel={() => { dragging.current = false }}>

          {/* J-curve optimal window */}
          <g style={fade(show.jcurve)}>
            <rect x={sx(WIN_START)} y={PAD.top} width={sx(WIN_END) - sx(WIN_START)} height={CH} fill="var(--ok-fill)" />
            <text x={(sx(WIN_START) + sx(WIN_END)) / 2} y={PAD.top - 8} textAnchor="middle" style={LABEL} fontSize="12" letterSpacing="0.14em" fill="var(--ink-muted)">OPTIMAL WINDOW</text>
            <line x1={sx(0)} y1={sy(JCURVE_Y.off)} x2={sx(1)} y2={sy(JCURVE_Y.off)} stroke={RED} strokeWidth="1" strokeDasharray="2 6" opacity="0.6" />
            <text x={sx(1)} y={sy(JCURVE_Y.off) + 16} textAnchor="end" style={LABEL} fontSize="11" letterSpacing="0.14em" fill="var(--ink-muted)">BREAK EVEN</text>
          </g>

          {/* Rogers segments: selected fill, dividers, labels */}
          <g style={fade(show.rogers)}>
            {seg && <polygon points={[`${sx(seg.x)},${sy(0)}`, ...bellPoints(seg.x, seg.x + seg.w, 60), `${sx(seg.x + seg.w)},${sy(0)}`].join(' ')} fill="var(--wash)" />}
            {ROGERS_SEGMENTS.slice(1).map(s => (
              <line key={s.name} x1={sx(s.x)} y1={sy(0)} x2={sx(s.x)} y2={sy(rogersY(s.x))} stroke="var(--line)" strokeWidth="1.5" />
            ))}
          </g>
          <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(0)} stroke="var(--line-strong)" strokeWidth="2" />
          {ROGERS_SEGMENTS.map(s => {
            const on = seg?.name === s.name
            return (
              <g key={s.name}>
                <line x1={sx(s.x)} y1={sy(0) - 5} x2={sx(s.x)} y2={sy(0) + 5} stroke="var(--line-strong)" strokeWidth="2" />
                <text x={sx(s.x + s.w / 2)} y={sy(0) + 24} textAnchor="middle" style={LABEL} fontSize="15" fill={on ? 'var(--blue)' : 'var(--ink)'}>{s.short}</text>
                <text x={sx(s.x + s.w / 2)} y={sy(0) + 42} textAnchor="middle" fontSize="13" fill="var(--ink-muted)">{s.pct}</text>
              </g>
            )
          })}

          {/* curves */}
          <path d={paths.rogers} fill="none" stroke={INK} strokeWidth="2.5" style={fade(show.rogers)} />
          <path d={paths.jcurve} fill="none" stroke={RED} strokeWidth="2.5" style={fade(show.jcurve)} />
          <path d={paths.gartner} fill="none" stroke={BLUE} strokeWidth="2.5" style={fade(show.gartner)} />

          {/* where the technologies sit on the hype cycle */}
          <g style={fade(show.gartner, 0.2)}>
            {GARTNER_MARKERS.map(m => {
              const x = sx(m.x), y = sy(gartnerY(m.x))
              const end = m.anchor === 'end'
              return (
                <g key={m.id}>
                  <circle cx={x} cy={y} r="7" fill={BLUE} stroke="var(--bg)" strokeWidth="2" />
                  <text x={x + (end ? -12 : 12)} y={y + 5} textAnchor={m.anchor} style={LABEL} fontSize="14" fill="var(--blue)" stroke="var(--bg)" strokeWidth="4" paintOrder="stroke">{m.label}</text>
                </g>
              )
            })}
          </g>

          {/* you */}
          {pos !== null && (
            <g>
              <line x1={sx(pos)} y1={PAD.top} x2={sx(pos)} y2={sy(0)} stroke={YOU} strokeWidth="2" />
              {show.rogers && <circle cx={sx(pos)} cy={sy(rogersY(pos))} r="6" fill={INK} stroke="var(--bg)" strokeWidth="2" />}
              {show.gartner && <circle cx={sx(pos)} cy={sy(gartnerY(pos))} r="6" fill={BLUE} stroke="var(--bg)" strokeWidth="2" />}
              {show.jcurve && <circle cx={sx(pos)} cy={sy(jcurveY(pos))} r="6" fill={RED} stroke="var(--bg)" strokeWidth="2" />}
              <rect x={sx(pos) - 22} y={PAD.top - 22} width="44" height="20" fill={YOU} />
              <text x={sx(pos)} y={PAD.top - 8} textAnchor="middle" style={LABEL} fontSize="12" letterSpacing="0.14em" fill="#101010">YOU</text>
            </g>
          )}
        </svg>

        <div className="readout">
          <div className={`panel gray${show.rogers ? '' : ' off'}`}>
            <div className="kicker">Where you sit</div>
            {seg ? <>
              <div className="h3">{seg.name} · {seg.pct}</div>
              <p className="small"><b>Gain.</b> {seg.gain}<br /><b>Risk.</b> {seg.risk}</p>
            </> : <p className="small">How any idea spreads across a population. It is about people, not technology.</p>}
          </div>
          <div className={`panel${show.gartner ? '' : ' off'}`}>
            <div className="kicker blue">Where the technology is</div>
            {gPhase ? <>
              <div className="h3">{gPhase.phase}</div>
              <p className="small">{gPhase.desc}</p>
            </> : <p className="small">Every new technology follows this arc. The dots are where the three kinds of AI sit today.</p>}
          </div>
          <div className={`panel red${show.jcurve ? '' : ' off'}`}>
            <div className="kicker red">When it pays off</div>
            {jZone ? <>
              <div className="h3">{jZone.status}</div>
              <p className="small">{jZone.desc}</p>
            </> : <p className="small">Early adopters absorb the cost before the return shows up. Wait too long and adopting is survival, not advantage.</p>}
          </div>
        </div>
      </div>
    </Slide>
  )
}
