import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

/*
  Data centers condensed, slide 1 of 2: the facts. Folds "Data center is not AI"
  and "Both sides exaggerate" (both now in the reserve) into one slide.
*/
const SRC = 'https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context'

export default function DataCentersInProportion({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Data centers, <em>in proportion</em></>}>
      <div style={{ width: '100%', maxWidth: 1140, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="cols">
          <div className="panel gray" style={reveal(true)}>
            <div className="kicker">A data center is not AI</div>
            <div className="stat" style={{ fontSize: 'clamp(48px, 6vw, 84px)' }}>85 <span style={{ color: 'var(--ink-muted)', fontWeight: 300 }}>to</span> 95<em>%</em></div>
            <p className="lead" style={{ marginTop: 10 }}>of data center load today is the <strong>ordinary internet</strong>: banking, travel, payroll, every SaaS tool in this room.</p>
          </div>
          <div className="panel" style={reveal(phase >= 1)}>
            <div className="kicker blue">Both sides exaggerate · water per query</div>
            <ul>
              <li><b>0.1 mL</b> is what Altman’s almond comparison implies</li>
              <li><b>519 mL</b> is the viral number, since revised toward about <b>15 mL</b></li>
              <li>Measured: a <b>75x spread</b> depending on the model</li>
              <li><b>Location and cooling design</b> are the levers</li>
            </ul>
          </div>
        </div>
        <div className="cols" style={{ gap: 14, ...reveal(phase >= 2) }}>
          <div className="panel gray" style={{ padding: '14px 18px' }}>
            <div className="kicker">Global share small</div>
            <p className="small">About 1.5 percent of global electricity in 2024. Roughly a tenth of demand growth to 2030.</p>
          </div>
          <div className="panel red" style={{ padding: '14px 18px' }}>
            <div className="kicker red">Local impact real</div>
            <p className="small">One AI data center can draw as much as an aluminum smelter, and they concentrate geographically.</p>
          </div>
        </div>
        <div className="source-row" style={reveal(true, 0.3)}>
          <span className="k">Source</span>
          <a href={SRC} target="_blank" rel="noreferrer">Carbon Brief, “AI: five charts that put data centre energy use and emissions into context”</a>
        </div>
      </div>
    </Slide>
  )
}
