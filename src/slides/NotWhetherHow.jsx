import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

/*
  Data centers condensed, slide 2 of 2: the decision. Folds "The local decision",
  "The ledger" and "The turn" (all now in the reserve) into one slide.
*/
export default function NotWhetherHow({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Not whether. <em>How.</em></>}>
      <div style={{ width: '100%', maxWidth: 1180, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="cols-3">
          <div className="panel red" style={reveal(true)}>
            <div className="kicker red">The state gives</div>
            <ul>
              <li><b>35-year sales tax exemption</b> on IT equipment and software</li>
              <li>Net fiscal impact <b>negative every year since 2012</b></li>
            </ul>
          </div>
          <div className="panel" style={reveal(true, 0.15)}>
            <div className="kicker blue">The state requires</div>
            <ul>
              <li>Their <b>own rate class</b>, paying their own infrastructure costs</li>
              <li><b>Water reporting</b> to the DNR</li>
              <li>The <b>2040 carbon-free standard</b> applies</li>
            </ul>
          </div>
          <div className="panel gray" style={reveal(phase >= 1)}>
            <div className="kicker">The city decides</div>
            <ul>
              <li><b>Setbacks, height, noise</b>, neighbor protections</li>
              <li>Draft: hyper-scale in <b>I3 only</b>, by permit, a <b>quarter mile</b> from homes</li>
              <li>Back at the Planning Commission <b>in October</b></li>
            </ul>
          </div>
        </div>
        <p className="landing-line" style={{ alignSelf: 'center', maxWidth: '34ch', fontSize: 'clamp(22px, 2.8vw, 38px)', ...reveal(phase >= 2) }}>
          The question isn’t whether to have data centers. <em>It’s how to do them right.</em>
        </p>
      </div>
    </Slide>
  )
}
