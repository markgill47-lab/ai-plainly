import { useEffect, useRef, useState } from 'react'
import Slide from '../components/Slide.jsx'
import { useApp } from '../context/AppContext.jsx'
import { fade } from './shared.js'

/*
  Ported from Beyond the Chatbot, "The Creative Engine"
  (src/slides/CreativeEngine.jsx). Same geometry, three reveal phases and
  clickable stations; only the palette and frame are NextEd. Human and
  Review = Spirit Red, Generate = Gateway Blue, Intent and Present = Glacier.
  Motion (keyframes in global.css): dots circle the cycle ring, and once the
  outputs are revealed, arrows fly along random spokes, blue from the center
  out to a medium and glacier from a medium back in.
*/
const CX = 340, CY = 300, INNER_R = 112, OUTER_R = 244
const polar = (r, deg) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)]

const RED = 'var(--spirit-red)', BLUE = 'var(--gateway)', GLACIER = 'var(--glacier)'

const STAGES = [
  { id: 'intent', label: 'Intent', color: GLACIER, angle: -90 },
  { id: 'generate', label: 'Generate', color: BLUE, angle: 0 },
  { id: 'review', label: 'Review', color: RED, angle: 90 },
  { id: 'present', label: 'Present', color: GLACIER, angle: 180 },
]

/* output types, each with a simple line icon drawn in an 18-unit box centered on 0,0 */
const OUTPUTS = [
  { label: 'Documents', icon: 'M-6 -9 H3 L7 -5 V9 H-6 Z M-3 -1 H4 M-3 3 H4' },
  { label: 'Video', icon: 'M-9 -6 H9 V6 H-9 Z M-2 -3 L3 0 L-2 3 Z' },
  { label: 'Imagery', icon: 'M-9 -7 H9 V7 H-9 Z M-9 5 L-3 -1 L1 3 L4 0 L9 5 M3 -3.5 a1.2 1.2 0 1 0 2.4 0 a1.2 1.2 0 1 0 -2.4 0' },
  { label: 'Music', icon: 'M-3 6 V-7 L6 -9 V4 M-3 6 a2.5 2.5 0 1 1 -5 0 a2.5 2.5 0 1 1 5 0 M6 4 a2.5 2.5 0 1 1 -5 0 a2.5 2.5 0 1 1 5 0' },
  { label: 'Software', icon: 'M-3 -6 L-9 0 L-3 6 M3 -6 L9 0 L3 6' },
  { label: 'Presentations', icon: 'M-9 -8 H9 V3 H-9 Z M0 3 V8 M-4 8 H4' },
  { label: 'Databases', icon: 'M-7 -6 a7 3 0 1 0 14 0 a7 3 0 1 0 -14 0 M-7 -6 V6 a7 3 0 0 0 14 0 V-6 M-7 0 a7 3 0 0 0 14 0' },
  { label: '3D Models', icon: 'M0 -9 L8 -4.5 V4.5 L0 9 L-8 4.5 V-4.5 Z M-8 -4.5 L0 0 L8 -4.5 M0 0 V9' },
  { label: 'Spreadsheets', icon: 'M-9 -7 H9 V7 H-9 Z M-9 -2 H9 M-9 3 H9 M-3 -7 V7 M3 -7 V7' },
]
const BADGE_R = 21

