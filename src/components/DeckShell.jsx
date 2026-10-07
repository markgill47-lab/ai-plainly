import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Controls from './Controls.jsx'
import SlideNav from './SlideNav.jsx'
import Modal from './Modal.jsx'
import SlideMenu from './SlideMenu.jsx'
import NotesDrawer from './NotesDrawer.jsx'

const SWIPE_THRESHOLD = 55

export default function DeckShell() {
  const { position, next, prev, activeModal, closeModal, menuOpen, setMenuOpen, toggleMenu, toggleTheme, notesOpen, toggleNotes, setNotesOpen } = useApp()
  const Current = position.current?.Component
  const touch = useRef({ x: 0, y: 0 })

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return
      if (e.key === 'Escape') {
        if (activeModal) { closeModal(); return }
        if (menuOpen) { setMenuOpen(false); return }
        if (notesOpen) { setNotesOpen(false); return }
        return
      }
      if (activeModal) return // let the modal own the keyboard while open
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': e.preventDefault(); next(); break
        case 'ArrowLeft': case 'PageUp': prev(); break
        case 'm': case 'M': toggleMenu(); break
        case 't': case 'T': toggleTheme(); break
        case 'n': case 'N': toggleNotes(); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeModal, menuOpen, notesOpen, next, prev, closeModal, setMenuOpen, setNotesOpen, toggleMenu, toggleTheme, toggleNotes])

  /* swipe (mobile); taps remain clicks */
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    if (activeModal || menuOpen) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dx < 0 ? next() : prev()
    }
  }

  return (
    <>
      <div className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Controls />
        {Current && <Current key={position.current.id} phase={position.phase} slide={position.current} />}
        <SlideNav />
      </div>
      {notesOpen && <NotesDrawer />}
      {activeModal && <Modal />}
      {menuOpen && <SlideMenu />}
    </>
  )
}
