import Slide from '../components/Slide.jsx'
import { fade, reveal } from './shared.js'

/*
  Log-scale strip chart: milliliters of water per query, 0.1 to 1000.
  First pass. Marks reveal in phases so each claim can be told in order.
*/
const W = 1000, H = 260, PAD_L = 40, PAD_R = 40, BASE = 170
const MIN = 0.1, MAX = 1000
const x = (v) => PAD_L + ((Math.log10(v) - Math.log10(MIN)) / (Math.log10(MAX) - Math.log10(MIN))) * (W - PAD_L - PAD_R)

const MARKS = [
  { v: 0.11, label: 'Altman, implied', sub: '0.11 mL', side: 'up', ph: 1, color: 'var(--ink-muted)' },
  { v: 0.32, label: 'Altman, earlier', sub: '0.32 mL', side: 'down', ph: 1, color: 'var(--ink-muted)' },
  { v: 2, label: 'Jegham, efficient models', sub: 'under 2 mL', side: 'up', ph: 2, color: 'var(--gateway)' },
  { v: 150, label: 'Jegham, heavy reasoning', sub: 'over 150 mL', side: 'down', ph: 2, color: 'var(--gateway)' },
  { v: 519, label: 'The viral number', sub: '519 mL', side: 'up', ph: 3, color: 'var(--spirit-red)' },
]
const TICKS = [0.1, 1, 10, 100, 1000]

export default function BothSides({ phase, slide }) {
  return (
    <Slide slide={slide} title={<>Both sides <em>exaggerate</em></>}>
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="kicker">Milliliters of water per query · log scale</div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', overflow: 'visible', fontFamily: 'var(--font-display)' }}>
          {/* axis */}
          <line x1={PAD_L} y1={BASE} x2={W - PAD_R} y2={BASE} stroke="var(--line-strong)" strokeWidth="2" />
          {TICKS.map(t => (
            <g key={t}>
              <line x1={x(t)} y1={BASE - 6} x2={x(t)} y2={BASE + 6} stroke="var(--line-strong)" strokeWidth="2" />
              <text x={x(t)} y={BASE + 26} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink-muted)">{t} mL</text>
            </g>
          ))}
          {/* 75x spread band */}
          <g style={fade(phase >= 2, 0.2)}>
            <rect x={x(2)} y={BASE - 10} width={x(150) - x(2)} height={20} fill="var(--gateway)" opacity="0.14" />
            <text x={(x(2) + x(150)) / 2} y={BASE + 50} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--blue)" letterSpacing="0.14em">75X SPREAD BY MODEL</text>
          </g>
          {/* marks */}
          {MARKS.map((m) => {
            const cx = x(m.v)
            const up = m.side === 'up'
            const ly = up ? BASE - 70 : BASE + 78
            return (
              <g key={m.label} style={fade(phase >= m.ph)}>
                <line x1={cx} y1={BASE} x2={cx} y2={up ? ly + 16 : ly - 26} stroke={m.color} strokeWidth="1.5" />
                <circle cx={cx} cy={BASE} r="7" fill={m.color} stroke="var(--bg)" strokeWidth="2" />
                <text x={cx} y={up ? ly - 6 : ly} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)">{m.label}</text>
                <text x={cx} y={up ? ly + 10 : ly + 16} textAnchor="middle" fontSize="12" fill="var(--ink-muted)">{m.sub}</text>
              </g>
            )
          })}
          {/* revision arrow for the viral number */}
          <g style={fade(phase >= 3, 0.4)}>
            <path d={`M ${x(519)} ${BASE - 120} C ${x(200)} ${BASE - 160}, ${x(30)} ${BASE - 150}, ${x(15)} ${BASE - 100}`} fill="none" stroke="var(--spirit-red)" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x={x(60)} y={BASE - 150} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--red)">Revised toward about 15 mL</text>
          </g>
        </svg>
        <div className="h2" style={{ textAlign: 'center', ...reveal(phase >= 4) }}>Location and cooling design are the levers.</div>
        <div className="cols" style={{ gap: 14, ...reveal(phase >= 4, 0.15) }}>
          <div className="panel gray" style={{ padding: '14px 18px' }}>
            <div className="kicker">Global share small</div>
            <p className="small">About 1.5 percent of global electricity in 2024. Roughly a tenth of demand growth to 2030.</p>
          </div>
          <div className="panel red" style={{ padding: '14px 18px' }}>
            <div className="kicker red">Local impact real</div>
            <p className="small">One AI data center can draw as much as an aluminum smelter, and they concentrate geographically.</p>
          </div>
        </div>
      </div>
    </Slide>
  )
}
