# SYSTEM / Your 90-day Business Analyst ascension

A general-purpose Business Analyst learning plan. Default: 90 minutes/day. Fictional supply-chain examples provide a consistent practice setting for requirements, process, data, integration and testing techniques.

Each day: 20 minutes learn → 50 minutes build → 10 minutes speak → 10 minutes review. The website scales this split to your saved daily budget. Lifestyle quests are separate. Weekly reviews consolidate rather than add a second project.

## Main Status Window wireframe

| Left navigation | Main workspace |
| --- | --- |
| Status / Quests / Dungeons / Shop / Shadows / Guide / Settings | Header: player, IST date, day number, gold |
| Player identity and save controls | Player card: level, rank, total XP, mission count, XP progress |
| Navigation remains available | Attribute radar: STR / AGI / VIT / INT / PER; HP and fatigue |
|  | Three chapters: Days 1–30, 31–60, 61–90 |
|  | Daily preparation (7 quests) alongside the main mission |
|  | 90-day clickable map; boss gates at 30 / 60 / 90 |
|  | Active recovery quest and export reminder |

The website contains a rendered box wireframe in System guide → The blueprint.

## Object schema

Relation, Rollup, Formula, Select and Checkbox are workspace-style property types. The running app uses browser-local JSON. schema.sql is a reference relational design, not a live server database.

| Object | Properties and types | Relationships / implementation |
| --- | --- | --- |
| Player | id (ID), name (Text), start (Date), minutes (Number), target (Select), events (Relation), Total EXP / Gold (Rollup), Level / Rank / Stats / HP (Formula) | 1 → many RewardEvent, DailyLog, QuestInstance, RaidClear, Purchase |
| CurriculumDay | day (Number, PK), week / phase (Select), title / task / acceptance / drill (Text), tools (Multi-select), resource (URL), boss (Checkbox) | 1 → many QuestInstance; many → Dungeon through day range |
| QuestTemplate | id (ID), name / detail (Text), recurrence (Select: daily), xp / gold (Number), stat (Select), stat points (Number) | 1 → many QuestInstance; five lifestyle templates plus study/speak types |
| QuestInstance | id (ID), player / template / day (Relation), scheduled_date (Date), completed_date (Date), evidence (Text), status (Select) | Stored in missions[day] and days[date].habits; one completion → one RewardEvent |
| RewardEvent | id (ID, unique), source (Text / source relation), date (Date), xp / gold (Number), stats (JSON numbers), createdAt (Datetime) | Many → Player; immutable award/purchase ledger; XP and signed Gold roll up |
| DailyLog | player (Relation), date (Date), habits (Relation set), minutes (Number), exempt / recovery (Checkbox), fatigue / HP (Formula) | Composite key player + date; closure uses this log |
| DayClosure | date (Date, unique per player), missed (Number), closedAt / due (Date) | Many → Player; creates/merges RecoveryTask; prevents repeated midnight processing |
| RecoveryTask | id (ID), due (Date), missedDates (Date array), note (Text), done (Checkbox), completedAt (Date) | One active per player; no XP or gold reward; adds recovery flag to DailyLog |
| Dungeon / Boss | id (ID), name (Text), rank (Select), start/end or day (Number), xp/gold (Number), shadow (Relation) | Many required CurriculumDays → one raid; one clear per Player |
| RaidClear | player / raid (Relation), date (Date), note (Text), checks (Checkbox array) | Unique player + raid; creates RewardEvent; dungeon clear unlocks Shadow |
| ShopItem | id (ID), name / desc (Text), cost (Number), icon (Text) | 1 → many Purchase records; four fixed prices |
| Purchase / Inventory | id (ID), itemId (Relation), name (Text snapshot), cost (Number snapshot), purchasedAt (Date), used (Checkbox) | Many → Player and ShopItem; matching signed negative Gold RewardEvent |
| Shadow | id (same as dungeon, ID), name / template (Text), unlocked (Rollup from clear), active (Checkbox) | One per Dungeon; active IDs in activeShadows; templates in curriculum.js |
| RecoveryMissedDay | task_id / player_id (Relation), missed_date (Date); composite unique task + date | SQL bridge for RecoveryTask.missedDates; references DayClosure |
| RaidRequirement | raid_id / curriculum_day (Relation); composite unique raid + day | SQL bridge for required training days; app derives it from start/end ranges |
| PlayerShadow | player_id / shadow_id (Relation), active (Checkbox); composite unique player + shadow | SQL bridge for a player’s extracted shadows; app stores active IDs |

## Exact progression rules

Total EXP and gold are sums from the RewardEvent ledger; purchases have negative gold and zero XP. Every source reward has a unique key, preventing duplicate claims. Base stats are 10 plus the corresponding earned-stat sum.

Cumulative XP for Level L = 50 × (L − 1) × (L + 2).
Level = floor((sqrt(9 + 0.08 × TotalEXP) − 1) / 2).
XP required within the current level = 100 × (Level + 1).
Remaining XP = 50 × Level × (Level + 3) − TotalEXP.

| Hunter rank | Levels | Minimum total EXP |
| --- | --- | --- |
| E | 1–4 | 0 |
| D | 5–8 | 1400 |
| C | 9–12 | 4400 |
| B | 13–16 | 9000 |
| A | 17–20 | 15200 |
| S | 21+ | 23000 |

