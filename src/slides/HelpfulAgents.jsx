import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

const AGENTS = ['Meta Muse', 'OpenAI Dots', 'Instinct']

/* Three reveals, one per phase after the opening frame. */
const BEATS = [
  { kicker: 'One hour in', tone: 'blue', quote: true,
    text: <>Within an hour of installation, Muse had <b>cancelled all of my unwanted or forgotten subscriptions.</b> Even a refund on one.</> },
  { kicker: 'Amazon pushes back', tone: 'red',
    text: <>Amazon <b>blocked Muse from its store twelve days after launch</b>, saying it shops without identifying itself. Analysts point to the ads: an agent doesn’t look at them, and they bring Amazon about $76 billion a year.</> },
  { kicker: 'Others make room', tone: 'gray',
    text: <>Shopify <b>opened its full catalog and checkout</b> to Muse. Walmart signed on as a shopping partner, and both back a new standard for how agents sign in to a business.</> },
]

export default function HelpfulAgents({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Helpful <em>agents</em></>}>
      <div style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p className="lead" style={{ fontSize: 'clamp(19px, 1.9vw, 25px)', maxWidth: '52ch' }}>
            The newest agents do the <strong>long-running and scheduled tasks</strong> that normal people need doing.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            {AGENTS.map(a => <span key={a} className="chip">{a}</span>)}
            <span className="chip gray">More are coming</span>
          </div>
        </div>
        <div className="cols-3">
          {BEATS.map((b, i) => (
            <div key={b.kicker} className={`panel${b.tone === 'blue' ? '' : ` ${b.tone}`}`} style={reveal(phase >= i + 1)}>
              <div className={`kicker${b.tone === 'gray' ? '' : ` ${b.tone}`}`}>{b.kicker}</div>
              <p style={{ fontSize: 'clamp(16px, 1.45vw, 19px)', lineHeight: 1.5, color: 'var(--ink-soft)' }}>
                {b.quote ? <>“{b.text}”</> : b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}
