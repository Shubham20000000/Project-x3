import {professionalRows} from './professional.js?v=2.0';
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
 diagrams:{name:'diagrams.net · modelling documentation',url:'https://www.diagrams.net/doc/'},
 python:{name:'Python · official tutorial',url:'https://docs.python.org/3/tutorial/'},
 api_contract:{name:'OpenAPI specification',url:'https://spec.openapis.org/oas/latest.html'},
 ux:{name:'Penpot · user guide',url:'https://help.penpot.app/user-guide/'}
};
export const weeks = [
 ['Strategic awakening','Frame value, options and the analysis approach','E','Problem brief','iiba'],
 ['The discovery chamber','Elicit, triangulate and defend stakeholder needs','E','Discovery playbook','iiba'],
 ['The requirements forge','Specify, prioritise, baseline and trace requirements','D','Requirements toolkit','iiba'],
 ['The solution architect','Model processes, information, behaviour and UX','D','Solution model review kit','bpmn'],
 ['The delivery command','Plan, govern and evaluate iterative delivery','C','Agile delivery kit','jira'],
 ['The query labyrinth','Model, clean and query data with controls','C','SQL investigation pack','sql'],
 ['The insight chamber','Master analytical SQL and validated BI','B','KPI dictionary','bi'],
 ['The integration bridge','Specify contracts, governance and automation','B','Interface checklist','api'],
 ['The trial of quality','Design tests, triage defects and defend readiness','A','UAT command pack','iiba'],
 ['The change catalyst','Plan adoption, release, controls and benefits','A','Change & SOP kit','automate'],
 ['The independent architect','Build a complete general BA capstone','A','Capstone blueprint','iiba'],
 ['The professional defence','Communicate, challenge and defend your evidence','S','Stakeholder briefing kit','iiba'],
 ['The final ascension','Publish reproducible work and close skill gaps','S','Portfolio launch kit','iiba']
];
const drills=[
 'Explain the business problem in 60 seconds: headline, who is affected, evidence needed, decision.',
 'Give a 90-second playback: what you heard, what is uncertain, and what you need confirmed.',
 'Explain one requirement in plain language, then give its acceptance example and business value.',
 'Give a 60-second update: goal, progress, blocker, next step and one clear request.',
 'Explain one metric: definition, denominator, data limitation and operational implication.',
 'Walk through your query in plain language before discussing SQL syntax.',
 'Present one finding with evidence, limitation and a recommendation in two minutes.',
 'Explain the system flow to a non-technical service user without unexplained technical terms.',
 'Defend a test outcome: business risk, evidence, recommendation and decision owner.',
 'Teach the changed process with one normal example and one exception.',
 'Pitch your chosen option: problem, evidence, alternatives, risk and explicit ask.',
 'Answer a challenge with a position, evidence and practical next step; record and review it.',
 'Deliver a confident headline first; pause, support it with evidence and finish with an ask.'
];
const resourceOverrides={22:'bpmn',23:'diagrams',24:'diagrams',26:'ux',29:'scrum',31:'jira',32:'scrum',33:'jira',34:'jira',35:'jira',36:'excel',37:'excel',38:'excel',39:'sql',40:'sql',41:'sql',42:'sql',43:'sql',44:'sql',45:'sql',46:'bi',47:'bi',48:'bi',49:'bi',50:'diagrams',51:'api',52:'api_contract',53:'iiba',54:'iiba',55:'python',56:'api',68:'automate'};
export const curriculum=professionalRows.map((assignment,i)=>{
 const week=Math.min(12,Math.floor(i/7));
 return {...assignment,day:i+1,week:week+1,phase:i<30?1:i<60?2:3,drill:drills[week],resource:resourceOverrides[i+1]||weeks[week][4],boss:[30,60,90].includes(i+1)};
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
 'Solution model review kit':'# Solution model review\nObjective and scope:\nProcess actors, triggers and exceptions:\nStates and permitted transitions:\nSequence / API / data contract:\nData grain and keys:\nUI validation and accessibility:\nCross-model inconsistencies:\nTradeoffs / decisions / owners:',
 'Agile delivery kit':'# Agile delivery\nGoal and value hypothesis:\nEpics and vertically sliced stories:\nAcceptance examples and dependencies:\nRefinement / estimates / capacity:\nDefinition of Ready / Done:\nWIP and flow measures:\nRelease risks and decision log:\nReview and improvement:',
 'Story & sprint kit':'As a [user], I want [capability], so that [value].\nGiven [context], when [action], then [observable result].\nNegative / boundary examples:\nDependencies:\nDefinition of Done:',
 'Excel QA checklist':'1. Preserve raw source.\n2. Declare row grain.\n3. Profile types, nulls and duplicates.\n4. Document cleaning.\n5. Reconcile counts and totals.\n6. Verify denominators.\n7. Refresh and inspect errors.',
 'SQL investigation pack':'-- Declare the grain and question.\nSELECT team_id, COUNT(*) AS eligible_resolutions,\n SUM(CASE WHEN resolved_date > due_date THEN 1 ELSE 0 END) AS late\nFROM requests\nWHERE resolved_date IS NOT NULL AND resolved_date >= created_date\nGROUP BY team_id;\n-- Reconcile against a manual sample before presenting.',
 'KPI dictionary':'Metric:\nBusiness decision:\nNumerator / denominator:\nGrain / period:\nInclusions / exclusions:\nSource / refresh:\nOwner:\nKnown limitations:',
 'Interface checklist':'Contract version:\nSource / target / owner:\nField mappings:\nValidation:\nAuth / access:\nDuplicate handling:\nTimeout / retry:\nRejected-record queue:\nReconciliation / audit:\nManual recovery:',
 'UAT command pack':'Case ID | Requirement | Risk | Preconditions | Test input | Steps | Expected | Actual | Status | Evidence | Defect | Owner\nEntry criteria:\nExit criteria:\nResidual risks:\nDecision / approver:',
 'Change & SOP kit':'Process / version / owner:\nTrigger / preconditions:\nSteps and roles:\nException / escalation:\nTraining / support:\nPilot measures:\nRollback triggers:\nApproval / review date:',
 'Capstone blueprint':'Problem → Evidence → Options → Recommendation\nStakeholders / scope:\nAs-is / to-be:\nRequirements / stories:\nData / model / report:\nTests / defects:\nAdoption / measures:\nAssumptions / limits:',
 'Stakeholder briefing kit':'Headline recommendation:\nWhy it matters:\nEvidence:\nOptions and tradeoffs:\nRisks / uncertainty:\nDecision requested:\nOwner / next step / date:',
 'Portfolio launch kit':'# Case study\nSimulation or real work:\nProblem and context:\nMy role:\nApproach / decisions:\nArtifacts and evidence:\nResults (verified only):\nLimitations:\nWhat I would do next:',
 'Final defence kit':'# Final BA defence\nHeadline recommendation:\nBusiness need and scope:\nEvidence and limitations:\nProcess and requirements traceability:\nData checks and acceptance results:\nOptions and tradeoffs:\nAdoption and measurement plan:\nFive likely objections and responses:\nDecision request and next step:'
};