### Copy-pasteable Notion Formula 2.0 expressions

Create the named properties first. Paste each expression into its own Formula property. Total EXP is a Relation → Reward Events / XP / Sum rollup; stat earned properties are matching numeric-field rollups.

```javascript
/* Notion Formula 2.0 — Player database */
/* Total EXP: Rollup Reward Events → XP → Sum */
/* STR Earned etc.: Rollup Reward Events → STR etc. → Sum */

/* Level */
floor((sqrt(9 + 0.08 * prop("Total EXP")) - 1) / 2)

/* Rank */
ifs(prop("Level") >= 21, "S", prop("Level") >= 17, "A", prop("Level") >= 13, "B", prop("Level") >= 9, "C", prop("Level") >= 5, "D", "E")

/* EXP to Next Level */
50 * prop("Level") * (prop("Level") + 3) - prop("Total EXP")

/* Current Level EXP */
prop("Total EXP") - 50 * (prop("Level") - 1) * (prop("Level") + 2)

/* STR Total */
10 + prop("STR Earned")

/* AGI Total */
10 + prop("AGI Earned")

/* VIT Total */
10 + prop("VIT Earned")

/* INT Total */
10 + prop("INT Earned")

/* PER Total */
10 + prop("PER Earned")

/* Gold: Rollup Reward Events → Gold Delta → Sum */
```

The website’s actual executable JavaScript is in engine.js. Notion formulas alone cannot run a midnight scheduler or a chronological fatigue ledger.

## Daily preparation, HP and recovery

| Quest | XP | Gold | Stat |
| --- | --- | --- | --- |
| BA mission with evidence | 80 | 20 | INT +2 |
| Speaking drill | 20 | 5 | PER +1 |
| Comfortable movement | 20 | 5 | STR +1 |
| Anchor routine | 15 | 4 | AGI +1 |
| Hydration and regular meal | 10 | 3 | VIT +1 |
| Protect sleep/recovery | 20 | 5 | VIT +1 |
| Plan and reflect | 15 | 4 | PER +1 |

A full day earns 180 XP and 46 gold. All days plus 14 dungeons and 3 bosses yield 24,130 XP, enough for Level 21/S-Rank. Rank is a game measure; evidence reviews assess learning. Each raid also grants INT +3 and PER +2.

At midnight Asia/Kolkata (IST), close the date once. Count required quests that were not completed by that date. Add min(12, 3 × missed) fatigue. Overwork adds 4 × ceil(max(0, studyMinutes − 180) / 30). A completed rest quest subtracts 12; a recovery review subtracts 8 at most once per date. Process dates chronologically and clamp each day to 0–80 fatigue. HP = 100 − fatigue. An exempt rest day leaves fatigue unchanged and creates no missed-quest penalty. HP and fatigue are game values.

If quests are missed, assign one compulsory 10-minute recovery review due the following date: describe the blocker, shrink the next task and prepare one next step. Multiple missed dates merge into one active review. No exercise punishment, lost food/rest, debt or escalating backlog. No XP/gold reward for recovery. A closed website catches up on the next visit; checks run every minute while open. A true unattended midnight trigger needs a backend scheduler.

## Dungeons, raids and extracted shadows

Clear both learning and speaking tasks for every required day; then provide artifact notes and confirm completeness, validation and explainability. The clear pays once.

| Dungeon | Days | Rank | XP / Gold | Shadow |
| --- | --- | --- | --- | --- |
| Awakening | 1–7 | E | 120 / 35 | Problem brief |
| The art of discovery | 8–14 | E | 120 / 35 | Discovery playbook |
| Requirements forge | 15–21 | D | 180 / 50 | Requirements toolkit |
| Agile command | 22–28 | D | 180 / 50 | Story & sprint kit |
| The data gate | 29–35 | C | 240 / 65 | Excel QA checklist |
| Query labyrinth | 36–42 | C | 240 / 65 | SQL investigation pack |
| Insight chamber | 43–49 | B | 320 / 85 | KPI dictionary |
| Integration bridge | 50–56 | B | 320 / 85 | Interface checklist |
| Trial of quality | 57–63 | A | 420 / 110 | UAT command pack |
| Change catalyst | 64–70 | A | 420 / 110 | Change & SOP kit |
| The architect | 71–77 | A | 420 / 110 | Capstone blueprint |
| Voice of the hunter | 78–84 | S | 550 / 140 | Stakeholder briefing kit |
| The portfolio vault | 85–87 | S | 550 / 140 | Portfolio launch kit |
| The final ascent | 88–90 | S | 550 / 140 | Final defence kit |

| Boss | Day | XP / Gold | Portfolio pack |
| --- | --- | --- | --- |
| The Requirements Architect | 30 | 700 / 180 | Discovery + requirements pack |
| The Evidence Keeper | 60 | 1000 / 250 | Data + integration + UAT pack |
| The Business Analyst Monarch | 90 | 1600 / 400 | Three portfolio packs + final defence |

Shadow activation pins reusable templates to your army. Download and adapt them. External accounts are not connected and no external actions execute from shadow activation.

## Shop & inventory

