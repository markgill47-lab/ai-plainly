import { useApp } from '../context/AppContext.jsx'

/* Detail modal for clickable markers. Content: { name, tag, body: [] } */
export default function Modal() {
  const { activeModal, closeModal } = useApp()
  if (!activeModal) return null
  const { name, tag, body = [] } = activeModal

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-tools">
          <button className="iconbtn" onClick={closeModal} title="Close (Esc)">✕</button>
        </div>
        <div className="modal-inner">
          <h2>{name}</h2>
          {tag && <div className="tag">{tag}</div>}
          {body.map((p, i) => (
            <p key={i} className={i === body.length - 1 ? 'last' : ''}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
