import { useApp } from '../context/AppContext.jsx'

export default function SlideNav() {
  const { next, prev, position } = useApp()
  const { list, index, total, current } = position
  const label = list === 'reserve' ? 'Reserve' : 'Slide'

  const ticks = Array.from({ length: total }, (_, i) => (
    <i key={i} className={i < index ? 'on' : i === index ? 'cur' : ''} />
  ))

  return (
    <nav className="deck-nav">
      <div className="brand">
        <img src="nexted-logo.png" alt="" />
        <span>NextEd Lab · St. Cloud State University</span>
      </div>
      <div className="progress">
        <div className="lab"><b>{label} {current?.code ?? index + 1}</b> · {current?.title}</div>
        <div className="bar">{ticks}</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={prev} disabled={position.atStart}>
          <span className="a">←</span> Prev
        </button>
        <button className="btn primary" onClick={next} disabled={position.atEnd}>
          Next <span className="a">→</span>
        </button>
      </div>
    </nav>
  )
}