Gold pricing: 60 for a quiet hour; 150 for a small treat; 300 for a side quest; 650 for gear/book within your real budget. Gold is imaginary, and real spending is optional. Purchases are ledger debits, overspending is blocked, and inventory records redemption. Prices are fixed; there is no compounding or paid currency.

## Five-step setup under 30 minutes

1. **0–5 minutes:** Confirm your player name, Day 1 date, daily budget and role label in Settings. The curriculum remains supply-chain/IT-focused if you change the label.
2. **5–10 minutes:** Create portfolio subfolders for Discovery, Requirements, Data, UAT and Presentations. Prepare Docs/Markdown, diagrams.net and Excel/LibreOffice.
3. **10–15 minutes:** Open Day 1, inspect its output and acceptance check, set a focus session and download the 90-day CSV if useful.
4. **15–20 minutes:** Read the daily quests and shop; adapt movement/recovery to your life and use rest-day exemption when needed.
5. **20–30 minutes:** Export your first JSON backup and set a weekly evidence review in your own calendar. Clear dungeons only after checking the work.

This is setup time for the delivered app. Rebuilding the complete app from scratch requires more time. GitHub Pages needs repository Settings → Pages → Deploy from a branch → main /docs → Save.

## Full day-by-day roadmap

### Day 1 · Your BA baseline

**Tools:** Docs, voice recorder. **Techniques:** Skills assessment.

**Build:** Score yourself 1–5 in discovery, requirements, process, data, testing and communication; record a 90-second introduction.

**Clear condition:** Six scores with one real example each; keep the recording for Day 90.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 2 · Choose the right problem

**Tools:** Docs, Excel. **Techniques:** Problem statement, SMART objectives.

**Build:** Frame a simulated dock-booking exception problem: who is affected, current pain, business impact and desired outcome.

**Clear condition:** One-page brief; separate known facts, assumptions and unmeasured baselines.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 3 · Draw the boundary

**Tools:** diagrams.net, Docs. **Techniques:** Context diagram, in/out scope.

**Build:** Map suppliers, planners, warehouse, carrier and proposed exception service; write five scope exclusions.

**Clear condition:** At least five external actors, labelled data flows and an agreed problem boundary.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 4 · Map the stakeholders

**Tools:** Excel, Docs. **Techniques:** Power–interest grid, RACI.

**Build:** Create an eight-person stakeholder register and RACI for approval, booking, escalation and reporting.

**Clear condition:** One accountable role per activity; communication preferences and decision rights captured.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 5 · Find the cause

**Tools:** diagrams.net, Excel. **Techniques:** 5 Whys, fishbone, hypothesis tree.

**Build:** Explore late delivery changes and define three testable root-cause hypotheses.

**Clear condition:** Distinguish symptom from cause; give evidence needed to test each hypothesis.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 6 · Define value

**Tools:** Excel, Docs. **Techniques:** KPI definition, benefits hypothesis.

**Build:** Define on-time delivery, exception resolution time and slot utilisation with grain, numerator and denominator.

**Clear condition:** Three KPI definitions including owner, source, exclusions and baseline collection plan.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 7 · Dungeon 01: the problem brief

**Tools:** Docs, slides. **Techniques:** Playback, peer review.

**Build:** Combine Days 1–6 into a concise discovery brief and deliver a three-minute stakeholder playback.

**Clear condition:** Scope, stakeholders, hypotheses and value measures are consistent; note three improvements.

**Speaking drill:** Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 8 · Prepare your interviews

**Tools:** Docs, voice recorder. **Techniques:** Semi-structured interview, funnel questions.

**Build:** Write ten open questions for a warehouse planner; add consent, timing and evidence prompts.

**Clear condition:** Questions avoid leading the witness and cover exceptions, workarounds and business rules.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 9 · Simulate an interview

**Tools:** Voice recorder, Docs. **Techniques:** Active listening, probing, confirmation.

**Build:** Role-play planner and analyst; capture five needs and label all responses as simulated.

**Clear condition:** Separate quotes, interpretation and assumptions; confirm the five needs in a summary.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 10 · Plan a workshop

**Tools:** Slides, whiteboard. **Techniques:** Facilitation, agenda, parking lot.

**Build:** Design a 45-minute discovery workshop with purpose, roles, activities and decisions.

**Clear condition:** Every agenda section has timing and an output; include a conflict and parking-lot plan.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 11 · Map today’s flow

**Tools:** diagrams.net. **Techniques:** BPMN basics, swimlanes, SIPOC.

**Build:** Map the as-is dock exception flow with start/end events, decision gateways and handoffs.

**Clear condition:** Four lanes, two exception routes, owners and input/output definitions; no orphan steps.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 12 · Capture hidden rules

**Tools:** Excel, Docs. **Techniques:** Observation, document analysis, decision table.

**Build:** Write rules for available capacity, carrier lateness, approval and escalation.

**Clear condition:** Decision table covers normal, boundary and invalid cases; flag assumptions for validation.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 13 · Design tomorrow’s flow

**Tools:** diagrams.net, Excel. **Techniques:** To-be modelling, gap analysis.

**Build:** Create a to-be flow with human approval before booking changes and compare it with the as-is.

**Clear condition:** Each gap has an owner, proposed change and intended benefit; preserve an exception route.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 14 · Dungeon 02: discovery playback