const CONTENT = {
  human: {
    name: 'The human at the center', tag: 'Judgment, creativity, initiative',
    body: [
      'Every output begins with a human decision. The engine doesn’t start itself. Someone has to define the intent: what are we making, why does it matter, and what does good look like.',
      'The human curates the knowledge that feeds the system. Selecting, organizing, and validating the inputs is a skill that determines the quality of everything downstream.',
      'And at every stage of the cycle, human judgment is the checkpoint. The AI can generate, but only a human can decide whether the output serves the purpose.',
      'The engine amplifies human capability. It does not replace human responsibility.',
    ],
  },
  intent: {
    name: 'Intent', tag: 'Define what you’re making and why',
    body: [
      'Intent is where creation begins. Before anything is generated, someone has to articulate what needs to exist. Not a prompt, a purpose. What problem does this solve? Who is it for?',
      'Clear intent is the single biggest predictor of output quality. A precise intent, with constraints, audience, format, and success criteria, gives the engine everything it needs to produce something useful on the first pass.',
      'This is where most people underinvest. The time spent defining intent is never wasted. It’s the highest-leverage moment in the entire cycle.',
    ],
  },
  generate: {
    name: 'Generate', tag: 'Produce the first version',
    body: [
      'Generation is the stage most people associate with AI. The system takes the defined intent and produces something: a draft, a design, a dataset, a piece of code, an image.',
      'In an agentic workflow, generation isn’t just a single response. The agent may plan the work, select tools, execute across steps, and assemble a complete first version autonomously.',
      'The key shift: generation is not the end. The first output is raw material, not a finished product. The value comes from what happens next.',
    ],
  },
  review: {
    name: 'Review', tag: 'Evaluate against the original intent',
    body: [
      'Review is where human judgment re-enters the cycle. Does this output match the intent? Is it accurate? Does it serve the audience? These are questions only a human with domain knowledge can answer.',
      'The AI can assist by checking consistency, flagging issues, and comparing against criteria. But the final judgment call requires contextual understanding that comes from experience, not computation.',
      'Each review produces specific, actionable feedback that feeds directly into the next generation pass. The output improves through informed iteration.',
    ],
  },
  present: {
    name: 'Present', tag: 'Deliver and gather feedback',
    body: [
      'Presentation is the moment the work meets its audience: publishing a document, shipping software, presenting to stakeholders. The output leaves the cycle and enters the world.',
      'But presentation is not the end. It’s a feedback mechanism. The audience reaction, the real-world performance, the questions people ask all become input for the next cycle.',
      'This is what makes the engine recursive rather than linear. Every presentation generates new information that refines the next iteration.',
    ],
  },
}

const LEGEND = [
  { color: RED, label: 'Human · judgment and review' },
  { color: BLUE, label: 'Generation' },
  { color: GLACIER, label: 'Intent and feedback in' },
  { color: 'var(--silver)', label: 'Output types' },
]

/* dots of different sizes circling the cycle ring, clockwise, at different speeds */
const ORBITERS = [
  { r: 7, dur: 14, delay: -5, color: RED },
  { r: 5, dur: 9, delay: 0, color: BLUE },
  { r: 4, dur: 7.5, delay: -4, color: 'var(--silver)' },
  { r: 3, dur: 6, delay: -2, color: GLACIER },
  { r: 2.5, dur: 5, delay: -1, color: BLUE },
]
const FLIGHT_EVERY_MS = 420

