export const resources = {
 iiba:{name:'IIBA · Business Analysis Standard',url:'https://www.iiba.org/knowledgehub/the-business-analysis-standard/'},
 scrum:{name:'The official Scrum Guide',url:'https://scrumguides.org/download.html'},
 jira:{name:'Atlassian · Jira + Confluence',url:'https://support.atlassian.com/confluence-cloud/docs/use-jira-and-confluence-together/'},
 excel:{name:'Microsoft · Excel help & learning',url:'https://support.microsoft.com/en-us/excel'},
 sql:{name:'Microsoft Learn · Query with T-SQL',url:'https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/'},
 bi:{name:'Microsoft Learn · Power BI',url:'https://learn.microsoft.com/en-us/training/powerplatform/power-bi'},
 api:{name:'Postman · Send your first request',url:'https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/'},
 bpmn:{name:'OMG · BPMN specification',url:'https://www.omg.org/spec/BPMN/2.0/'},
 automate:{name:'Microsoft Learn · Power Automate',url:'https://learn.microsoft.com/en-us/training/powerplatform/power-automate'},
 sap:{name:'SAP Learning · Supply chain',url:'https://learning.sap.com/products/supply-chain-management'}
};
export const weeks = [
 ['Awakening','Frame a valuable problem','E','Problem brief','iiba'],
 ['The art of discovery','Understand people and processes','E','Discovery playbook','iiba'],
 ['Requirements forge','Turn needs into testable requirements','D','Requirements toolkit','iiba'],
 ['Agile command','Manage a delivery-ready backlog','D','Story & sprint kit','scrum'],
 ['The data gate','Make Excel analysis trustworthy','C','Excel QA checklist','excel'],
 ['Query labyrinth','Answer business questions with SQL','C','SQL investigation pack','sql'],
 ['Insight chamber','Build a decision-ready Power BI report','B','KPI dictionary','bi'],
 ['Integration bridge','Connect business rules to system contracts','B','Interface checklist','api'],
 ['Trial of quality','Prove the solution meets its purpose','A','UAT command pack','iiba'],
 ['Change catalyst','Plan adoption and safe automation','A','Change & SOP kit','automate'],
 ['The architect','Build your end-to-end capstone','A','Capstone blueprint','iiba'],
 ['Voice of the hunter','Communicate and defend your decisions','S','Stakeholder briefing kit','iiba'],
 ['Ascension','Ship the portfolio and defend the value','S','Portfolio launch kit','iiba']
];
// Every row is an authored daily assignment: title | tools | technique | practical output | acceptance check.
const rows = `
Your BA baseline|Docs, voice recorder|Skills assessment|Score yourself 1–5 in discovery, requirements, process, data, testing and communication; record a 90-second introduction.|Six scores with one real example each; keep the recording for Day 90.
Choose the right problem|Docs, Excel|Problem statement, SMART objectives|Frame a simulated dock-booking exception problem: who is affected, current pain, business impact and desired outcome.|One-page brief; separate known facts, assumptions and unmeasured baselines.
Draw the boundary|diagrams.net, Docs|Context diagram, in/out scope|Map suppliers, planners, warehouse, carrier and proposed exception service; write five scope exclusions.|At least five external actors, labelled data flows and an agreed problem boundary.
Map the stakeholders|Excel, Docs|Power–interest grid, RACI|Create an eight-person stakeholder register and RACI for approval, booking, escalation and reporting.|One accountable role per activity; communication preferences and decision rights captured.
Find the cause|diagrams.net, Excel|5 Whys, fishbone, hypothesis tree|Explore late delivery changes and define three testable root-cause hypotheses.|Distinguish symptom from cause; give evidence needed to test each hypothesis.
Define value|Excel, Docs|KPI definition, benefits hypothesis|Define on-time delivery, exception resolution time and slot utilisation with grain, numerator and denominator.|Three KPI definitions including owner, source, exclusions and baseline collection plan.
Dungeon 01: the problem brief|Docs, slides|Playback, peer review|Combine Days 1–6 into a concise discovery brief and deliver a three-minute stakeholder playback.|Scope, stakeholders, hypotheses and value measures are consistent; note three improvements.
Prepare your interviews|Docs, voice recorder|Semi-structured interview, funnel questions|Write ten open questions for a warehouse planner; add consent, timing and evidence prompts.|Questions avoid leading the witness and cover exceptions, workarounds and business rules.
Simulate an interview|Voice recorder, Docs|Active listening, probing, confirmation|Role-play planner and analyst; capture five needs and label all responses as simulated.|Separate quotes, interpretation and assumptions; confirm the five needs in a summary.
Plan a workshop|Slides, whiteboard|Facilitation, agenda, parking lot|Design a 45-minute discovery workshop with purpose, roles, activities and decisions.|Every agenda section has timing and an output; include a conflict and parking-lot plan.
Map today’s flow|diagrams.net|BPMN basics, swimlanes, SIPOC|Map the as-is dock exception flow with start/end events, decision gateways and handoffs.|Four lanes, two exception routes, owners and input/output definitions; no orphan steps.
Capture hidden rules|Excel, Docs|Observation, document analysis, decision table|Write rules for available capacity, carrier lateness, approval and escalation.|Decision table covers normal, boundary and invalid cases; flag assumptions for validation.
Design tomorrow’s flow|diagrams.net, Excel|To-be modelling, gap analysis|Create a to-be flow with human approval before booking changes and compare it with the as-is.|Each gap has an owner, proposed change and intended benefit; preserve an exception route.
Dungeon 02: discovery playback|Slides, voice recorder|Facilitation, confirmation, action log|Present as-is, to-be and unresolved questions in five slides; record a four-minute playback.|Ask for three explicit decisions and capture owner/date for each unresolved issue.
Separate requirements|Docs, Excel|Business, stakeholder, solution and transition requirements|Draft twelve requirements for the dock exception solution and classify each.|Each requirement has a unique ID, source, rationale and category.
Make them measurable|Docs|Atomicity, ambiguity review, verification|Rewrite six vague requirements into atomic testable statements.|Each rewritten requirement has observable success conditions and avoids undefined terms such as fast.
Write the BRD|Docs, Confluence or Markdown|Business requirements document|Build a lean BRD covering goals, scope, actors, assumptions, requirements and constraints.|Every requirement traces back to a business objective; include a version and approval log.
Model the user journey|diagrams.net, Docs|Use cases, alternate and exception flows|Write a Reschedule Delivery use case with preconditions, trigger, normal flow and failure routes.|Include no-capacity, approval-rejected and duplicate-request scenarios.
Specify quality attributes|Docs, Excel|Non-functional requirements, accessibility, privacy|Define response-time, availability, access, audit and usability requirements for the prototype.|Five measurable requirements with a verification method; targets are assumptions, not production promises.
Prioritise fairly|Excel|MoSCoW, weighted scoring, dependency analysis|Prioritise twelve requirements using business value, risk, effort and dependency notes.|Explain three tradeoffs and why each must-have is needed for the minimum viable outcome.
Dungeon 03: requirements review|Excel, Docs|Requirements traceability matrix, review|Create an RTM linking objectives → requirements → acceptance tests and resolve two conflicts.|No orphan requirement; all high-priority needs have an owner and test reference.
Learn delivery models|Docs, Scrum Guide|Agile, waterfall, Scrum, Kanban|Compare a fixed compliance change with evolving booking automation; choose an approach for each.|Explain uncertainty, governance and feedback needs; identify Scrum accountabilities correctly.
Build the backlog|Jira or spreadsheet, Confluence|Epics, user stories, INVEST|Create three epics and twelve user stories for the exception solution.|Each story has user, need and value; split stories that contain multiple independent outcomes.
Define acceptance|Jira or Markdown|Given–When–Then, examples, boundary testing|Write three acceptance scenarios each for booking approval, duplicate handling and capacity checking.|Positive, negative and boundary scenarios are unambiguous and observable.
Slice the work|Whiteboard, Jira|Story mapping, vertical slicing, MVP|Map the user journey and choose one thin end-to-end release.|MVP includes submission, validation, approval and feedback; defer low-value scope explicitly.
Plan a sprint|Jira or spreadsheet|Refinement, estimation, Definition of Ready/Done|Refine six stories and create a mock sprint with a Sprint Goal and capacity assumptions.|No committed story exceeds assumed capacity; Definition of Done includes testing and evidence.
Handle a change request|Docs, Excel|Impact analysis, change control, negotiation|Assess a new auto-approve request against privacy, risk, scope, cost and acceptance tests.|Give options, recommendation and approval owner; update RTM and backlog versions.
Dungeon 04: sprint simulation|Jira, Slides|Sprint review, retrospective|Walk through the board, demo two paper-prototype stories and run a start/stop/continue retrospective.|Explain a blocked story and a tradeoff; log one measurable improvement for the next sprint.
Sketch the experience|Figma or paper, diagrams.net|Low-fidelity wireframing, usability walkthrough|Draw an exception inbox, request detail and approval screen; annotate empty/error states.|A planner can identify status, owner and next action; capture three usability observations.
Boss 01: discovery to delivery|Docs, Slides, voice recorder|Decision briefing, baseline review|Assemble your discovery + requirements portfolio; record a five-minute sponsor briefing.|Include problem, BPMN, BRD, RTM, backlog and prototype; finish with a recommendation and decision request.
Inspect the data|Excel or LibreOffice|Data profiling, grain, source inventory|Open the provided synthetic shipments CSV; document row grain, columns, nulls and data types.|State that it is training data; identify duplicates before calculating KPIs.
Clean reproducibly|Excel Power Query|Type conversion, deduplication, null handling|Import shipments into Power Query and define repeatable cleaning steps.|Keep raw input intact; justify duplicate and missing-date rules in a transformation log.
Build useful formulas|Excel|XLOOKUP, IF, SUMIFS, COUNTIFS|Map carrier names and calculate delivered, late and exception counts by carrier.|Reconcile formulas to a small manual sample; define treatment of open shipments.
Summarise operations|Excel PivotTable|Pivot tables, segmentation, Pareto|Build carrier and warehouse pivots; use a Pareto view to prioritise exception reasons.|Counts reconcile to cleaned rows; conclusions include sample size and limitations.
Dungeon 05: spreadsheet control|Excel, Docs|Reconciliation, data validation, conditional formatting|Create a one-page operations tracker with inputs, calculations, checks and a user note.|Three reconciliation checks pass and invalid inputs are visibly flagged.
Define the data model|diagrams.net, SQL editor|ERD, keys, cardinality, normalisation|Model Shipment, Carrier, Warehouse and Exception with primary and foreign keys.|Declare grain and one-to-many relationships; avoid repeating carrier names on dimension rows.
Query your first table|SQL Server / SQLite|SELECT, WHERE, ORDER BY, NULL|Load the starter SQL in SQLite or adapt it to SQL Server; write six filter queries.|Predict row counts for two queries and confirm NULL uses IS NULL rather than equality.
Aggregate with care|SQL editor|GROUP BY, HAVING, COUNT, SUM, AVG|Calculate delivered counts, average transit time and late rate by carrier.|Exclude undelivered rows from delivery KPI denominators; show numerator and denominator.
Join without inflation|SQL editor|INNER JOIN, LEFT JOIN, join cardinality|Join shipments to carriers and warehouses and compare row counts before/after.|No unexplained increase in shipment rows; unmatched keys are reported separately.
Express business logic|SQL editor|CASE, COALESCE, date logic|Classify shipments as open, on-time or late and flag invalid delivery dates.|Five edge cases have expected outputs; use dialect-appropriate date functions.
Break a complex question down|SQL editor|CTE, subquery, readable SQL|Find carriers with a worse late rate than the network average using a CTE.|Explain grain at each step and verify the result on one carrier manually.
Dungeon 06: SQL investigation|SQL editor, Docs|Window functions, quality assertions|Rank carriers and identify duplicate external references using ROW_NUMBER; save eight reviewed queries.|Add comments with business question, denominator and limitation for every KPI query.
Connect and transform|Power BI Desktop or Excel fallback|Power Query, reproducible ETL|Load the synthetic data and carrier dimension into Power BI; apply documented cleaning rules.|Refresh succeeds; row counts match your Excel control totals.
Model for analysis|Power BI Desktop|Star schema, relationships, date table|Create fact shipments, carrier, warehouse and date dimensions with explicit relationship directions.|Keys are unique on dimension sides; distinguish dispatch date from delivery date.
Write measures|Power BI Desktop|DAX measures, CALCULATE, DIVIDE|Create Delivered, Late Deliveries, Late Rate and Open Shipments measures.|DIVIDE handles a zero denominator; totals match your SQL on the same cleaned data.
Design for a decision|Power BI Desktop, paper|KPI hierarchy, visual choice, accessibility|Build an overview with filters, trend, carrier comparison and exception detail.|Every visual answers a named stakeholder question; labels and colour do not mislead.
Analyse causes carefully|Power BI, Excel|Segmentation, cohort, correlation vs causation|Compare late rates across carrier, warehouse and service level.|Show denominators; distinguish an observed association from a verified cause.
Add drill-through|Power BI Desktop|Drill-through, tooltips, report usability|Add a carrier detail page and test filter interactions with three user tasks.|Users can answer the three tasks without changing the data; document reset instructions.
Dungeon 07: insight briefing|Power BI, Slides|Data storytelling, recommendation|Record a three-minute report walkthrough: finding, evidence, limitation, action.|Reconcile the report to SQL and Excel; make one recommendation without inventing business savings.
Trace the system landscape|diagrams.net, SAP Learning|System context, SAP TM/MM and TMS mapping|Draw a conceptual ERP → TMS → WMS landscape using only generic training examples.|Label master vs transactional data and system of record; do not imply access to live SAP or Blue Yonder.
Understand a contract|Postman, text editor|HTTP methods, JSON, request/response|Inspect a public practice request in Postman and write a mock delivery-change JSON contract.|Specify required fields, types, example values and expected success response.
Design failure behaviour|Postman, Docs|Status codes, validation, idempotency|Document duplicate, invalid capacity, unauthorised and unavailable-service outcomes.|Each failure has user feedback, retry guidance, logging and an owner.
Map source to target|Excel, Docs|Interface mapping, transformations, reference data|Map carrier code, delivery date, slot and warehouse across two mock systems.|Include source/target types, required flags, transformation and rejected-record handling.
Define governance|Docs, Excel|Master data stewardship, lineage, access|Create a carrier master ownership matrix and change/approval flow.|Every critical field has an owner, validation rule and audit requirement.
Protect integration quality|Docs, diagrams.net|Reconciliation, timeout, retry, audit trail|Design an integration checklist for missed events, duplicates and partial failures.|Specify how counts/totals reconcile and how a human can resolve failed messages.
Dungeon 08: integration review|Docs, Slides|Sequence diagram, contract review|Present a delivery change journey across mailbox, exception service, approver and TMS.|Show happy path plus timeout and rejection; align payloads with the source-to-target mapping.
Plan the test strategy|Docs, Excel|Test levels, risk-based testing|Define UAT scope, roles, environment, entry/exit criteria and test data needs.|Prioritise risks; distinguish system integration testing from business acceptance.
Write executable cases|Excel or Jira|Test design, equivalence classes, boundaries|Write ten UAT cases linked to requirements with steps, inputs and expected results.|Cover full slot, last available slot, invalid date, duplicate and rejected approval.
Prepare safe test data|Excel, SQL|Test data design, anonymisation, negative cases|Create normal, boundary, invalid and missing-data test records.|Use synthetic records only; include expected results and isolate destructive scenarios.
Boss 02: the evidence gate|SQL, Power BI, Slides|Data + integration + test review|Demo the dashboard and integration contract; show the UAT plan and KPI reconciliation.|Supply cleaned data, SQL, dashboard screenshots, mapping and ten UAT cases; log all unresolved defects.
Run and triage|Excel or Jira|Test execution, severity vs priority, defect lifecycle|Execute the ten UAT cases against your paper prototype or mock rules and log results.|Record actual vs expected, evidence and severity; label simulation clearly.
Recommend readiness|Docs, Excel|RTM coverage, exit criteria, go/no-go|Calculate requirement-to-test coverage; create a release recommendation with residual risks.|Explain blocked vs failed vs passed tests; do not treat high coverage as proof of quality.
Dungeon 09: UAT command|Docs, Jira, Slides|Defect triage, business sign-off|Host a mock UAT triage and write an evidence-based conditional go/no-go decision.|Include defect owners, business impact and sign-off criteria; no fabricated stakeholder approvals.
Plan the change|Docs, Excel|Change impact assessment, readiness|Map what changes for planners, carriers, warehouse operators and support.|For each group, document impact, readiness risk, training and support owner.
Write an operational SOP|Docs, screenshots|SOP, exception escalation, handover|Write a delivery-change SOP with trigger, roles, steps, escalation and version control.|Someone unfamiliar with the design can follow the steps and find the escalation route.
Make training useful|Slides, voice recorder|Role-based training, teach-back|Create a five-slide planner training pack and deliver a short demonstration.|Include one normal task and one recovery task; add three teach-back questions.
Select the automation|Power Automate or flow diagram|Automation suitability, human-in-the-loop, controls|Design mailbox classification → capacity check → human approval → update → audit.|List permissions, error queue and manual fallback; keep live external actions disabled in practice.
Build a safe prototype|Power Automate sandbox or paper|Flow triggers, conditions, approval routing|Build a mock flow using manual/sample input and route the decision to a test log.|Normal, rejection and malformed-input cases produce expected mock outcomes; no live booking updates.
Measure improvement|Excel, Docs|A/B thinking, baseline, benefits realisation|Design a two-week pilot measurement plan for resolution time and manual touchpoints.|Define comparison group/time window, sample size caveat, guardrails and data owner.
Dungeon 10: adoption launch|Docs, Slides|Readiness review, rollback, support model|Package SOP, training, pilot plan and a rollback decision tree.|Name launch owner, rollback triggers and support routes; separate expected from proven benefits.
Choose your capstone|Docs, whiteboard|Opportunity framing, hypothesis, scope|Pick one end-to-end supply-chain BA case and write a one-page charter.|One clear decision, three measurable outcomes and a small enough scope to finish in two weeks.
Rebuild discovery independently|Docs, diagrams.net|Stakeholder map, elicitation, process validation|Create a new stakeholder register and as-is process for the capstone without copying blindly.|Label assumptions and evidence gaps; include three questions that could change your design.
Design the solution options|Excel, Docs|Options appraisal, cost-benefit, risk|Compare manual improvement, light automation and system enhancement.|Use explicit scoring weights, indicative costs and uncertainty; justify a recommendation.
Specify the capstone|Docs, Jira|Requirements, story mapping, traceability|Create ten requirements, six stories and acceptance criteria for the selected option.|Each story traces to a need and test; version the scope and decision log.
Create the data evidence|SQL, Excel|Data preparation, quality checks, analytical SQL|Use the synthetic shipment data or your own safe sample to answer three capstone questions.|Save reproducible queries and validation checks with dataset limitations.
Build the decision view|Power BI or Excel, diagrams.net|Prototyping, KPI design, storytelling|Create a report or wireframe that supports the capstone decision.|Demonstrate three user questions and state what cannot be concluded from the sample.
Dungeon 11: architecture review|Docs, Slides|Design review, risk assessment, peer critique|Review your charter, requirements, process, data and prototype as a coherent solution.|Resolve three inconsistencies and record why you accepted remaining risks.
Test your capstone|Excel, Jira|Risk-based UAT, defect triage|Execute eight capstone acceptance scenarios against the mock solution.|Store inputs, expected/actual results and evidence; trace every critical requirement.
Prepare the recommendation|Slides, Excel|Executive narrative, options, decision request|Build five slides: problem, evidence, options, recommendation and next steps.|State one decision request with owner and date; include risks and uncertain assumptions.
Translate your experience|Docs, voice recorder|STAR, evidence hierarchy, outcome framing|Draft three truthful BA interview stories from your operations and project experience.|Distinguish your action from team action; use only figures you can explain and defend.
Lead a difficult conversation|Voice recorder, Docs|Conflict resolution, active listening, negotiation|Role-play a sponsor demanding auto-approval despite operational risk.|Acknowledge their goal, ask two probes, explain tradeoff and offer a controlled alternative.
Run a case interview|Docs, timer, whiteboard|Structured problem solving, clarifying questions|Spend 30 minutes on a late-delivery case: clarify, structure, analyse and recommend.|State assumptions aloud; calculate one KPI correctly and explain a limitation.
Speak with impact|Voice recorder, slides|Headline-first communication, pace, pauses|Record your capstone briefing twice; emphasise the headline and explicit ask.|Compare clarity, audible volume, pace and conclusion with Day 1; choose three improvements.
Dungeon 12: mock panel|Slides, voice recorder|Case defence, stakeholder Q&A|Deliver a six-minute capstone demo and answer five challenging questions.|No unsupported impact claims; each answer gives a position, evidence and next action.
Package the portfolio|GitHub, Markdown|Portfolio storytelling, evidence organisation|Create a readme for each of three case packs with problem, role, artifacts and limits.|Remove confidential data and label all simulated projects; links open correctly.
Audit the weak spots|Excel, Docs|Competency matrix, deliberate practice|Repeat Day 1’s six-skill self-assessment using artifacts as evidence.|Identify the two weakest skills and perform one focused correction for each.
Tailor your profile|Docs, GitHub|Role mapping, CV evidence, skill matrix|Map your portfolio to three target BA role descriptions and refine four truthful CV bullets.|Every bullet supports a relevant requirement and avoids invented metrics or experience.
Rehearse the final raid|Slides, voice recorder|Demo rehearsal, objection handling|Rehearse a ten-minute end-to-end walkthrough and prepare five likely objections.|Explain business need, process, requirements, data, tests and adoption in one connected story.
Prepare the next cycle|Docs, calendar|Retrospective, learning backlog, sustainability|Review completed artifacts and set a realistic 30-day continuation plan.|Choose three priorities with observable success criteria; plan rest and maintenance.
Boss 03: BA ascension|Portfolio, Slides, voice recorder|Evidence-based defence, solution evaluation|Ship three portfolio packs and record your final ten-minute BA case defence.|Compare to Day 1; verify traceability, calculations, test evidence and communication; document gaps honestly.
`.trim().split('\n');
const drills=[
 'Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.',
 'Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.',
 'Explain one requirement in plain language, then give its acceptance example and business value.',
 'Give a 60-second update: goal, progress, blocker, next step and one clear request.',
 'Explain one metric: definition, denominator, data limitation and operational implication.',
 'Walk through your query in plain language before discussing SQL syntax.',
 'Present one finding with evidence, limitation and a recommendation in two minutes.',
 'Explain the system flow to a warehouse planner without using unexplained technical terms.',
 'Defend a test outcome: business risk, evidence, recommendation and decision owner.',
 'Teach the changed process with one normal example and one exception.',
 'Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.',
 'Answer a challenge with a position, evidence and practical next step; record and review it.',
 'Deliver a confident headline first; pause, support it with evidence and finish with an ask.'
];
export const curriculum=rows.map((line,i)=>{
 const [title,tools,technique,task,acceptance]=line.split('|');const week=Math.min(12,Math.floor(i/7));
 return {day:i+1,week:week+1,phase:i<30?1:i<60?2:3,title,tools,technique,task,acceptance,drill:drills[week],resource:weeks[week][4],boss:[30,60,90].includes(i+1)};
});
export const dungeons=weeks.map((w,i)=>({id:'dungeon-'+(i+1),name:w[0],subtitle:w[1],rank:w[2],shadow:w[3],start:i*7+1,end:Math.min(90,(i+1)*7),xp:[120,120,180,180,240,240,320,320,420,420,420,550,550][i],gold:[35,35,50,50,65,65,85,85,110,110,110,140,140][i]}));
dungeons[12]={...dungeons[12],name:'The portfolio vault',subtitle:'Package your evidence and tailor your profile',end:87};
dungeons.push({id:'dungeon-14',name:'The final ascent',subtitle:'Rehearse, reflect and defend your complete BA portfolio',rank:'S',shadow:'Final defence kit',start:88,end:90,xp:550,gold:140});
export const bosses=[{id:'boss-30',day:30,name:'The Requirements Architect',xp:700,gold:180,artifact:'Discovery + requirements pack'},{id:'boss-60',day:60,name:'The Evidence Keeper',xp:1000,gold:250,artifact:'Data + integration + UAT pack'},{id:'boss-90',day:90,name:'The Business Analyst Monarch',xp:1600,gold:400,artifact:'Three portfolio packs + final defence'}];
export const shop=[{id:'break',name:'The quiet hour',desc:'One guilt-free hour of gaming or a favourite show.',cost:60,icon:'◷'},{id:'treat',name:'A small celebration',desc:'A favourite snack, café visit or another small treat.',cost:150,icon:'✦'},{id:'adventure',name:'Side quest',desc:'A film, hobby session or a relaxed afternoon out.',cost:300,icon:'◇'},{id:'gear',name:'New equipment',desc:'A book or learning accessory within your real budget.',cost:650,icon:'⌘'}];
export const shadows={
 'Problem brief':'# Problem brief\nContext:\nProblem and affected users:\nEvidence vs assumptions:\nObjectives and measures:\nScope / exclusions:\nDecision required:\nOwner / date:',
 'Discovery playbook':'# Discovery\nPurpose:\nStakeholders:\nOpen questions:\nObserved workflow:\nExceptions and rules:\nConfirmed needs:\nOpen issues / owner / date:',
 'Requirements toolkit':'ID | Type | Requirement | Source | Business objective | Priority | Acceptance test | Owner | Version\nREQ-001 | Functional | | | | | | |',
 'Story & sprint kit':'As a [user], I want [capability], so that [value].\nGiven [context], when [action], then [observable result].\nNegative / boundary examples:\nDependencies:\nDefinition of Done:',
 'Excel QA checklist':'1. Preserve raw source.\n2. Declare row grain.\n3. Profile types, nulls and duplicates.\n4. Document cleaning.\n5. Reconcile counts and totals.\n6. Verify denominators.\n7. Refresh and inspect errors.',
 'SQL investigation pack':'-- Declare the grain and question.\nSELECT carrier_id, COUNT(*) AS delivered,\n SUM(CASE WHEN delivered_date > promised_date THEN 1 ELSE 0 END) AS late\nFROM shipments\nWHERE delivered_date IS NOT NULL\nGROUP BY carrier_id;\n-- Reconcile against a manual sample before presenting.',
 'KPI dictionary':'Metric:\nBusiness decision:\nNumerator / denominator:\nGrain / period:\nInclusions / exclusions:\nSource / refresh:\nOwner:\nKnown limitations:',
 'Interface checklist':'Contract version:\nSource / target / owner:\nField mappings:\nValidation:\nAuth / access:\nDuplicate handling:\nTimeout / retry:\nRejected-record queue:\nReconciliation / audit:\nManual recovery:',
 'UAT command pack':'Case ID | Requirement | Risk | Preconditions | Test input | Steps | Expected | Actual | Status | Evidence | Defect | Owner\nEntry criteria:\nExit criteria:\nResidual risks:\nDecision / approver:',
 'Change & SOP kit':'Process / version / owner:\nTrigger / preconditions:\nSteps and roles:\nException / escalation:\nTraining / support:\nPilot measures:\nRollback triggers:\nApproval / review date:',
 'Capstone blueprint':'Problem → Evidence → Options → Recommendation\nStakeholders / scope:\nAs-is / to-be:\nRequirements / stories:\nData / model / report:\nTests / defects:\nAdoption / measures:\nAssumptions / limits:',
 'Stakeholder briefing kit':'Headline recommendation:\nWhy it matters:\nEvidence:\nOptions and tradeoffs:\nRisks / uncertainty:\nDecision requested:\nOwner / next step / date:',
 'Portfolio launch kit':'# Case study\nSimulation or real work:\nProblem and context:\nMy role:\nApproach / decisions:\nArtifacts and evidence:\nResults (verified only):\nLimitations:\nWhat I would do next:',
 'Final defence kit':'# Final BA defence\nHeadline recommendation:\nBusiness need and scope:\nEvidence and limitations:\nProcess and requirements traceability:\nData checks and acceptance results:\nOptions and tradeoffs:\nAdoption and measurement plan:\nFive likely objections and responses:\nDecision request and next step:'
};
