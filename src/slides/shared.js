/* Reveal helper shared by slides: fade + small rise, staggered by delay. */
export const reveal = (show, d = 0) => ({
  opacity: show ? 1 : 0,
  transform: show ? 'translateY(0)' : 'translateY(10px)',
  transition: `opacity 0.5s ease ${d}s, transform 0.5s ease ${d}s`,
})

export const fade = (show, d = 0) => ({ opacity: show ? 1 : 0, transition: `opacity 0.5s ease ${d}s` })
