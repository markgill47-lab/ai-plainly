import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

const POINTS = [
  { head: 'Protect your information.',
    body: 'You already have employees who use AI on company data. If they find it helpful, it’s probably something you should provide them.' },
  { head: 'Wide-scale adoption does not yet pay off.',
    body: 'Be judicious about how you try to apply it.' },
  { head: 'Pick one problem, one task, one skill you lack.',
    body: 'See if an AI can help. Then pick another. Then another.' },
  { head: 'Treat it like a new employee.',
    body: 'It will take time for you to get to know each other.' },
]

export default function MeansForBusiness({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>What does this mean for <em>business?</em></>}>
      <div className="cols" style={{ maxWidth: 1140, gap: 18 }}>
        {POINTS.map((p, i) => (
          <div key={i} className="panel gray" style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '20px 24px', ...reveal(phase >= i) }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1, color: 'var(--red)', width: 30, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.1vw, 28px)', lineHeight: 1.2 }}>{p.head}</p>
              <p className="lead" style={{ marginTop: 6, fontSize: 'clamp(15px, 1.35vw, 18px)' }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}