**Tools:** Slides, voice recorder. **Techniques:** Facilitation, confirmation, action log.

**Build:** Present as-is, to-be and unresolved questions in five slides; record a four-minute playback.

**Clear condition:** Ask for three explicit decisions and capture owner/date for each unresolved issue.

**Speaking drill:** Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 15 · Separate requirements

**Tools:** Docs, Excel. **Techniques:** Business, stakeholder, solution and transition requirements.

**Build:** Draft twelve requirements for the dock exception solution and classify each.

**Clear condition:** Each requirement has a unique ID, source, rationale and category.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 16 · Make them measurable

**Tools:** Docs. **Techniques:** Atomicity, ambiguity review, verification.

**Build:** Rewrite six vague requirements into atomic testable statements.

**Clear condition:** Each rewritten requirement has observable success conditions and avoids undefined terms such as fast.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 17 · Write the BRD

**Tools:** Docs, Confluence or Markdown. **Techniques:** Business requirements document.

**Build:** Build a lean BRD covering goals, scope, actors, assumptions, requirements and constraints.

**Clear condition:** Every requirement traces back to a business objective; include a version and approval log.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 18 · Model the user journey

**Tools:** diagrams.net, Docs. **Techniques:** Use cases, alternate and exception flows.

**Build:** Write a Reschedule Delivery use case with preconditions, trigger, normal flow and failure routes.

**Clear condition:** Include no-capacity, approval-rejected and duplicate-request scenarios.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 19 · Specify quality attributes

**Tools:** Docs, Excel. **Techniques:** Non-functional requirements, accessibility, privacy.

**Build:** Define response-time, availability, access, audit and usability requirements for the prototype.

**Clear condition:** Five measurable requirements with a verification method; targets are assumptions, not production promises.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 20 · Prioritise fairly

**Tools:** Excel. **Techniques:** MoSCoW, weighted scoring, dependency analysis.

**Build:** Prioritise twelve requirements using business value, risk, effort and dependency notes.

**Clear condition:** Explain three tradeoffs and why each must-have is needed for the minimum viable outcome.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 21 · Dungeon 03: requirements review

**Tools:** Excel, Docs. **Techniques:** Requirements traceability matrix, review.

**Build:** Create an RTM linking objectives → requirements → acceptance tests and resolve two conflicts.

**Clear condition:** No orphan requirement; all high-priority needs have an owner and test reference.

**Speaking drill:** Explain one requirement in plain language, then give its acceptance example and business value.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 22 · Learn delivery models

**Tools:** Docs, Scrum Guide. **Techniques:** Agile, waterfall, Scrum, Kanban.

**Build:** Compare a fixed compliance change with evolving booking automation; choose an approach for each.

**Clear condition:** Explain uncertainty, governance and feedback needs; identify Scrum accountabilities correctly.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 23 · Build the backlog

**Tools:** Jira or spreadsheet, Confluence. **Techniques:** Epics, user stories, INVEST.

**Build:** Create three epics and twelve user stories for the exception solution.

**Clear condition:** Each story has user, need and value; split stories that contain multiple independent outcomes.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 24 · Define acceptance

**Tools:** Jira or Markdown. **Techniques:** Given–When–Then, examples, boundary testing.

**Build:** Write three acceptance scenarios each for booking approval, duplicate handling and capacity checking.

**Clear condition:** Positive, negative and boundary scenarios are unambiguous and observable.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 25 · Slice the work

**Tools:** Whiteboard, Jira. **Techniques:** Story mapping, vertical slicing, MVP.

**Build:** Map the user journey and choose one thin end-to-end release.

**Clear condition:** MVP includes submission, validation, approval and feedback; defer low-value scope explicitly.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 26 · Plan a sprint

**Tools:** Jira or spreadsheet. **Techniques:** Refinement, estimation, Definition of Ready/Done.

**Build:** Refine six stories and create a mock sprint with a Sprint Goal and capacity assumptions.

**Clear condition:** No committed story exceeds assumed capacity; Definition of Done includes testing and evidence.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 27 · Handle a change request

**Tools:** Docs, Excel. **Techniques:** Impact analysis, change control, negotiation.

**Build:** Assess a new auto-approve request against privacy, risk, scope, cost and acceptance tests.

**Clear condition:** Give options, recommendation and approval owner; update RTM and backlog versions.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 28 · Dungeon 04: sprint simulation

**Tools:** Jira, Slides. **Techniques:** Sprint review, retrospective.

**Build:** Walk through the board, demo two paper-prototype stories and run a start/stop/continue retrospective.

**Clear condition:** Explain a blocked story and a tradeoff; log one measurable improvement for the next sprint.

**Speaking drill:** Give a 60-second update: goal, progress, blocker, next step and one clear request.

