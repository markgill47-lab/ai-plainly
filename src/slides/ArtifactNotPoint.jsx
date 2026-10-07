import Slide from '../components/Slide.jsx'
import { fade, reveal } from './shared.js'

export default function ArtifactNotPoint({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>The artifact is <em>not the point</em></>}>
      <div style={{ width: '100%', maxWidth: 1040, display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', alignItems: 'center', gap: 16 }}>
          <div className="panel" style={{ minHeight: 190, ...reveal(phase >= 0) }}>
            <div className="kicker blue">Intent</div>
            <p className="lead">“This is the picture we want. Make it printable.”</p>
          </div>
          <svg viewBox="0 0 120 120" style={{ width: '100%', overflow: 'visible' }}>
            <g style={fade(phase >= 1)}>
              <line x1="4" y1="44" x2="100" y2="44" stroke="var(--gateway)" strokeWidth="3" />
              <polygon points="98,34 116,44 98,54" fill="var(--gateway)" />
              <text x="60" y="30" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="11" letterSpacing="0.14em" fill="var(--blue)">RENDER</text>
            </g>
            <g style={fade(phase >= 2)}>
              <line x1="116" y1="76" x2="20" y2="76" stroke="var(--spirit-red)" strokeWidth="3" strokeDasharray="6 5" />
              <polygon points="22,66 4,76 22,86" fill="var(--spirit-red)" />
              <text x="60" y="100" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="11" letterSpacing="0.14em" fill="var(--red)">RE-RENDER</text>
            </g>
          </svg>
          <div className="panel gray" style={{ minHeight: 190, ...reveal(phase >= 1) }}>
            <div className="kicker">Artifact</div>
            <p className="lead">One rendering of that intent.</p>
          </div>
        </div>
        <div style={reveal(phase >= 2, 0.2)}>
          <div className="kicker red" style={{ marginBottom: 6 }}>Metamedia</div>
          <p className="lead">A medium that absorbs every other medium and stays fluid. Text becomes image becomes code becomes video, and back.</p>
        </div>
      </div>
    </Slide>
  )
}
