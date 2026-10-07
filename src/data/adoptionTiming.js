/*
  Adoption Timing data and curve math, adapted from the standalone tool
  (C:\Projects\Adoption_Timing, src/data and src/utils). Positions are
  normalized 0 to 1 across the x-axis. Gartner marker positions are the
  tool's early-2026 placements.
*/

/* ---- Rogers' Diffusion of Innovations ---- */
export const ROGERS_SEGMENTS = [
  { name: 'Innovators', short: 'Innovators', pct: '2.5%', x: 0.00, w: 0.06,
    gain: 'Maximum strategic advantage. You shape the market before it exists.',
    risk: 'Highest cost, unproven technology, no playbook to follow.' },
  { name: 'Early Adopters', short: 'Early adopters', pct: '13.5%', x: 0.06, w: 0.14,
    gain: 'Strong competitive advantage. You influence standards and best practices.',
    risk: 'Significant investment before widespread proof exists.' },
  { name: 'Early Majority', short: 'Early majority', pct: '34%', x: 0.20, w: 0.28,
    gain: 'Proven ROI. Established best practices reduce risk.',
    risk: 'Competitors who moved earlier already have the advantage.' },
  { name: 'Late Majority', short: 'Late majority', pct: '34%', x: 0.48, w: 0.30,
    gain: 'Lower risk. Commoditized solutions, known costs.',
    risk: 'No competitive advantage. You are playing catch-up.' },
  { name: 'Laggards', short: 'Laggards', pct: '16%', x: 0.78, w: 0.22,
    gain: 'Lowest cost of adoption. Fully mature technology.',
    risk: 'Existential risk. The market has moved on without you.' },
]
export const ROGERS_Y = { scale: 0.88, off: 0.02 }
export const bellCurve = (x) => Math.exp(-0.5 * Math.pow((x - 0.50) / 0.18, 2))

/* ---- Gartner Hype Cycle (Catmull-Rom control points) ---- */
export const GARTNER_POINTS = [
  [0.00, 0.00], [0.02, 0.20], [0.035, 0.60], [0.06, 0.95],
  [0.08, 1.00], [0.10, 0.80], [0.125, 0.35], [0.16, 0.12],
  [0.20, 0.14], [0.24, 0.28], [0.30, 0.52], [0.36, 0.72],
  [0.43, 0.84], [0.53, 0.88], [0.68, 0.90], [1.00, 0.90],
]
export const GARTNER_Y = { scale: 0.80, off: 0.08 }
export const GARTNER_MARKERS = [
  { id: 'robotic', label: 'Robotic AI', x: 0.04, anchor: 'end' },
  { id: 'agentic', label: 'Agentic AI', x: 0.10, anchor: 'start' },
  { id: 'genai', label: 'Generative AI', x: 0.18, anchor: 'start' },
]
export const GARTNER_PHASES = [
  { range: [0.00, 0.04], phase: 'Innovation Trigger', desc: 'Technology just emerging. Maximum uncertainty, maximum potential.' },
  { range: [0.04, 0.12], phase: 'Peak of Inflated Expectations', desc: 'Hype outpaces reality. Big promises, few proven results.' },
  { range: [0.12, 0.20], phase: 'Trough of Disillusionment', desc: 'Early failures shake confidence. This is where serious players build foundations.' },
  { range: [0.20, 0.43], phase: 'Slope of Enlightenment', desc: 'Real use cases emerge. Best practices form. The path to value becomes clear.' },
  { range: [0.43, 1.00], phase: 'Plateau of Productivity', desc: 'Proven and commoditized. Moving now means catching up, not getting ahead.' },
]

/* ---- J-Curve (return on investment) ---- */
export const JCURVE_POINTS = [
  [0.00, 0.00], [0.04, -0.08], [0.08, -0.28], [0.11, -0.48],
  [0.15, -0.58], [0.19, -0.42], [0.24, -0.10], [0.30, 0.15],
  [0.36, 0.42], [0.43, 0.62], [0.53, 0.76], [0.65, 0.84],
  [0.82, 0.88], [1.00, 0.90],
]
export const JCURVE_Y = { scale: 0.38, off: 0.44 }
export const WIN_START = 0.12
export const WIN_END = 0.40
export const JCURVE_ZONES = [
  { range: [0.00, 0.12], status: 'High cost, low return', desc: 'Deep in the investment dip. Costs are real, returns are theoretical.' },
  { range: [0.12, 0.40], status: 'Optimal window', desc: 'Enough proof to reduce risk, enough advantage left to differentiate.' },
  { range: [0.40, 1.00], status: 'Table stakes', desc: 'Returns have plateaued. Moving now is survival, not strategy.' },
]

/* ---- lookups ---- */
const inRange = (list, pos) => list.find(r => pos >= r.range[0] && pos < r.range[1]) ?? list[list.length - 1]
export const segmentAt = (pos) => ROGERS_SEGMENTS.find(s => pos >= s.x && pos < s.x + s.w) ?? ROGERS_SEGMENTS[ROGERS_SEGMENTS.length - 1]
export const gartnerPhaseAt = (pos) => inRange(GARTNER_PHASES, pos)
export const jcurveZoneAt = (pos) => inRange(JCURVE_ZONES, pos)

/* ---- Catmull-Rom spline: smooth curve through sparse control points ---- */
function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t
  const f = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3)
  return { x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y) }
}

export function splineCurve(cp, n = 400) {
  const pts = cp.map(([x, y]) => ({ x, y }))
  const ext = [pts[0], ...pts, pts[pts.length - 1]]
  const segs = Math.max(4, Math.round(n / (ext.length - 3)))
  const res = []
  for (let i = 0; i < ext.length - 3; i++) {
    for (let j = 0; j <= segs; j++) res.push(catmullRom(ext[i], ext[i + 1], ext[i + 2], ext[i + 3], j / segs))
  }
  return res
}

export function splineLookup(cp) {
  const pts = splineCurve(cp)
  return (x) => {
    for (let i = 0; i < pts.length - 1; i++) {
      if (x >= pts[i].x && x <= pts[i + 1].x) {
        const t = (x - pts[i].x) / ((pts[i + 1].x - pts[i].x) || 1)
        return pts[i].y + t * (pts[i + 1].y - pts[i].y)
      }
    }
    return pts[pts.length - 1].y
  }
}
