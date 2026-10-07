import { useApp } from '../context/AppContext.jsx'
import Qr from '../components/Qr.jsx'

export default function LandingSlide() {
  const { next } = useApp()
  return (
    <section className="slide" style={{ borderTop: 'none', padding: 0 }}>
      <div className="beams" aria-hidden="true">
        <i className="g1" /><i className="r1" /><i className="b1" /><i className="g2" /><i className="r2" /><i className="g3" />
      </div>
      <div className="stage" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <div style={{ maxWidth: 900, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div className="kicker">St. Cloud Chamber of Commerce · Speaker Series</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(52px, 8vw, 116px)', lineHeight: 0.92, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            AI, plainly
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(22px, 2.8vw, 36px)', lineHeight: 1.2, maxWidth: '24ch' }}>
            What it adds. What it costs. <span style={{ color: 'var(--blue)', fontWeight: 700 }}>What it changes.</span>
          </p>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', borderTop: '1px solid var(--line)', paddingTop: 22 }}>
            <div>
              <div className="h3">Mark Gill</div>
              <div className="small">Director, NextEd Lab, St. Cloud State University</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={next}>Begin <span className="a">→</span></button>
            <span className="small">← / → to navigate · N speaker notes · M index · T theme</span>
          </div>
        </div>
        <Qr className="corner" size={170} />
      </div>
    </section>
  )
}
