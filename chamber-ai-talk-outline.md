# AI, Plainly: What It Adds, What It Costs, What It Changes
St. Cloud Chamber of Commerce Speaker Series. 45 minutes. Slide outline, revised September 16, 2026.

## TL;DR
Fifteen slides in four parts plus a close. Part 1 shows what AI added to one week of a life. Part 2 takes one local controversy (data centers) and shows how to weigh it without exaggerating in either direction. Part 3 makes the bigger claim: AI is a new medium, and the finished artifact is no longer the point. Every number has a clickable source. The city's own data center ordinance returns to the Planning Commission in October, so part 2 lands as advice the room can use. Productivity research is held in reserve at the end for Q&A.

## Timing
| Segment | Slides | Minutes |
|---|---|---|
| Opening | 1 | 4 |
| Part 1: What AI adds to a life | 4 | 14 |
| Part 2: Doing data centers right | 6 | 13 |
| Part 3: The fluid metamedia | 3 | 10 |
| Part 4: Close | 1 | 4 |
| Total | 15 | 45 |

## Build notes for Claude Code
- One slide per heading below. Slide title is the heading text after the number.
- "On the slide" is the visible content. "Say" is speaker notes. "Sources" become clickable links in the notes and, where marked, on the slide.
- No em-dashes anywhere. No semicolons. Sentence case titles.
- Photographs are placeholders to be supplied by Mark.

---

## Slide 0. Opening
On the slide: talk title, Mark's name, VizLab and TrueNorth.
Say: One sentence on the lab, one on TrueNorth, one on why a rural Minnesota audience is the right audience. Then the promise: "I am going to show you what this technology did for me last week, what it actually costs, and why the thing it makes is not the thing that matters." Do not preview the personal story.

---

## Part 1: What AI adds to a life
Frame, spoken before 1A: "Eight days ago I got a call that my mother had days or hours left. Everything after that was done with a phone and four different AI models."

### Slide 1A. Trip planning and the car manual
On the slide: two photographs. Left, the route or the hotel. Right, the dashboard.
Say: Trip, rental car, hotels, and a weather forecast for where we would be, when, if we kept to the schedule. Then half an hour failing to find the cruise control. Gemini read the manual. Later on the road: "Find a McDonald's not far off our path and add it to the route." Point: the tedious layer disappears when you can say what you need, and the tool meets you where you are, which is a highway in Alabama.

### Slide 1B. Genealogy and the photograph
On the slide: the restored photograph (with permission), beside the original if it reads on a projector.
Say: The funeral home needed a picture. The one that mattered was pixelated and crushed by compression. ChatGPT cleaned it, colorized it, removed the reflection of the person who took it, and produced a print-ready image. Then Claude did genealogy: real names of grandparents and great-grandparents, and to get a grandmother's maiden name it had to find Uncle Pete's obituary. Point: this was not available to a non-specialist at any price a year ago, and the genealogy was research with judgment, not lookup. Hold the photograph for part 2 and part 3.

### Slide 1C. What an onboard LLM could do
On the slide: three items. Vehicle diagnostics and performance. Adaptive navigation. Road games (keeps score, knows the rules).
Say: Brainstormed with two models on the drive. A car that knows its own OBD data and explains the check engine light in plain English. Navigation that reroutes around what you need, not just traffic. A road game referee for the back seat. Point: the assistant is moving from the phone into the things we already own.

### Slide 1D. What AI adds
On the slide: two lines. Adaptive information. Complex, long-duration tasks.
Say: Adaptive information is the manual, the route, the weather, delivered at the moment and in the form you need. Long-duration tasks are the genealogy search and the trip plan, work that spans hours and many steps and comes back finished. Landing line: "I did not know how to do any of that. It did not matter."

---

## Part 2: Doing data centers right

### Slide 2-Intro. Picking one controversy
On the slide: a short list of AI controversies (jobs, education, copyright, energy, data centers, misinformation), with data centers highlighted.
Say: There are a half dozen AI controversies that deserve this treatment. I am picking the one this city is deciding right now.

