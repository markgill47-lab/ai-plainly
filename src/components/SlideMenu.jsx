import { useApp } from '../context/AppContext.jsx'

export default function SlideMenu() {
  const { registry, jumpTo, position, setMenuOpen } = useApp()

  const Item = ({ slide, list, index }) => {
    const isCurrent = position.list === list && position.index === index
    return (
      <button className={`item${isCurrent ? ' current' : ''}`} onClick={() => jumpTo(list, index)}>
        <span className="ix">{slide.code}</span>
        <span className="nm">{slide.title}</span>
      </button>
    )
  }

  // group main slides by part, preserving order
  const parts = []
  registry.main.forEach((s, i) => {
    let p = parts.find(x => x.name === s.part)
    if (!p) { p = { name: s.part, items: [] }; parts.push(p) }
    p.items.push({ s, i })
  })

  return (
    <div className="menu-overlay" onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false) }}>
      <div className="menu">
        <div className="menu-inner">
          <div className="menu-title">AI, Plainly</div>
          <div className="menu-sub">Slide index · Esc or M to close</div>
          {parts.map(p => (
            <div key={p.name}>
              <h3>{p.name}</h3>
              {p.items.map(({ s, i }) => <Item key={s.id} slide={s} list="main" index={i} />)}
            </div>
          ))}
          <h3>Reserve · Q&amp;A only</h3>
          {registry.reserve.map((s, i) => <Item key={s.id} slide={s} list="reserve" index={i} />)}
        </div>
      </div>
    </div>
  )
}
