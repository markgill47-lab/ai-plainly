import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

const STEPS = [
  { head: 'Decide for yourself if the time is right.',
    body: 'Not everyone will adopt at the same time, and that’s fine.' },
  { head: 'Get in the pool.',
    body: 'You don’t learn to swim by reading a book. Practically every model has a way to try it for free.' },
  { head: <>Find one that <em style={{ fontStyle: 'normal', color: 'var(--blue)' }}>gets you.</em></>,
    body: 'I like Claude because it gets me. Your mileage may vary.' },
]

export default function PickingTheRightOne({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Picking the <em>right one</em></>} beams="small">
      <div style={{ width: '100%', maxWidth: 980, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 22, alignItems: 'flex-start', borderTop: '1px solid var(--line)', paddingTop: 16, ...reveal(phase >= i) }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1, color: 'var(--red)', width: 48, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 2.6vw, 34px)', lineHeight: 1.2 }}>{s.head}</p>
              <p className="lead" style={{ marginTop: 6 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}
