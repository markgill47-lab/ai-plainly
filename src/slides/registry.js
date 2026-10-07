import LandingSlide from './LandingSlide.jsx'
import TripPlanning from './TripPlanning.jsx'
import Genealogy from './Genealogy.jsx'
import OnboardLLM from './OnboardLLM.jsx'
import WhatAIAdds from './WhatAIAdds.jsx'
import PickASubject from './PickASubject.jsx'
import AdoptionTiming from './AdoptionTiming.jsx'
import DataCentersInProportion from './DataCentersInProportion.jsx'
import NotWhetherHow from './NotWhetherHow.jsx'
import CreativeEngine from './CreativeEngine.jsx'
import HelpfulAgents from './HelpfulAgents.jsx'
import PickingTheRightOne from './PickingTheRightOne.jsx'
import MeansForBusiness from './MeansForBusiness.jsx'
import LocalDecision from './LocalDecision.jsx'
import NotAI from './NotAI.jsx'
import BothSides from './BothSides.jsx'
import Ledger from './Ledger.jsx'
import TheTurn from './TheTurn.jsx'
import AgenticEngine from './AgenticEngine.jsx'
import ThreeLines from './ThreeLines.jsx'
import ProductivityResearch from './ProductivityResearch.jsx'

/*
  Slide registry. `phases` = number of click reveals within a slide.
  `notes` = speaker notes ("Say" in the outline) plus clickable sources.
  `code` is the outline's slide number and `part` the section heading.
*/
const P0 = 'Opening'
const P1 = 'Part 1 · What AI adds to a life'
const P2 = 'Part 2 · Getting started'
const P3 = 'Part 3 · Doing data centers right'
const P4 = 'Part 4 · Close'

