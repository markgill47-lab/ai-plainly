import { VIEW, STATES, STOPS, ROUTE } from '../data/routeMap.js'

/*
  RouteMap: St. Cloud to Lucedale over vector state outlines.
  The route draws on slowly (stroke-dashoffset), a marker rides the head
  of the line, and each major stop lights up as the line reaches it.
  `duration` in seconds. `play` restarts the animation when it flips true.
*/
export default function RouteMap({ duration = 14, play = true, style }) {
  const { w, h } = VIEW
  const majors = STOPS.filter(s => s.major)
  const n = majors.length - 1
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '100%', display: 'block', ...style }} aria-label="Route from St. Cloud, Minnesota to Lucedale, Mississippi">
      <style>{`
        .rm-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .rm-play .rm-line { animation: rm-draw ${duration}s linear forwards; }
        .rm-play .rm-head { animation: rm-head ${duration}s linear forwards; }
        .rm-stop { opacity: 0; }
        .rm-play .rm-stop { animation: rm-pop 0.5s ease forwards; }
        @keyframes rm-draw { to { stroke-dashoffset: 0; } }
        @keyframes rm-pop { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
        @keyframes rm-head { 0% { opacity: 1; } 99% { opacity: 1; } 100% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .rm-line { stroke-dashoffset: 0 !important; animation: none !important; }
          .rm-stop { opacity: 1 !important; animation: none !important; }
          .rm-head { display: none; }
        }
      `}</style>
      <g className={play ? 'rm-play' : ''} key={play ? 'on' : 'off'}>
        {/* context states, faded */}
        {STATES.filter(s => !s.corridor).map(s => (
          <path key={s.id} d={s.d} fill="var(--surface)" stroke="var(--line)" strokeWidth="0.8" />
        ))}
        {/* corridor states */}
        {STATES.filter(s => s.corridor).map(s => (
          <path key={s.id} d={s.d} fill="var(--bg)" stroke="var(--ink-muted)" strokeWidth="1" strokeLinejoin="round" />
        ))}
        {/* the route: a wide light casing plus the animated red line */}
        <path d={ROUTE} fill="none" stroke="var(--spirit-red)" strokeWidth="7" strokeOpacity="0.12" strokeLinecap="round" strokeLinejoin="round" />
        <path className="rm-line" d={ROUTE} pathLength="1" fill="none" stroke="var(--spirit-red)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* head marker */}
        <g className="rm-head" style={{ opacity: 0 }}>
          <circle r="7" fill="var(--gateway)" stroke="var(--bg)" strokeWidth="2.5">
            <animateMotion dur={`${duration}s`} fill="freeze" path={ROUTE} begin="0s" />
          </circle>
        </g>
        {/* stops */}
        {majors.map((s, i) => {
          const delay = (i / n) * duration * 0.985
          const right = s.name.startsWith('St. Cloud') || s.name.startsWith('Des Moines') || s.name.startsWith('Lucedale')
          return (
            <g key={s.name} className="rm-stop" style={{ animationDelay: `${delay}s`, transformOrigin: `${s.x}px ${s.y}px`, transformBox: 'view-box' }}>
              <circle cx={s.x} cy={s.y} r="5" fill="var(--bg)" stroke="var(--spirit-red)" strokeWidth="2.5" />
              <text x={s.x + (right ? 11 : -11)} y={s.y + 4} textAnchor={right ? 'start' : 'end'} fontFamily="var(--font-display)" fontWeight="700" fontSize="14" fill="var(--ink)" stroke="var(--bg)" strokeWidth="4" paintOrder="stroke">{s.name}</text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
