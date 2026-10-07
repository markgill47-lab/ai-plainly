import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

export default function LimitMoves({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>The limit <em>moves</em></>} beams="small">
      <div style={{ width: '100%', maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 34, alignItems: 'center' }}>
        <p className="landing-line" style={reveal(phase >= 0)}>
          Knowledge and skill were the barriers. <em>Now the barrier is how well you can say what you mean.</em>
        </p>
        <div className="panel" style={{ maxWidth: 720, ...reveal(phase >= 1) }}>
          <div className="kicker blue">Landing line</div>
          <p className="lead">Anything you can form clearly in your mind, you can now make real. The only skill left is communicating the idea.</p>
        </div>
      </div>
    </Slide>
  )
}
