import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

export default function WhatAIAdds({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>What AI <em>adds</em></>}>
      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div className="cols">
          <div className="panel" style={reveal(phase >= 0)}>
            <div className="kicker blue">One</div>
            <div className="h2">Adaptive information</div>
            <p style={{ marginTop: 10, color: 'var(--ink-soft)' }}>The manual, the route, the weather. Delivered at the moment and in the form you need.</p>
          </div>
          <div className="panel" style={reveal(phase >= 1)}>
            <div className="kicker blue">Two</div>
            <div className="h2">Complex, long-duration tasks</div>
            <p style={{ marginTop: 10, color: 'var(--ink-soft)' }}>The genealogy search and the trip plan. Work that spans hours and many steps and comes back finished.</p>
          </div>
        </div>
        <p className="landing-line" style={{ margin: '0 auto', ...reveal(phase >= 2) }}>
          I did not know how to do any of that. <em>It did not matter.</em>
        </p>
      </div>
    </Slide>
  )
}
