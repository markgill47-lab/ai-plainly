import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

export default function LocalDecision({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>The <em>local</em> decision</>}>
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="chip">Draft ordinance</span>
          <span className="chip warn">Returns to the Planning Commission in October</span>
        </div>
        <div className="cols">
          <div className="panel gray" style={reveal(phase >= 0)}>
            <div className="kicker">Enterprise data center</div>
            <ul>
              <li>Under <b>10,000 sq ft</b></li>
              <li>Up to <b>2,000 servers</b></li>
              <li>Up to <b>50 MW</b></li>
              <li>Allowed <b>by right</b> in industrial and C3 / C5</li>
            </ul>
          </div>
          <div className="panel red" style={reveal(phase >= 0, 0.15)}>
            <div className="kicker red">Hyper-scale data center</div>
            <ul>
              <li><b>I3 only</b>, conditional use permit, own hearing</li>
              <li><b>Quarter-mile setback</b> from residential</li>
              <li>City <b>water and sewer</b></li>
              <li><b>Impact studies</b> required</li>
            </ul>
          </div>
        </div>
        <p className="lead" style={reveal(phase >= 1)}>“No data centers” is not on the table. The question the city is asking is the right one: <strong>how.</strong></p>
      </div>
    </Slide>
  )
}
