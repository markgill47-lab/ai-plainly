import { useState } from 'react'
import Slide from '../components/Slide.jsx'
import { reveal } from './shared.js'

/*
  Reserve opener. Six subjects; clicking one opens its high points in the
  space below. Points are condensed from the AI Mythbusting wiki
  (C:\Projects\MythBusting_AI_Wiki, each section's "short version"),
  except Data centers, which also carries this deck's local numbers.
*/
const WIKI = 'https://markgill47-lab.github.io/ai-mythbusting/'

const SUBJECTS = [
  { id: 'jobs', label: 'Jobs', line: 'It depends, and the variable is not the one people expect.',
    points: [
      <>In 2016 radiologists were <b>finished within five years</b>. A decade later there is a historic shortage and salaries are up.</>,
      <>Translation and stock photography <b>went the other way</b>. Cheaper supply did not create more buyers.</>,
      <>The variable is whether <b>demand for the output is elastic</b>. Radiology was. Stock photography was not.</>,
      <>The entry-level job already moved: developer employment at ages 22 to 25 is <b>down roughly 20 percent</b> from its 2022 peak.</>,
      <>What stays scarce is <b>judgment, taste, and intent</b>. The tool removes skill as the barrier to entry.</>,
    ],
    sources: [['Slop and the Paintbrush', '05-slop-and-the-paintbrush.html'], ['The Upside-Down Curriculum', '08-the-upside-down-curriculum.html']] },

  { id: 'education', label: 'Education', line: 'Outsource only what you already understand.',
    points: [
      <><b>Yes, it can make you worse at thinking.</b> That is the strongest ground the skeptics have.</>,
      <>Whether it does <b>comes down to order</b>. Think first, then add the tool, and recall and engagement went up.</>,
      <>The evidence is <b>thinner than either side admits</b>: an unreviewed preprint, eighteen people in the condition that matters.</>,
      <>We teach execution for two years and specification in the last semester. <b>The job inverted and the schedule did not.</b></>,
      <>The critical skill is not auditing the output. It is <b>knowing what has to go in the spec</b>.</>,
    ],
    sources: [['Two Engineers, One Desk', '07-two-engineers-one-desk.html'], ['The Upside-Down Curriculum', '08-the-upside-down-curriculum.html']] },

  { id: 'copyright', label: 'Copyright', line: 'Three questions wearing one coat.',
    points: [
      <><b>Acquisition, training, output.</b> The popular claim fuses all three. The courts are keeping them apart.</>,
      <>Training on books was ruled <b>fair use, twice</b>, by two federal judges in June 2025.</>,
      <>Acquiring pirated copies was ruled <b>separately infringing</b>, and produced a $1.5 billion settlement fund, about $3,000 per work.</>,
      <><b>Output is wide open.</b> The studios sued over what users can make, not over how the model was trained.</>,
      <>Transformation wins. Direct substitution loses. <b>The middle is unmapped</b>, and whether creators get paid is still unanswered.</>,
    ],
    sources: [['Three Petals', '04-three-petals.html']] },

  { id: 'energy', label: 'Energy', line: 'The confidence is unearned in both directions.',
    points: [
      <>Everything under construction was financed against a <b>2023 guess about 2030</b>, and nobody published the uncertainty.</>,
      <>They <b>built for training and the work arrived as inference</b>. Agents use ten to a hundred times more tokens per session.</>,
      <>The biggest variable is <b>how long a GPU stays useful</b>. Estimates run from one year to six.</>,
      <><b>Power is the constraint, not money.</b> Capacity prices in one major market rose roughly elevenfold in two years.</>,
      <>If the projected demand does not arrive, <b>the ratepayers hold the asset</b>, not the people who made the bet.</>,
    ],
    sources: [['The Hurricane Cone', '02-the-hurricane-cone.html']] },

  { id: 'data-centers', label: 'Data centers', line: 'Global share small. Local impact real. Both true.',
    points: [
      <><b>85 to 95 percent</b> of data center load today is the ordinary internet, not AI.</>,
      <>Water per query is quoted anywhere from <b>0.1 mL to 519 mL</b>. The viral number has been revised toward about 15 mL.</>,
      <>Data centers already draw around <b>a quarter of the electricity</b> in Virginia and in Ireland.</>,
      <>The fiber comparison does not fit. <b>A powered-down data center is not an asset</b> waiting for the next era.</>,
      <>Minnesota sets rates and water reporting. <b>Setbacks, noise, and neighbors are the city’s job.</b></>,
    ],
    sources: [['The Hurricane Cone', '02-the-hurricane-cone.html']] },

  { id: 'misinformation', label: 'Misinformation', line: 'The bots are real. The cabal isn’t.',
    points: [
      <>Automated traffic was <b>53 percent of the web in 2025</b>, up from 42 percent in 2021. One vendor’s view, good bots and bad together.</>,
      <>AI bot visits to publisher sites went from <b>1 in 200 to 1 in 31</b> human visits inside twelve months.</>,
      <>Google referral traffic to publishers <b>fell 33 percent</b> in a single year. The money that paid for the human web is leaving.</>,
      <><b>Nobody planned this.</b> The half of the theory that says it was deliberate has no evidence behind it.</>,
      <>The counterweight: about <b>74 percent of sources</b> cited in AI search summaries are still human-written.</>,
    ],
    sources: [['Nobody Planned This', '09-nobody-planned-this.html']] },
]

export default function PickASubject({ slide }) {
  const [active, setActive] = useState(null)
  const subject = SUBJECTS.find(s => s.id === active)

  return (
    <Slide slide={slide} title={<>Pick <em>a</em> subject</>} beams="small" stageStyle={{ alignItems: 'flex-start' }}>
      <div style={{ width: '100%', maxWidth: 1100, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div className="subject-row">
          {SUBJECTS.map((s, i) => (
            <button key={s.id} className={`subject${active === s.id ? ' on' : ''}`} aria-pressed={active === s.id}
              onClick={() => setActive(active === s.id ? null : s.id)} style={reveal(true, 0.05 * i)}>
              {s.label}
            </button>
          ))}
        </div>

        {subject ? (
          <div key={subject.id} className="panel subject-panel">
            <p className="h2">{subject.line}</p>
            <ul>
              {subject.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <div className="source-row">
              <span className="k">AI Mythbusting</span>
              {subject.sources.map(([title, file]) => (
                <a key={file} href={WIKI + file} target="_blank" rel="noreferrer">{title}</a>
              ))}
            </div>
          </div>
        ) : (
          <p className="lead">Six arguments that each deserve their own hour. Pick one and we will take the high points.</p>
        )}
      </div>
    </Slide>
  )
}