const TAG = { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em' }

export default function CreativeEngine({ phase, slide }) {
  const { openModal } = useApp()
  const open = (id) => () => openModal(CONTENT[id])

  /* arrows between the center and the outputs: a new one on a random spoke, in a random direction */
  const [flights, setFlights] = useState([])
  const nextId = useRef(0)
  const outputsShown = phase >= 1
  useEffect(() => {
    if (!outputsShown) { setFlights([]); return }
    const spawn = () => setFlights(f => [...f.slice(-14), {
      id: nextId.current++,
      spoke: Math.floor(Math.random() * OUTPUTS.length),
      out: Math.random() < 0.5,
      dur: 1.5 + Math.random() * 1.2,
    }])
    const timer = setInterval(spawn, FLIGHT_EVERY_MS)
    return () => clearInterval(timer)
  }, [outputsShown])
  const land = (id) => setFlights(f => f.filter(x => x.id !== id))

  return (
    <Slide slide={slide} title={<>The <em>creative</em> engine</>}>
      <div style={{ width: '100%', height: '100%', display: 'flex', gap: 24, alignItems: 'stretch', justifyContent: 'center' }}>
        <svg viewBox="-75 -8 830 612" style={{ height: '100%', maxHeight: '62vh', width: 'auto', maxWidth: '100%', overflow: 'visible' }}>
          {/* outer ring + ticks */}
          <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="var(--line)" strokeWidth="1" />
          {Array.from({ length: 36 }).map((_, i) => {
            const [x1, y1] = polar(OUTER_R, i * 10), [x2, y2] = polar(OUTER_R - (i % 3 === 0 ? 9 : 5), i * 10)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line)" strokeWidth="1" />
          })}

          {/* inner cycle ring, with arrowheads showing direction */}
          <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke="var(--silver)" strokeWidth="1.2" strokeDasharray="3 5" />
          {[-45, 45, 135, 225].map(a => {
            const [x, y] = polar(INNER_R, a)
            return <path key={a} d="M -6 -5 L 5 0 L -6 5 Z" fill="var(--silver)" transform={`translate(${x} ${y}) rotate(${a + 90})`} />
          })}

          {/* dots running around the cycle */}
          {ORBITERS.map((o, i) => (
            <g key={i} className="orbit" style={{ transformOrigin: `${CX}px ${CY}px`, animationDuration: `${o.dur}s`, animationDelay: `${o.delay}s` }}>
              <circle cx={CX} cy={CY - INNER_R} r={o.r} fill={o.color} />
            </g>
          ))}

          {/* connectors core to cycle */}
          {STAGES.map((s) => {
            const [x, y] = polar(INNER_R, s.angle)
            return <line key={s.id} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--silver)" strokeWidth="1" strokeDasharray="1 5" />
          })}

          {/* outputs (phase >= 1) */}
          <g style={fade(phase >= 1)}>
            {OUTPUTS.map(({ label, icon }, i) => {
              const a = (i * 360) / OUTPUTS.length - 90
              const [x, y] = polar(OUTER_R, a)
              const [lx, ly] = polar(OUTER_R + BADGE_R + 12, a)
              const anchor = lx < CX - 14 ? 'end' : lx > CX + 14 ? 'start' : 'middle'
              return (
                <g key={label}>
                  <line x1={CX} y1={CY} x2={x} y2={y} stroke="var(--line)" strokeWidth="1" strokeDasharray="1 6" />
                  <circle cx={x} cy={y} r={BADGE_R} fill="var(--bg)" stroke="var(--silver)" strokeWidth="1.5" />
                  <path d={icon} transform={`translate(${x} ${y}) scale(1.15)`} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" style={{ ...TAG, fontSize: 23, letterSpacing: 0 }} fill="var(--ink)">{label}</text>
                </g>
              )
            })}
          </g>

          {/* arrows in flight along the output spokes */}
          {flights.map(f => {
            const a = (f.spoke * 360) / OUTPUTS.length - 90
            const color = f.out ? BLUE : GLACIER
            return (
              <g key={f.id} transform={`rotate(${a} ${CX} ${CY})`}>
                <g className={f.out ? 'flight out' : 'flight in'} style={{ animationDuration: `${f.dur}s` }} onAnimationEnd={() => land(f.id)}>
                  <line x1={CX - 14} y1={CY} x2={CX + 2} y2={CY} stroke={color} strokeWidth="2" transform={f.out ? undefined : `rotate(180 ${CX} ${CY})`} />
                  <path d={`M ${CX + 1} ${CY - 5} L ${CX + 11} ${CY} L ${CX + 1} ${CY + 5} Z`} fill={color} transform={f.out ? undefined : `rotate(180 ${CX} ${CY})`} />
                </g>
              </g>
            )
          })}

          {/* cycle stations */}
          {STAGES.map((s, i) => {
            const [x, y] = polar(INNER_R, s.angle)
            return (
              <g key={s.id} className="node" onClick={open(s.id)} style={fade(true, 0.1 * i)}>
                <circle className="marker" cx={x} cy={y} r="45" fill="var(--raised)" stroke={s.color} strokeWidth="2" />
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="21" fill="var(--ink)">{s.label}</text>
              </g>
            )
          })}

          {/* human core */}
          <g className="node" onClick={open('human')}>
            <circle className="marker" cx={CX} cy={CY} r="42" fill={RED} stroke={RED} strokeWidth="2" />
            <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle" style={{ ...TAG, fontSize: 17 }} fill="#fff">HUMAN</text>
          </g>
        </svg>

        <aside style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 210 }}>
          <div className="kicker">Legend</div>
          {LEGEND.map(r => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-soft)' }}>
              <span style={{ width: 16, height: 6, background: r.color, flexShrink: 0 }} /> {r.label}
            </div>
          ))}
          <div className="small" style={{ marginTop: 4 }}>Click any station.</div>
          <p className="small" style={{ marginTop: 10, maxWidth: 240, color: 'var(--ink)', ...fade(phase >= 2, 0.2) }}>Judgment at the center. Outputs radiate, feedback returns.</p>
        </aside>
      </div>
    </Slide>
  )
}
