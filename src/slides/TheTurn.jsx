import { useState } from 'react'
import { reveal } from './shared.js'

/* The restored photograph, as large as the slide allows, with one line beside it. */
export default function TheTurn({ phase, slide }) {
  const [missing, setMissing] = useState(false)
  return (
    <section className="slide" style={{ borderTop: 'none', padding: 0 }}>
      <div className="stage" style={{ padding: 0, gap: 40, alignItems: 'stretch' }}>
        <div className={missing ? 'dots' : ''} style={{ flex: '0 1 auto', height: '100%', minWidth: missing ? 360 : 0, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!missing
            ? <img src="photos/photo-restored.png" alt="The restored photograph" onError={() => setMissing(true)} style={{ height: '100%', width: 'auto', maxWidth: '100%', display: 'block' }} />
            : <div className="kicker"><span style={{ color: 'var(--red)' }}>Photo</span> · restored photograph</div>}
        </div>
        <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 24, ...reveal(phase >= 1) }}>
          <div className="kicker red" style={{ marginBottom: 12 }}>{slide.code} · The turn</div>
          <p className="landing-line" style={{ textAlign: 'left', maxWidth: '18ch', fontSize: 'clamp(26px, 3.6vw, 52px)' }}>
            The question isn’t whether to have data centers. <em>It’s how to do them right.</em>
          </p>
        </div>
      </div>
    </section>
  )
}
