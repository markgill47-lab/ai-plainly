import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { MAIN_SLIDES, RESERVE_SLIDES, slideById } from '../slides/registry.js'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const THEME_KEY = 'chamber-theme'
const NOTES_KEY = 'chamber-notes'

function initialTheme() {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  }
  return 'light' // white is the projector-friendly default
}

function initialFromHash() {
  if (typeof location === 'undefined') return { list: 'main', index: 0 }
  const id = location.hash.replace(/^#\/?/, '')
  const found = slideById(id)
  if (found) return { list: found.list, index: found.index }
  return { list: 'main', index: 0 }
}

export function AppProvider({ children }) {
  const start = initialFromHash()
  const [theme, setTheme] = useState(initialTheme)
  const [notesOpen, setNotesOpen] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem(NOTES_KEY) === 'on'
  )
  const [list, setList] = useState(start.list) // 'main' | 'reserve'
  const [index, setIndex] = useState(start.index)
  const [phase, setPhase] = useState(0)
  const [activeModal, setActiveModal] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const slides = list === 'main' ? MAIN_SLIDES : RESERVE_SLIDES
  const current = slides[index]
  const phases = current?.phases ?? 1

  /* ---- theme + notes ---- */
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem(THEME_KEY, theme) } catch {}
  }, [theme])
  const toggleTheme = useCallback(() => setTheme(t => (t === 'dark' ? 'light' : 'dark')), [])
  const toggleNotes = useCallback(() => setNotesOpen(n => {
    const next = !n
    try { localStorage.setItem(NOTES_KEY, next ? 'on' : 'off') } catch {}
    return next
  }), [])

  /* ---- deck navigation: advance phases within a slide, then move slides ---- */
  const next = useCallback(() => {
    if (phase < phases - 1) { setPhase(phase + 1); return }
    if (index < slides.length - 1) { setIndex(index + 1); setPhase(0) }
  }, [phase, phases, index, slides.length])

  const prev = useCallback(() => {
    if (phase > 0) { setPhase(phase - 1); return }
    if (index > 0) {
      const prevSlide = slides[index - 1]
      setIndex(index - 1)
      setPhase((prevSlide?.phases ?? 1) - 1)
    }
  }, [phase, index, slides])

  const jumpTo = useCallback((targetList, targetIndex) => {
    setList(targetList)
    setIndex(targetIndex)
    setPhase(0)
    setMenuOpen(false)
    setActiveModal(null)
  }, [])

  /* ---- modal ---- */
  const openModal = useCallback((content) => setActiveModal(content), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  const toggleMenu = useCallback(() => setMenuOpen(m => !m), [])

  /* ---- hash sync (shareable deep links, no history spam) ---- */
  useEffect(() => {
    if (current) {
      const target = `#/${current.id}`
      if (location.hash !== target) history.replaceState(null, '', target)
    }
  }, [current])

  useEffect(() => {
    const onHash = () => {
      const id = location.hash.replace(/^#\/?/, '')
      const found = slideById(id)
      if (found && !(found.list === list && found.index === index)) {
        setList(found.list); setIndex(found.index); setPhase(0)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [list, index])

  const atStart = index === 0 && phase === 0
  const atEnd = index === slides.length - 1 && phase === phases - 1

  const value = useMemo(() => ({
    theme, toggleTheme, notesOpen, toggleNotes, setNotesOpen,
    activeModal, openModal, closeModal,
    menuOpen, toggleMenu, setMenuOpen,
    next, prev, jumpTo,
    position: { list, index, phase, phases, current, total: slides.length, atStart, atEnd },
    registry: { main: MAIN_SLIDES, reserve: RESERVE_SLIDES },
  }), [theme, toggleTheme, notesOpen, toggleNotes, activeModal, openModal, closeModal,
       menuOpen, toggleMenu, next, prev, jumpTo, list, index, phase, phases, current, slides.length, atStart, atEnd])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
