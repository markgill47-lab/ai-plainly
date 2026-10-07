import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

export default function Ledger({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>The <em>ledger</em></>}>
      <div style={{ width: '100%', maxWidth: 1140, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="cols">
          <div className="panel red" style={reveal(phase >= 0)}>
            <div className="kicker red">What the state gives</div>
            <ul>
              <li><b>35-year sales tax exemption</b> on IT equipment and software</li>
              <li><b>$133M</b> in FY2027, rising to <b>$219M</b> in FY2029</li>
              <li>Net fiscal impact <b>negative every year since 2012</b></li>
            </ul>
          </div>
          <div className="panel" style={reveal(phase >= 1)}>
            <div className="kicker blue">What the state requires</div>
            <ul>
              <li>Data centers pay <b>incremental infrastructure costs</b></li>
              <li>Their <b>own rate class</b></li>
              <li><b>Water reporting</b> to the DNR above 100M gallons per year</li>
              <li><b>$2M to $5M per year</b> to low-income energy programs</li>
              <li>The <b>2040 carbon-free standard</b> applies</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '2px solid var(--line-strong)', paddingTop: 14, ...reveal(phase >= 2) }}>
          <p className="lead"><strong>Not in state law:</strong> setbacks, height, noise, neighbor protections. That is the city’s job.</p>
        </div>
      </div>
    </Slide>
  )
}
