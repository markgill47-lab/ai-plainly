import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'
import Qr from '../components/Qr.jsx'

const LINES = [
  'It added more to my week than any technology in thirty years, and I was the novice.',
  'Decide when the time is right for you, then try a few until you find one that gets you.',
  'Data centers are how the internet works. Do them right. The city is doing that.',
]

export default function ThreeLines({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Three lines to <em>take home</em></>} beams="small">
      <div className="with-qr">
      <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {LINES.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 22, alignItems: 'flex-start', borderTop: '1px solid var(--line)', paddingTop: 16, ...reveal(phase >= i) }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1, color: 'var(--red)', width: 48, flexShrink: 0 }}>{i + 1}</div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.25 }}>{l}</p>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginTop: 10, ...reveal(phase >= 2, 0.4) }}>
          <span className="chip">Open to Chamber members</span>
          <span className="lead" style={{ fontSize: 17 }}>NextEd Lab is open to anyone who wants to see the engine run. <a href="mailto:mcgill@stcloudstate.edu">mcgill@stcloudstate.edu</a></span>
        </div>
      </div>
      <Qr size={170} caption="This deck" />
      </div>
    </Slide>
  )
}