### Slide 2A. The local decision
On the slide: the draft ordinance in five lines. Enterprise: under 10,000 sq ft, 2,000 servers, 50 MW, allowed by right in industrial and C3/C5. Hyper-scale: I3 only, conditional use permit, own hearing, quarter-mile setback from residential, city water and sewer, impact studies.
Say: The Planning Commission voted 5 to 1 last Tuesday to postpone the city's first data center rules until October. Right now the code treats data centers as communications facilities, already allowed in planned industrial parks with no standards attached. Sartell passed a conditional use requirement in April. Waite Park discussed a moratorium. "No data centers" is not on the table. The question the city is asking is the right one: how.
Sources:
- https://knsiradio.com/2026/09/09/st-cloud-planning-commission-delays-vote-on-first-data-center-rules/
- https://knsiradio.com/2026/09/07/st-cloud-weighs-first-ever-data-center-zoning-rules-at-tuesday-planning-commission-hearing/
- https://www.stcloudlive.com/news/local/sartell-passes-data-center-revision-requires-companies-to-apply-for-conditional-use-permits

### Slide 2B. Data center is not AI
On the slide: one number, large. "85 to 95 percent of data center load today is the ordinary internet." Below it: banking, travel, payroll, every SaaS tool in this room.
Say: Everything online runs through one. AI has been roughly 5 to 15 percent of data center power use in recent years, projected at 35 to 50 percent by 2030. Put this up before the word "AI" appears.
Source (on slide): https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context

### Slide 2C. Both sides exaggerate
On the slide: one chart. Horizontal axis, milliliters of water per query, log scale from 0.1 to 1000. Marks: Altman's implied 0.11 mL, his earlier 0.32 mL, Jegham efficient models under 2 mL, Jegham heavy reasoning models over 150 mL, the viral 519 mL. Chart title: "Location and cooling design are the levers."
Say: Altman, September 2: 38,000 ChatGPT queries equal one almond, cited from memory. Run his own numbers and you get about 11,000. The other side's viral 519 mL came from a 2023 GPT-3 estimate that assumed conversations ten times longer than typical, and the researcher behind it has revised toward roughly 15 mL. The primary benchmark shows a 75x spread depending on the model. Energy in context: data centers were about 1.5 percent of global electricity in 2024 and roughly a tenth of demand growth to 2030, less than industrial motors, air conditioning, or EVs. The counterweight from the same report: one AI data center can draw as much as an aluminum smelter, and they concentrate geographically. Global share small. Local impact real. Both true.
Sources:
- https://calmatters.org/environment/2026/09/sam-altman-almonds-chatgpt-water-california
- https://www.tomsguide.com/ai/should-you-feel-guilty-using-chatgpt-we-just-fact-checked-sam-altmans-wild-almond-claim
- https://arxiv.org/abs/2505.09598
- https://waterfreechat.com/blog/ai-water-usage-per-prompt (secondary, for the 519 mL revision)
- https://carbonbrief.org/ai-five-charts-that-put-data-centre-energy-use-and-emissions-into-context

### Slide 2D. The ledger
On the slide: two columns. Left, "What the state gives": 35-year sales tax exemption on IT equipment and software, $133M in FY2027 rising to $219M in FY2029, net fiscal impact negative every year since 2012. Right, "What the state requires": data centers pay incremental infrastructure costs, own rate class, water reporting to DNR above 100M gallons per year, $2M to $5M per year to low-income energy programs, 2040 carbon-free standard applies. Footer: "Not in state law: setbacks, height, noise, neighbor protections. That is the city's job."
Say: The electricity exemption ended July 2025. The new large-scale tier starts at $250M. The January 2026 evaluation for the Legislature found offsetting revenue insufficient every year, as deep as minus $90.7M in 2018. The honest gap: nobody has a clean number on jobs or indirect effects. The auditor said so in 2018 and the Star Tribune found the same in 2025. The state handles rates and water. The ordinance handles the neighbors.
Sources:
- https://www.house.mn.gov/NewLaws/story/2025/5641
- https://www.house.mn.gov/hrd/as/94/2025-1/as012.pdf
- https://minnesotareformer.com/2025/06/11/minnesota-lawmakers-extend-tax-breaks-for-big-tech-data-centers/
- https://www.lbo.mn.gov/TERC/meetings/2026/2026_01_15/UGA_Data_Center_Evaluation_Report.pdf
- https://www.auditor.leg.state.mn.us/announce/salestax.pdf
- https://www.startribune.com/big-tech-will-use-minnesota-tax-breaks-for-an-influx-of-data-centers-nobody-knows-how-much-it-will-cost/601218607
- https://www.lmc.org/?p=46783

