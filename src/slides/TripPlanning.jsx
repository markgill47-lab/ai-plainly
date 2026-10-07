import Slide from '../components/Slide.jsx'
import Photo from '../components/Photo.jsx'
import RouteMap from '../components/RouteMap.jsx'
import { reveal } from './shared.js'

export default function TripPlanning({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Trip planning and <em>the car manual</em></>}>
      <div style={{ width: '100%', maxWidth: 1140, height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gridTemplateRows: '1fr auto', gap: '14px 32px', alignItems: 'stretch' }}>
        <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', ...reveal(true) }}>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center' }}>
            <RouteMap duration={14} play={phase >= 0} style={{ width: 'auto', maxWidth: '100%' }} />
          </div>
          <p className="small" style={{ marginTop: 6 }}>St. Cloud to Lucedale, Mississippi. Trip, rental car, hotels, and a forecast for where we would be, when.</p>
        </div>
        <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...reveal(true, 0.15) }}>
          <Photo file="dashboard.jpg" label="The dashboard" ratio="345 / 210" style={{ background: '#f4f4f4', borderTop: '4px solid var(--silver)' }} />
          <p className="small" style={{ marginTop: 6 }}>Half an hour failing to find the cruise control. Gemini read the manual.</p>
          <p className="small" style={{ marginTop: 2, fontSize: 12 }}>Illustration: <a href="https://owners.hyundaiusa.com/content/dam/hyundai/us/myhyundai/manuals/glovebox-manual/2024/sonata/24%20Sonata%20OM.pdf" target="_blank" rel="noreferrer">Hyundai Sonata Owner’s Manual</a>, Center Console Overview, p. 2-6. © Hyundai Motor America.</p>
        </div>
        <div className="panel" style={{ gridColumn: '1 / -1', padding: '14px 24px', ...reveal(phase >= 1) }}>
          <div className="kicker blue" style={{ marginBottom: 4 }}>Said on the road</div>
          <p className="lead">“Find a McDonald’s not far off our path and add it to the route.”</p>
        </div>
      </div>
    </Slide>
  )
}