**Learn:** [The official Scrum Guide](https://scrumguides.org/download.html)

### Day 29 · Sketch the experience

**Tools:** Figma or paper, diagrams.net. **Techniques:** Low-fidelity wireframing, usability walkthrough.

**Build:** Draw an exception inbox, request detail and approval screen; annotate empty/error states.

**Clear condition:** A planner can identify status, owner and next action; capture three usability observations.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 30 · Boss 01: discovery to delivery

**Tools:** Docs, Slides, voice recorder. **Techniques:** Decision briefing, baseline review.

**Build:** Assemble your discovery + requirements portfolio; record a five-minute sponsor briefing.

**Clear condition:** Include problem, BPMN, BRD, RTM, backlog and prototype; finish with a recommendation and decision request.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 31 · Inspect the data

**Tools:** Excel or LibreOffice. **Techniques:** Data profiling, grain, source inventory.

**Build:** Open the provided synthetic shipments CSV; document row grain, columns, nulls and data types.

**Clear condition:** State that it is training data; identify duplicates before calculating KPIs.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 32 · Clean reproducibly

**Tools:** Excel Power Query. **Techniques:** Type conversion, deduplication, null handling.

**Build:** Import shipments into Power Query and define repeatable cleaning steps.

**Clear condition:** Keep raw input intact; justify duplicate and missing-date rules in a transformation log.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 33 · Build useful formulas

**Tools:** Excel. **Techniques:** XLOOKUP, IF, SUMIFS, COUNTIFS.

**Build:** Map carrier names and calculate delivered, late and exception counts by carrier.

**Clear condition:** Reconcile formulas to a small manual sample; define treatment of open shipments.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 34 · Summarise operations

**Tools:** Excel PivotTable. **Techniques:** Pivot tables, segmentation, Pareto.

**Build:** Build carrier and warehouse pivots; use a Pareto view to prioritise exception reasons.

**Clear condition:** Counts reconcile to cleaned rows; conclusions include sample size and limitations.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 35 · Dungeon 05: spreadsheet control

**Tools:** Excel, Docs. **Techniques:** Reconciliation, data validation, conditional formatting.

**Build:** Create a one-page operations tracker with inputs, calculations, checks and a user note.

**Clear condition:** Three reconciliation checks pass and invalid inputs are visibly flagged.

**Speaking drill:** Explain one metric: definition, denominator, data limitation and operational implication.

**Learn:** [Microsoft · Excel help & learning](https://support.microsoft.com/en-us/excel)

### Day 36 · Define the data model

**Tools:** diagrams.net, SQL editor. **Techniques:** ERD, keys, cardinality, normalisation.

**Build:** Model Shipment, Carrier, Warehouse and Exception with primary and foreign keys.

**Clear condition:** Declare grain and one-to-many relationships; avoid repeating carrier names on dimension rows.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 37 · Query your first table

**Tools:** SQL Server / SQLite. **Techniques:** SELECT, WHERE, ORDER BY, NULL.

**Build:** Load the starter SQL in SQLite or adapt it to SQL Server; write six filter queries.

**Clear condition:** Predict row counts for two queries and confirm NULL uses IS NULL rather than equality.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 38 · Aggregate with care

**Tools:** SQL editor. **Techniques:** GROUP BY, HAVING, COUNT, SUM, AVG.

**Build:** Calculate delivered counts, average transit time and late rate by carrier.

**Clear condition:** Exclude undelivered rows from delivery KPI denominators; show numerator and denominator.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 39 · Join without inflation

**Tools:** SQL editor. **Techniques:** INNER JOIN, LEFT JOIN, join cardinality.

**Build:** Join shipments to carriers and warehouses and compare row counts before/after.

**Clear condition:** No unexplained increase in shipment rows; unmatched keys are reported separately.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 40 · Express business logic

**Tools:** SQL editor. **Techniques:** CASE, COALESCE, date logic.

**Build:** Classify shipments as open, on-time or late and flag invalid delivery dates.

**Clear condition:** Five edge cases have expected outputs; use dialect-appropriate date functions.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 41 · Break a complex question down

**Tools:** SQL editor. **Techniques:** CTE, subquery, readable SQL.

**Build:** Find carriers with a worse late rate than the network average using a CTE.

**Clear condition:** Explain grain at each step and verify the result on one carrier manually.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 42 · Dungeon 06: SQL investigation

**Tools:** SQL editor, Docs. **Techniques:** Window functions, quality assertions.

**Build:** Rank carriers and identify duplicate external references using ROW_NUMBER; save eight reviewed queries.

**Clear condition:** Add comments with business question, denominator and limitation for every KPI query.

**Speaking drill:** Walk through your query in plain language before discussing SQL syntax.

**Learn:** [Microsoft Learn · Query with T-SQL](https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/)

### Day 43 · Connect and transform

**Tools:** Power BI Desktop or Excel fallback. **Techniques:** Power Query, reproducible ETL.

**Build:** Load the synthetic data and carrier dimension into Power BI; apply documented cleaning rules.

**Clear condition:** Refresh succeeds; row counts match your Excel control totals.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 44 · Model for analysis

**Tools:** Power BI Desktop. **Techniques:** Star schema, relationships, date table.

**Build:** Create fact shipments, carrier, warehouse and date dimensions with explicit relationship directions.

**Clear condition:** Keys are unique on dimension sides; distinguish dispatch date from delivery date.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 45 · Write measures

**Tools:** Power BI Desktop. **Techniques:** DAX measures, CALCULATE, DIVIDE.

**Build:** Create Delivered, Late Deliveries, Late Rate and Open Shipments measures.

**Clear condition:** DIVIDE handles a zero denominator; totals match your SQL on the same cleaned data.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 46 · Design for a decision

**Tools:** Power BI Desktop, paper. **Techniques:** KPI hierarchy, visual choice, accessibility.

**Build:** Build an overview with filters, trend, carrier comparison and exception detail.

**Clear condition:** Every visual answers a named stakeholder question; labels and colour do not mislead.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 47 · Analyse causes carefully

**Tools:** Power BI, Excel. **Techniques:** Segmentation, cohort, correlation vs causation.

**Build:** Compare late rates across carrier, warehouse and service level.

**Clear condition:** Show denominators; distinguish an observed association from a verified cause.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 48 · Add drill-through

**Tools:** Power BI Desktop. **Techniques:** Drill-through, tooltips, report usability.

**Build:** Add a carrier detail page and test filter interactions with three user tasks.

**Clear condition:** Users can answer the three tasks without changing the data; document reset instructions.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 49 · Dungeon 07: insight briefing

**Tools:** Power BI, Slides. **Techniques:** Data storytelling, recommendation.

**Build:** Record a three-minute report walkthrough: finding, evidence, limitation, action.

**Clear condition:** Reconcile the report to SQL and Excel; make one recommendation without inventing business savings.

**Speaking drill:** Present one finding with evidence, limitation and a recommendation in two minutes.

**Learn:** [Microsoft Learn · Power BI](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)

### Day 50 · Trace the system landscape

**Tools:** diagrams.net, SAP Learning. **Techniques:** System context, SAP TM/MM and TMS mapping.

**Build:** Draw a conceptual ERP → TMS → WMS landscape using only generic training examples.

**Clear condition:** Label master vs transactional data and system of record; do not imply access to live SAP or Blue Yonder.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 51 · Understand a contract

**Tools:** Postman, text editor. **Techniques:** HTTP methods, JSON, request/response.

**Build:** Inspect a public practice request in Postman and write a mock delivery-change JSON contract.

**Clear condition:** Specify required fields, types, example values and expected success response.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 52 · Design failure behaviour

**Tools:** Postman, Docs. **Techniques:** Status codes, validation, idempotency.

**Build:** Document duplicate, invalid capacity, unauthorised and unavailable-service outcomes.

**Clear condition:** Each failure has user feedback, retry guidance, logging and an owner.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 53 · Map source to target

**Tools:** Excel, Docs. **Techniques:** Interface mapping, transformations, reference data.

**Build:** Map carrier code, delivery date, slot and warehouse across two mock systems.

**Clear condition:** Include source/target types, required flags, transformation and rejected-record handling.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 54 · Define governance

**Tools:** Docs, Excel. **Techniques:** Master data stewardship, lineage, access.

**Build:** Create a carrier master ownership matrix and change/approval flow.

**Clear condition:** Every critical field has an owner, validation rule and audit requirement.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 55 · Protect integration quality

**Tools:** Docs, diagrams.net. **Techniques:** Reconciliation, timeout, retry, audit trail.

**Build:** Design an integration checklist for missed events, duplicates and partial failures.

**Clear condition:** Specify how counts/totals reconcile and how a human can resolve failed messages.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 56 · Dungeon 08: integration review

**Tools:** Docs, Slides. **Techniques:** Sequence diagram, contract review.

**Build:** Present a delivery change journey across mailbox, exception service, approver and TMS.

**Clear condition:** Show happy path plus timeout and rejection; align payloads with the source-to-target mapping.

**Speaking drill:** Explain the system flow to a warehouse planner without using unexplained technical terms.

**Learn:** [Postman · Send your first request](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/)

### Day 57 · Plan the test strategy

**Tools:** Docs, Excel. **Techniques:** Test levels, risk-based testing.

**Build:** Define UAT scope, roles, environment, entry/exit criteria and test data needs.

**Clear condition:** Prioritise risks; distinguish system integration testing from business acceptance.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 58 · Write executable cases

**Tools:** Excel or Jira. **Techniques:** Test design, equivalence classes, boundaries.

**Build:** Write ten UAT cases linked to requirements with steps, inputs and expected results.

**Clear condition:** Cover full slot, last available slot, invalid date, duplicate and rejected approval.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 59 · Prepare safe test data

**Tools:** Excel, SQL. **Techniques:** Test data design, anonymisation, negative cases.

**Build:** Create normal, boundary, invalid and missing-data test records.

**Clear condition:** Use synthetic records only; include expected results and isolate destructive scenarios.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 60 · Boss 02: the evidence gate

**Tools:** SQL, Power BI, Slides. **Techniques:** Data + integration + test review.

**Build:** Demo the dashboard and integration contract; show the UAT plan and KPI reconciliation.

**Clear condition:** Supply cleaned data, SQL, dashboard screenshots, mapping and ten UAT cases; log all unresolved defects.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 61 · Run and triage

**Tools:** Excel or Jira. **Techniques:** Test execution, severity vs priority, defect lifecycle.

**Build:** Execute the ten UAT cases against your paper prototype or mock rules and log results.

**Clear condition:** Record actual vs expected, evidence and severity; label simulation clearly.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 62 · Recommend readiness

**Tools:** Docs, Excel. **Techniques:** RTM coverage, exit criteria, go/no-go.

**Build:** Calculate requirement-to-test coverage; create a release recommendation with residual risks.

**Clear condition:** Explain blocked vs failed vs passed tests; do not treat high coverage as proof of quality.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 63 · Dungeon 09: UAT command

**Tools:** Docs, Jira, Slides. **Techniques:** Defect triage, business sign-off.

**Build:** Host a mock UAT triage and write an evidence-based conditional go/no-go decision.

**Clear condition:** Include defect owners, business impact and sign-off criteria; no fabricated stakeholder approvals.

**Speaking drill:** Defend a test outcome: business risk, evidence, recommendation and decision owner.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 64 · Plan the change

**Tools:** Docs, Excel. **Techniques:** Change impact assessment, readiness.

**Build:** Map what changes for planners, carriers, warehouse operators and support.

**Clear condition:** For each group, document impact, readiness risk, training and support owner.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 65 · Write an operational SOP

**Tools:** Docs, screenshots. **Techniques:** SOP, exception escalation, handover.

**Build:** Write a delivery-change SOP with trigger, roles, steps, escalation and version control.

**Clear condition:** Someone unfamiliar with the design can follow the steps and find the escalation route.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 66 · Make training useful

**Tools:** Slides, voice recorder. **Techniques:** Role-based training, teach-back.

**Build:** Create a five-slide planner training pack and deliver a short demonstration.

**Clear condition:** Include one normal task and one recovery task; add three teach-back questions.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 67 · Select the automation

**Tools:** Power Automate or flow diagram. **Techniques:** Automation suitability, human-in-the-loop, controls.

**Build:** Design mailbox classification → capacity check → human approval → update → audit.

**Clear condition:** List permissions, error queue and manual fallback; keep live external actions disabled in practice.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 68 · Build a safe prototype

**Tools:** Power Automate sandbox or paper. **Techniques:** Flow triggers, conditions, approval routing.

**Build:** Build a mock flow using manual/sample input and route the decision to a test log.

**Clear condition:** Normal, rejection and malformed-input cases produce expected mock outcomes; no live booking updates.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 69 · Measure improvement

**Tools:** Excel, Docs. **Techniques:** A/B thinking, baseline, benefits realisation.

**Build:** Design a two-week pilot measurement plan for resolution time and manual touchpoints.

**Clear condition:** Define comparison group/time window, sample size caveat, guardrails and data owner.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 70 · Dungeon 10: adoption launch

**Tools:** Docs, Slides. **Techniques:** Readiness review, rollback, support model.

**Build:** Package SOP, training, pilot plan and a rollback decision tree.

**Clear condition:** Name launch owner, rollback triggers and support routes; separate expected from proven benefits.

**Speaking drill:** Teach the changed process with one normal example and one exception.

**Learn:** [Microsoft Learn · Power Automate](https://learn.microsoft.com/en-us/training/powerplatform/power-automate)

### Day 71 · Choose your capstone

**Tools:** Docs, whiteboard. **Techniques:** Opportunity framing, hypothesis, scope.

**Build:** Pick one end-to-end supply-chain BA case and write a one-page charter.

**Clear condition:** One clear decision, three measurable outcomes and a small enough scope to finish in two weeks.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 72 · Rebuild discovery independently

**Tools:** Docs, diagrams.net. **Techniques:** Stakeholder map, elicitation, process validation.

**Build:** Create a new stakeholder register and as-is process for the capstone without copying blindly.

**Clear condition:** Label assumptions and evidence gaps; include three questions that could change your design.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 73 · Design the solution options

**Tools:** Excel, Docs. **Techniques:** Options appraisal, cost-benefit, risk.

**Build:** Compare manual improvement, light automation and system enhancement.

**Clear condition:** Use explicit scoring weights, indicative costs and uncertainty; justify a recommendation.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 74 · Specify the capstone

**Tools:** Docs, Jira. **Techniques:** Requirements, story mapping, traceability.

**Build:** Create ten requirements, six stories and acceptance criteria for the selected option.

**Clear condition:** Each story traces to a need and test; version the scope and decision log.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 75 · Create the data evidence

**Tools:** SQL, Excel. **Techniques:** Data preparation, quality checks, analytical SQL.

**Build:** Use the synthetic shipment data or your own safe sample to answer three capstone questions.

**Clear condition:** Save reproducible queries and validation checks with dataset limitations.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 76 · Build the decision view

**Tools:** Power BI or Excel, diagrams.net. **Techniques:** Prototyping, KPI design, storytelling.

**Build:** Create a report or wireframe that supports the capstone decision.

**Clear condition:** Demonstrate three user questions and state what cannot be concluded from the sample.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 77 · Dungeon 11: architecture review

**Tools:** Docs, Slides. **Techniques:** Design review, risk assessment, peer critique.

**Build:** Review your charter, requirements, process, data and prototype as a coherent solution.

**Clear condition:** Resolve three inconsistencies and record why you accepted remaining risks.

**Speaking drill:** Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 78 · Test your capstone

**Tools:** Excel, Jira. **Techniques:** Risk-based UAT, defect triage.

**Build:** Execute eight capstone acceptance scenarios against the mock solution.

**Clear condition:** Store inputs, expected/actual results and evidence; trace every critical requirement.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 79 · Prepare the recommendation

**Tools:** Slides, Excel. **Techniques:** Executive narrative, options, decision request.

**Build:** Build five slides: problem, evidence, options, recommendation and next steps.

**Clear condition:** State one decision request with owner and date; include risks and uncertain assumptions.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 80 · Translate your experience

**Tools:** Docs, voice recorder. **Techniques:** STAR, evidence hierarchy, outcome framing.

**Build:** Draft three truthful BA interview stories from your operations and project experience.

**Clear condition:** Distinguish your action from team action; use only figures you can explain and defend.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 81 · Lead a difficult conversation

**Tools:** Voice recorder, Docs. **Techniques:** Conflict resolution, active listening, negotiation.

**Build:** Role-play a sponsor demanding auto-approval despite operational risk.

**Clear condition:** Acknowledge their goal, ask two probes, explain tradeoff and offer a controlled alternative.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 82 · Run a case interview

**Tools:** Docs, timer, whiteboard. **Techniques:** Structured problem solving, clarifying questions.

**Build:** Spend 30 minutes on a late-delivery case: clarify, structure, analyse and recommend.

**Clear condition:** State assumptions aloud; calculate one KPI correctly and explain a limitation.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 83 · Speak with impact

**Tools:** Voice recorder, slides. **Techniques:** Headline-first communication, pace, pauses.

**Build:** Record your capstone briefing twice; emphasise the headline and explicit ask.

**Clear condition:** Compare clarity, audible volume, pace and conclusion with Day 1; choose three improvements.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 84 · Dungeon 12: mock panel

**Tools:** Slides, voice recorder. **Techniques:** Case defence, stakeholder Q&A.

**Build:** Deliver a six-minute capstone demo and answer five challenging questions.

**Clear condition:** No unsupported impact claims; each answer gives a position, evidence and next action.

**Speaking drill:** Answer a challenge with a position, evidence and practical next step; record and review it.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 85 · Package the portfolio

**Tools:** GitHub, Markdown. **Techniques:** Portfolio storytelling, evidence organisation.

**Build:** Create a readme for each of three case packs with problem, role, artifacts and limits.

**Clear condition:** Remove confidential data and label all simulated projects; links open correctly.

**Speaking drill:** Deliver a confident headline first; pause, support it with evidence and finish with an ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 86 · Audit the weak spots

**Tools:** Excel, Docs. **Techniques:** Competency matrix, deliberate practice.

**Build:** Repeat Day 1’s six-skill self-assessment using artifacts as evidence.

**Clear condition:** Identify the two weakest skills and perform one focused correction for each.

**Speaking drill:** Deliver a confident headline first; pause, support it with evidence and finish with an ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 87 · Tailor your profile

**Tools:** Docs, GitHub. **Techniques:** Role mapping, CV evidence, skill matrix.

**Build:** Map your portfolio to three target BA role descriptions and refine four truthful CV bullets.

**Clear condition:** Every bullet supports a relevant requirement and avoids invented metrics or experience.

**Speaking drill:** Deliver a confident headline first; pause, support it with evidence and finish with an ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 88 · Rehearse the final raid

**Tools:** Slides, voice recorder. **Techniques:** Demo rehearsal, objection handling.

**Build:** Rehearse a ten-minute end-to-end walkthrough and prepare five likely objections.

**Clear condition:** Explain business need, process, requirements, data, tests and adoption in one connected story.

**Speaking drill:** Deliver a confident headline first; pause, support it with evidence and finish with an ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 89 · Prepare the next cycle

**Tools:** Docs, calendar. **Techniques:** Retrospective, learning backlog, sustainability.

**Build:** Review completed artifacts and set a realistic 30-day continuation plan.

**Clear condition:** Choose three priorities with observable success criteria; plan rest and maintenance.

**Speaking drill:** Deliver a confident headline first; pause, support it with evidence and finish with an ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

### Day 90 · Boss 03: BA ascension

**Tools:** Portfolio, Slides, voice recorder. **Techniques:** Evidence-based defence, solution evaluation.

**Build:** Ship three portfolio packs and record your final ten-minute BA case defence.

**Clear condition:** Compare to Day 1; verify traceability, calculations, test evidence and communication; document gaps honestly.

**Speaking drill:** Deliver a confident headline first; pause, support it with evidence and finish with an ask.

**Learn:** [IIBA · Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/)

## Practice-data notes

shipments.csv contains 124 synthetic rows: 120 base records, two exact repeated IDs and two additional records with repeated external references. The practice.sql view removes repeated shipment IDs, leaving 122 rows, and explicitly flags repeated business references. There are deliberate unmatched carriers, open deliveries and two deliveries dated before dispatch. Exclude open and invalid rows from delivery punctuality denominators. Decide and document how to treat unmatched carrier codes. Always reconcile the same rules in SQL, Excel and Power BI. SQL setup uses SQLite; Microsoft Learn examples use T-SQL.

## Storage and limitations

Your progress stays in this browser’s localStorage, without cloud sync. Clearing browser data deletes it. Export/import JSON to back up or transfer to another browser or site origin. The source code and hosting service do not store your personal completion data. A focus session is saved only when Log time is pressed.

Resource list checked 24 October 2026. Training resources may have their own paid/account restrictions. Enterprise SAP/Blue Yonder access is not required. This roadmap is an original learning design, not accreditation or a guarantee of employment.
