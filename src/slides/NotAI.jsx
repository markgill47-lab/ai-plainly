import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

const SRC = 'https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context'

export default function NotAI({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Data center <em>is not</em> AI</>}>
      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div className="stat" style={reveal(true)}>85 <span style={{ color: 'var(--ink-muted)', fontWeight: 300 }}>to</span> 95<em>%</em></div>
        <p className="lead" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', ...reveal(true, 0.15) }}>of data center load today is the <strong>ordinary internet.</strong></p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', ...reveal(phase >= 1) }}>
          {['Banking', 'Travel', 'Payroll', 'Every SaaS tool in this room'].map(t => <span key={t} className="chip gray">{t}</span>)}
        </div>
        <div className="source-row" style={reveal(true, 0.3)}>
          <span className="k">Source</span>
          <a href={SRC} target="_blank" rel="noreferrer">Carbon Brief, “AI: five charts that put data centre energy use and emissions into context”</a>
        </div>
      </div>
    </Slide>
  )
}
