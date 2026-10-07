import Slide from '../components/Slide.jsx'
import Photo from '../components/Photo.jsx'
import { reveal } from './shared.js'

/* Both photographs are portrait, so they are sized by height, not width. */
const H = 'min(52vh, 520px)'

export default function Genealogy({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Genealogy and <em>the photograph</em></>}>
      <div style={{ width: '100%', maxWidth: 1100, height: '100%', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ ...reveal(true), width: 'fit-content' }}>
            <Photo file="photo-original.png" label="Original" ratio="581 / 744" style={{ width: 'auto', height: H }} />
            <p className="small" style={{ marginTop: 8 }}>Pixelated. Crushed by compression.</p>
          </div>
          <div style={{ ...reveal(true, 0.15), width: 'fit-content' }}>
            <Photo file="photo-restored.png" label="Restored, print ready" ratio="1108 / 1420" style={{ width: 'auto', height: H }} />
            <p className="small" style={{ marginTop: 8 }}>Cleaned, colorized, reflection removed. Shown with permission.</p>
          </div>
        </div>
        <div className="panel red" style={{ padding: '16px 24px', ...reveal(phase >= 1) }}>
          <div className="kicker red" style={{ marginBottom: 6 }}>Then the research</div>
          <p className="lead">Grandparents and great-grandparents by name. A grandmother’s maiden name, found in Uncle Pete’s obituary.</p>
        </div>
      </div>
    </Slide>
  )
}