### Slide 2E. The turn
On the slide: the restored photograph from 1B, full bleed. One line: "The question isn't whether to have data centers. It's how to do them right."
Say: That picture came out of a data center. So did your payroll this morning. The risks are problems to solve, not reasons to obstruct, and the city is solving them. Ask for the studies, set the setbacks, price the water, and then say yes to the right project.

---

## Part 3: The fluid metamedia
Frame, spoken before 3A: "The productivity claims are mostly noise. The medium claim is right."

### Slide 3A. The agentic engine
On the slide: reuse the existing agentic engine slide. [Mark supplies.]
Say: Show, don't describe. The 90-second cut. The shift: you are no longer operating software, you are directing it. The agent plans, calls tools, checks its own work, and comes back. Tie to part 1: the genealogy search was an agent. The route change was an agent. Neither produced a document.

### Slide 3B. The artifact is not the point
On the slide: two boxes. "Intent: this is the picture we want, make it printable." Arrow to "Artifact: one rendering of that intent." A second arrow back, labeled "re-render."
Say: The obituary photo is not the work. The work is the intent. The artifact is one rendering of it and can be rendered again, differently, on request. Metamedia: a medium that absorbs every other medium and stays fluid. Text becomes image becomes code becomes video, and back.

### Slide 3C. The limit moves
On the slide: one line. "Knowledge and skill were the barriers. Now the barrier is how well you can say what you mean."
Say: Landing line: "Anything you can form clearly in your mind, you can now make real. The only skill left is communicating the idea."

---

## Part 4: Close

### Slide 4. Three lines to take home
On the slide:
1. It added more to my week than any technology in thirty years, and I was the novice.
2. Data centers are how the internet works. Do them right. The city is doing that.
3. The thing AI makes is not the thing that matters. Learn to say what you mean.
Say: Offer: VizLab is open to Chamber members who want to see the engine run. One sentence, one URL.

---

## Reserve: productivity research (for Q&A, not in the deck flow)
Build as one hidden slide or a notes page.
- MIT NANDA, 2025: 95 percent of enterprise generative AI pilots produced no measurable P&L impact. The 5 percent that worked were high-volume back-office tasks on clean, governed data. Source: https://techorbitgroup.com/generative-ai-erp-roi/ (secondary, link the NANDA report when available)
- METR randomized trial, 2025: experienced developers were 19 percent slower with AI tools. They predicted 24 percent faster. Afterward they still believed they had been 20 percent faster. Source: https://techcrunch.com/2025/07/11/ai-coding-tools-may-not-speed-up-every-developer-study-shows
- Brynjolfsson, Li, and Raymond, QJE 2025: 5,179 support agents, 14 percent average gain, 34 percent for novices, near zero for experts. Agents took only 38 percent of the tool's suggestions. Sources: https://www.nber.org/papers/w31161 and https://mitsloan.mit.edu/centers-initiatives/institute-work-and-employment-research/generative-ai-and-worker-productivity
- Operating model: centralized or hub-and-spoke efforts report about 36 percent higher ROI than scattered ones. Source: https://www.appmaisters.com/implementing-generative-ai-strategy-enterprise-roi/ (secondary, McKinsey primary to be linked)
- One-line answer if asked about "10x": "10x is rare. 14 percent is real. 34 percent for the person who didn't know how yesterday. Guard your data, then get out of the way."

## Open items
- Confirm the Chamber's format: podium plus Q&A, or lunch table talk.
- Decide whether to name the funeral home story from the stage or hold it.
- Replace the three secondary sources with primaries (NANDA report, McKinsey State of AI, Ren's revised water estimate).
- Supply photographs for 1A and 1B and the engine slide for 3A.
- Check whether Planning Commission members or city staff will be in the room. If so, 2E can address them directly.