export const MAIN_SLIDES = [
  { id: 'opening', code: '0', part: P0, title: 'AI, plainly', phases: 1, Component: LandingSlide,
    notes: { say: [
      'One sentence on the lab, one on why a rural Minnesota audience is the right audience.',
      'Then the promise: "I am going to show you what this technology did for me last week, what it actually costs, and why the thing it makes is not the thing that matters."',
      'Do not preview the personal story.',
    ] } },

  { id: 'trip-planning', code: '1A', part: P1, title: 'Trip planning and the car manual', phases: 2, Component: TripPlanning,
    notes: {
      frame: 'Spoken before 1A: "Eight days ago I got a call that my mother had days or hours left. Everything after that was done with a phone and four different AI models."',
      say: [
        'Trip, rental car, hotels, and a weather forecast for where we would be, when, if we kept to the schedule.',
        'Then half an hour failing to find the cruise control. Gemini read the manual.',
        'Later on the road: "Find a McDonald\'s not far off our path and add it to the route."',
        'Point: the tedious layer disappears when you can say what you need, and the tool meets you where you are, which is a highway in Alabama.',
      ], sources: [
        { url: 'https://owners.hyundaiusa.com/content/dam/hyundai/us/myhyundai/manuals/glovebox-manual/2024/sonata/24%20Sonata%20OM.pdf', note: 'dashboard illustration, Hyundai Sonata Owner\'s Manual, Center Console Overview p. 2-6' },
      ] } },

  { id: 'genealogy', code: '1B', part: P1, title: 'Genealogy and the photograph', phases: 2, Component: Genealogy,
    notes: { say: [
      'The funeral home needed a picture. The one that mattered was pixelated and crushed by compression.',
      'ChatGPT cleaned it, colorized it, removed the reflection of the person who took it, and produced a print-ready image.',
      'Then Claude did genealogy: real names of grandparents and great-grandparents, and to get a grandmother\'s maiden name it had to find Uncle Pete\'s obituary.',
      'Point: this was not available to a non-specialist at any price a year ago, and the genealogy was research with judgment, not lookup.',
      'Hold the photograph for part 2 and part 3.',
    ] } },

  { id: 'what-ai-adds', code: '1C', part: P1, title: 'What AI adds', phases: 3, Component: WhatAIAdds,
    notes: { say: [
      'Adaptive information is the manual, the route, the weather, delivered at the moment and in the form you need.',
      'Long-duration tasks are the genealogy search and the trip plan, work that spans hours and many steps and comes back finished.',
      'Landing line: "I did not know how to do any of that. It did not matter."',
    ] } },

  { id: 'adoption-timing', code: '2A', part: P2, title: 'Adoption timing', phases: 3, Component: AdoptionTiming,
    notes: { say: [
      'Three curves, one question. Not whether you will adopt AI, but when.',
      'Rogers first: how any idea spreads across a population. It is about people, not technology. Ask the room where they sit, then click the chart to place them.',
      'Then the hype cycle: where the technology actually is. Generative AI is in the trough, agentic AI is just past the peak, robotic AI is barely started. Placements are as of early 2026.',
      'Then the J-curve: early adopters absorb the cost before the return shows up. The window is where there is enough proof to reduce risk and enough advantage left to matter.',
      'Adopt too early and there is a real cost. Wait too long and you are not gaining an edge, you are keeping up.',
      'Arrow keys layer the curves in. The pills toggle them. Click or drag on the chart to move the marker.',
    ] } },

  { id: 'helpful-agents', code: '2B', part: P2, title: 'Helpful agents', phases: 4, Component: HelpfulAgents,
    notes: { say: [
      'New agents recently on the market move the needle on which market segment AI is being sold to.',
      'Meta Muse, OpenAI Dots, Instinct, and more are coming. They do the long-term and scheduled tasks that normal people need doing.',
      'First reveal: the subscriptions story. Within an hour of installation.',
      'Second reveal: Amazon blocked Muse on September 20, twelve days after launch. Amazon says the agent does not identify itself and captures customer credentials. The ad revenue motive is the reading of analysts, not what Amazon said.',
      'Third reveal: Shopify opened its catalog and Shop Pay to Muse. Walmart is a Muse shopping partner. Both signed on to the Personal Agent Protocol, announced October 6. Walmart still runs human verification that can block agents.',
      'Live demo slot, if the room and the network allow it.',
    ], sources: [
      { url: 'https://www.pbs.org/newshour/nation/meta-launches-personal-ai-agent-muse-to-help-with-everyday-tasks', note: 'Muse launch, September 8, 2026' },
      { url: 'https://www.cbsnews.com/news/sam-altman-openai-dots-chatgpt-agents-safety/', note: 'OpenAI Dots launch, September 29' },
      { url: 'https://fortune.com/2026/09/30/noah-shinn-instinct-ai-assistant-meta-muse-alexandr-wang-tech-series-c-ai-agent-mark-zuckerberg/', note: 'Instinct' },
      { url: 'https://axios.com/2026/09/24/meta-muse-subscription-stocks', note: 'Muse and subscription cancellations' },
      { url: 'https://thenextweb.com/news/amazon-blocks-muse-perplexity-amended-complaint', note: 'Amazon blocks Muse, September 20; Amazon cites undisclosed agent access' },
      { url: 'https://finance.yahoo.com/technology/ai/articles/metas-muse-ai-good-bad-225000015.html', note: 'the ad revenue motive, analyst view; $76B in Amazon ad revenue' },
      { url: 'https://www.forbes.com/sites/noemi-kis/2026/09/23/metas-muse-ai-agent-can-now-shop-on-shopify-but-amazon-blocked-it/', note: 'Shopify opens its catalog and Shop Pay to Muse' },
      { url: 'https://thenextweb.com/news/personal-agent-protocol-sierra-meta', note: 'Personal Agent Protocol, October 6; Walmart and Shopify signed on' },
    ] } },

  { id: 'creative-engine', code: '2C', part: P2, title: 'The creative engine', phases: 3, Component: CreativeEngine,
    notes: {
      frame: 'Spoken before 2C: "The productivity claims are mostly noise. The medium claim is right."',
      say: [
        'The human is at the center. The engine does not start itself.',
        'Intent, generate, review, present, and around again. Generation is the part people think of as AI. It is one station of four.',
        'The same cycle produces documents, video, imagery, music, software. The output type is a detail.',
        'Tie to part 1: the photograph and the genealogy both ran this loop. I supplied the intent and the review.',
        'Every station is clickable if someone asks for more.',
      ] } },

  { id: 'picking-the-right-one', code: '2D', part: P2, title: 'Picking the right one', phases: 3, Component: PickingTheRightOne,
    notes: { say: [
      'Decide for yourself if the time is right. Point back to the adoption curve: not everyone adopts at the same time, and that is fine.',
      'Get in the pool. You do not learn to swim by reading a book. Practically every model has a way to try it for free.',
      'Find one that gets you. I like Claude because it gets me, but your mileage may vary.',
    ] } },

  { id: 'means-for-business', code: '2E', part: P2, title: 'What does this mean for business?', phases: 4, Component: MeansForBusiness,
    notes: { say: [
      'Protect your information. You already have employees who use AI on company data. If they find it helpful, it is probably something you should provide them.',
      'Wide-scale adoption does not yet pay off. Be judicious about how you try to apply it.',
      'Pick one problem, one task, one skill you lack, and see if an AI can help. Then pick another. Then another.',
      'Treat it like a new employee. It will take time for you to get to know each other.',
    ] } },

  { id: 'data-centers-in-proportion', code: '3A', part: P3, title: 'Data centers, in proportion', phases: 3, Component: DataCentersInProportion,
    notes: {
      frame: 'Spoken before 3A: "There are a half dozen AI controversies that deserve this treatment. I am picking the one this city is deciding right now."',
      say: [
        'A data center is not AI. Everything online runs through one. AI has been roughly 5 to 15 percent of data center power use in recent years, projected at 35 to 50 percent by 2030.',
        'Altman, September 2: 38,000 ChatGPT queries equal one almond, cited from memory. Run his own numbers and you get about 11,000.',
        'The other side\'s viral 519 mL came from a 2023 GPT-3 estimate that assumed conversations ten times longer than typical, and the researcher behind it has revised toward roughly 15 mL.',
        'The primary benchmark shows a 75x spread depending on the model.',
        'Data centers were about 1.5 percent of global electricity in 2024. But one AI data center can draw as much as an aluminum smelter, and they concentrate geographically.',
        'Global share small. Local impact real. Both true.',
        'The detail slides for all of this are in the reserve.',
      ], sources: [
        { url: 'https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context', note: 'on slide' },
        'https://calmatters.org/environment/2026/09/sam-altman-almonds-chatgpt-water-california',
        'https://www.tomsguide.com/ai/should-you-feel-guilty-using-chatgpt-we-just-fact-checked-sam-altmans-wild-almond-claim',
        'https://arxiv.org/abs/2505.09598',
        { url: 'https://waterfreechat.com/blog/ai-water-usage-per-prompt', note: 'secondary, for the 519 mL revision' },
      ] } },

  { id: 'not-whether-how', code: '3B', part: P3, title: 'Not whether. How.', phases: 3, Component: NotWhetherHow,
    notes: { say: [
      'The state gives a 35-year sales tax exemption. The January 2026 evaluation for the Legislature found offsetting revenue insufficient every year.',
      'The state handles rates and water. The ordinance handles the neighbors.',
      'The Planning Commission voted 5 to 1 to postpone the city\'s first data center rules until October. Sartell passed a conditional use requirement in April. Waite Park discussed a moratorium.',
      '"No data centers" is not on the table. The question the city is asking is the right one: how.',
      'That photograph came out of a data center. So did your payroll this morning.',
      'Ask for the studies, set the setbacks, price the water, and then say yes to the right project.',
    ], sources: [
      'https://knsiradio.com/2026/09/09/st-cloud-planning-commission-delays-vote-on-first-data-center-rules/',
      'https://www.stcloudlive.com/news/local/sartell-passes-data-center-revision-requires-companies-to-apply-for-conditional-use-permits',
      'https://www.house.mn.gov/NewLaws/story/2025/5641',
      'https://www.lbo.mn.gov/TERC/meetings/2026/2026_01_15/UGA_Data_Center_Evaluation_Report.pdf',
      'https://www.lmc.org/?p=46783',
    ] } },

  { id: 'three-lines', code: '4', part: P4, title: 'Three lines to take home', phases: 3, Component: ThreeLines,
    notes: { say: [
      'Offer: NextEd Lab is open to Chamber members who want to see the engine run. One sentence, one email address.',
    ] } },
]

