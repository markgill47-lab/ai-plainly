import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

const ITEMS = [
  { n: '01', name: 'Vehicle diagnostics and performance', tg: 'A car that knows its own OBD data and explains the check engine light in plain English.' },
  { n: '02', name: 'Adaptive navigation', tg: 'Reroutes around what you need, not just around traffic.' },
  { n: '03', name: 'Road games', tg: 'Keeps score, knows the rules. A referee for the back seat.' },
]

export default function OnboardLLM({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>What an onboard LLM <em>could do</em></>}>
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div className="cols-3">
          {ITEMS.map((it, i) => (
            <div key={it.n} className="card" style={reveal(phase >= i, 0.05)}>
              <div className="glyph">{it.n}</div>
              <div className="nm">{it.name}</div>
              <div className="tg">{it.tg}</div>
            </div>
          ))}
        </div>
        <p className="lead" style={reveal(phase >= 2, 0.3)}>The assistant is moving from the phone into the things we already own.</p>
      </div>
    </Slide>
  )
}
