import { useApp } from '../context/AppContext.jsx'

export default function Controls() {
  const { theme, toggleTheme, notesOpen, toggleNotes, toggleMenu } = useApp()
  return (
    <div className="controls">
      <button className="pill" onClick={toggleMenu} title="Slide index (M)">Index</button>
      <button
        className={`pill${notesOpen ? ' on' : ''}`}
        onClick={toggleNotes}
        title="Speaker notes and sources (N)"
      >
        <span className="dot" /> Notes
      </button>
      <button className="pill" onClick={toggleTheme} title="Light / dark (T)">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}