export const RESERVE_SLIDES = [
  { id: 'pick-a-subject', code: 'R1', part: 'Reserve', title: 'Pick a subject', phases: 1, Component: PickASubject,
    notes: { say: [
      'Q&A opener. Six arguments that each deserve their own hour.',
      'Click a subject and its high points open below. Click it again to close.',
      'The points are condensed from the AI Mythbusting wiki. Each panel links to the section it came from.',
    ], sources: [
      'https://markgill47-lab.github.io/ai-mythbusting/',
    ] } },

  { id: 'onboard-llm', code: 'R2', part: 'Reserve', title: 'What an onboard LLM could do', phases: 3, Component: OnboardLLM,
    notes: { say: [
      'Brainstormed with two models on the drive.',
      'A car that knows its own OBD data and explains the check engine light in plain English. Navigation that reroutes around what you need, not just traffic. A road game referee for the back seat.',
      'Point: the assistant is moving from the phone into the things we already own.',
    ] } },

  { id: 'agentic-engine', code: 'R3', part: 'Reserve', title: 'The agentic engine', phases: 6, Component: AgenticEngine,
    notes: {
      say: [
        'Show, don\'t describe. The 90-second cut.',
        'The shift: you are no longer operating software, you are directing it. The agent plans, calls tools, checks its own work, and comes back.',
        'Tie to part 1: the genealogy search was an agent. The route change was an agent. Neither produced a document.',
      ] } },

  { id: 'productivity-research', code: 'R4', part: 'Reserve', title: 'Productivity research', phases: 1, Component: ProductivityResearch,
    notes: { say: [
      'For Q&A only, not in the deck flow.',
      'One-line answer if asked about "10x": "10x is rare. 14 percent is real. 34 percent for the person who didn\'t know how yesterday. Guard your data, then get out of the way."',
    ], sources: [
      { url: 'https://techorbitgroup.com/generative-ai-erp-roi/', note: 'secondary, link the NANDA report when available' },
      'https://techcrunch.com/2025/07/11/ai-coding-tools-may-not-speed-up-every-developer-study-shows',
      'https://www.nber.org/papers/w31161',
      'https://mitsloan.mit.edu/centers-initiatives/institute-work-and-employment-research/generative-ai-and-worker-productivity',
      { url: 'https://www.appmaisters.com/implementing-generative-ai-strategy-enterprise-roi/', note: 'secondary, McKinsey primary to be linked' },
    ] } },

  { id: 'local-decision', code: 'R5', part: 'Reserve', title: 'The local decision', phases: 2, Component: LocalDecision,
    notes: { say: [
      'The Planning Commission voted 5 to 1 last Tuesday to postpone the city\'s first data center rules until October.',
      'Right now the code treats data centers as communications facilities, already allowed in planned industrial parks with no standards attached.',
      'Sartell passed a conditional use requirement in April. Waite Park discussed a moratorium.',
      '"No data centers" is not on the table. The question the city is asking is the right one: how.',
    ], sources: [
      'https://knsiradio.com/2026/09/09/st-cloud-planning-commission-delays-vote-on-first-data-center-rules/',
      'https://knsiradio.com/2026/09/07/st-cloud-weighs-first-ever-data-center-zoning-rules-at-tuesday-planning-commission-hearing/',
      'https://www.stcloudlive.com/news/local/sartell-passes-data-center-revision-requires-companies-to-apply-for-conditional-use-permits',
    ] } },

  { id: 'not-ai', code: 'R6', part: 'Reserve', title: 'Data center is not AI', phases: 2, Component: NotAI,
    notes: { say: [
      'Everything online runs through one.',
      'AI has been roughly 5 to 15 percent of data center power use in recent years, projected at 35 to 50 percent by 2030.',
      'Put this up before the word "AI" appears.',
    ], sources: [
      { url: 'https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context', note: 'on slide' },
    ] } },

  { id: 'both-sides', code: 'R7', part: 'Reserve', title: 'Both sides exaggerate', phases: 5, Component: BothSides,
    notes: { say: [
      'Altman, September 2: 38,000 ChatGPT queries equal one almond, cited from memory. Run his own numbers and you get about 11,000.',
      'The other side\'s viral 519 mL came from a 2023 GPT-3 estimate that assumed conversations ten times longer than typical, and the researcher behind it has revised toward roughly 15 mL.',
      'The primary benchmark shows a 75x spread depending on the model.',
      'Energy in context: data centers were about 1.5 percent of global electricity in 2024 and roughly a tenth of demand growth to 2030, less than industrial motors, air conditioning, or EVs.',
      'The counterweight from the same report: one AI data center can draw as much as an aluminum smelter, and they concentrate geographically.',
      'Global share small. Local impact real. Both true.',
    ], sources: [
      'https://calmatters.org/environment/2026/09/sam-altman-almonds-chatgpt-water-california',
      'https://www.tomsguide.com/ai/should-you-feel-guilty-using-chatgpt-we-just-fact-checked-sam-altmans-wild-almond-claim',
      'https://arxiv.org/abs/2505.09598',
      { url: 'https://waterfreechat.com/blog/ai-water-usage-per-prompt', note: 'secondary, for the 519 mL revision' },
      'https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context',
    ] } },

  { id: 'ledger', code: 'R8', part: 'Reserve', title: 'The ledger', phases: 3, Component: Ledger,
    notes: { say: [
      'The electricity exemption ended July 2025. The new large-scale tier starts at $250M.',
      'The January 2026 evaluation for the Legislature found offsetting revenue insufficient every year, as deep as minus $90.7M in 2018.',
      'The honest gap: nobody has a clean number on jobs or indirect effects. The auditor said so in 2018 and the Star Tribune found the same in 2025.',
      'The state handles rates and water. The ordinance handles the neighbors.',
    ], sources: [
      'https://www.house.mn.gov/NewLaws/story/2025/5641',
      'https://www.house.mn.gov/hrd/as/94/2025-1/as012.pdf',
      'https://minnesotareformer.com/2025/06/11/minnesota-lawmakers-extend-tax-breaks-for-big-tech-data-centers/',
      'https://www.lbo.mn.gov/TERC/meetings/2026/2026_01_15/UGA_Data_Center_Evaluation_Report.pdf',
      'https://www.auditor.leg.state.mn.us/announce/salestax.pdf',
      'https://www.startribune.com/big-tech-will-use-minnesota-tax-breaks-for-an-influx-of-data-centers-nobody-knows-how-much-it-will-cost/601218607',
      'https://www.lmc.org/?p=46783',
    ] } },

  { id: 'the-turn', code: 'R9', part: 'Reserve', title: 'The turn', phases: 2, Component: TheTurn,
    notes: { say: [
      'That picture came out of a data center. So did your payroll this morning.',
      'The risks are problems to solve, not reasons to obstruct, and the city is solving them.',
      'Ask for the studies, set the setbacks, price the water, and then say yes to the right project.',
    ] } },
]

export function slideById(id) {
  const m = MAIN_SLIDES.findIndex(s => s.id === id)
  if (m >= 0) return { list: 'main', index: m, slide: MAIN_SLIDES[m] }
  const r = RESERVE_SLIDES.findIndex(s => s.id === id)
  if (r >= 0) return { list: 'reserve', index: r, slide: RESERVE_SLIDES[r] }
  return null
}
