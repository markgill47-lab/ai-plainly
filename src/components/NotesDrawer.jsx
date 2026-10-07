import { useApp } from '../context/AppContext.jsx'

const host = (url) => { try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url } }

export default function NotesDrawer() {
  const { position, setNotesOpen } = useApp()
  const s = position.current
  const notes = s?.notes ?? {}
  return (
    <aside className="notes" aria-label="Speaker notes">
      <div className="notes-head">
        <div className="kicker">Speaker notes · {s.code}</div>
        <button className="iconbtn" onClick={() => setNotesOpen(false)} title="Close (N or Esc)">✕</button>
      </div>
      <div className="notes-body">
        <h3>{s.title}</h3>
        {notes.frame && <p className="frame">{notes.frame}</p>}
        {(notes.say ?? []).map((p, i) => <p key={i}>{p}</p>)}
        {notes.sources?.length > 0 && (
          <>
            <div className="kicker">Sources</div>
            <ol>
              {notes.sources.map((src, i) => {
                const url = typeof src === 'string' ? src : src.url
                const note = typeof src === 'string' ? null : src.note
                return (
                  <li key={i}>
                    <span className="host">{host(url)}</span>
                    <a href={url} target="_blank" rel="noreferrer">{url}</a>
                    {note && <span className="note"> ({note})</span>}
                  </li>
                )
              })}
            </ol>
          </>
        )}
      </div>
    </aside>
  )
}
