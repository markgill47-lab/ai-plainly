import Slide from '../components/Slide.jsx'

const STUDIES = [
  { who: 'MIT NANDA, 2025', stat: '95%', what: 'of enterprise generative AI pilots produced no measurable P&L impact. The 5 percent that worked were high-volume back-office tasks on clean, governed data.' },
  { who: 'METR randomized trial, 2025', stat: '19% slower', what: 'Experienced developers with AI tools. They predicted 24 percent faster. Afterward they still believed they had been 20 percent faster.' },
  { who: 'Brynjolfsson, Li, Raymond, QJE 2025', stat: '14%', what: 'Average gain across 5,179 support agents. 34 percent for novices, near zero for experts. Agents took only 38 percent of the tool’s suggestions.' },
  { who: 'Operating model', stat: '36%', what: 'Higher ROI for centralized or hub-and-spoke efforts than for scattered ones.' },
]

export default function ProductivityResearch({ slide }) {
  return (
    <Slide slide={slide} title={<>Productivity research, <em>for Q&amp;A</em></>} eyebrow="Reserve · not in the deck flow">
      <div style={{ width: '100%', maxWidth: 1140, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {STUDIES.map(s => (
            <div key={s.who} className="card">
              <div className="kicker">{s.who}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 40, lineHeight: 1, color: 'var(--red)' }}>{s.stat}</div>
              <div className="tg">{s.what}</div>
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="kicker blue">If asked about “10x”</div>
          <p className="lead">10x is rare. 14 percent is real. 34 percent for the person who didn’t know how yesterday. Guard your data, then get out of the way.</p>
        </div>
      </div>
    </Slide>
  )
}
