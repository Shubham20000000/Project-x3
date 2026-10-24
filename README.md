# SYSTEM / General Professional Business Analyst Track

A rigorous, general-purpose 90-day Business Analyst curriculum with practical PC labs, 14 dungeons, three evidence gates and animated RPG progression. No employment history or specialist industry access is assumed.

## Professional scope

- 16 competency areas: foundations/governance; strategy/business architecture; financial/decision analysis; stakeholders/elicitation; requirements; process/visual modelling; UX/product discovery; Agile delivery; Excel/data quality/statistics; SQL/relational design; Power BI; systems/APIs/governance; Python/AI/automation; testing; change/release/benefits; communication/professional judgement.
- 90 distinct assignments, each with tools, techniques, three PC steps, acceptance checks, speaking practice and an advanced extension.
- A Skill Atlas maps topics to practice days and evidence. The PC Lab gives official tool/setup links, alternatives and downloadable fixtures.
- Full-depth work is designed around 180 minutes/day. A smaller budget splits the same lab across sessions; it does not reduce its quality checks.
- Practice uses fictional service-request, e-commerce, booking and portal scenarios.

## PC practice pack

`docs/service_requests.csv`, `teams.csv`, `categories.csv`, `practice.sql`, `practice_checks.json` and `qa_starter.py` support reproducible Excel, SQL, BI and Python exercises. The fixture has 185 raw rows and 182 unique request IDs with deliberate quality anomalies.

`PC_SETUP.md`, `COMPETENCY_MAP.md`, `roadmap.csv` and `SYSTEM_GUIDE.md` describe the complete professional programme. The Python starter uses only the standard library. External tool/account/licence availability varies; documented alternatives preserve the exercise outputs.

## Run and verify

```sh
python -m http.server 8080 --directory docs
node --test tests/*.test.mjs
node scripts/generate-content.mjs
python docs/qa_starter.py
```

The static website requires no framework install, backend, API key or sign-in. GitHub Pages publishes `main` / `docs`. Editable role labels do not personalise the curriculum.

## Game mechanics

Unique-key XP/gold ledger; progressive level curve; five attributes; HP/fatigue; daily habits; recovery reviews; virtual shop/inventory; shadow templates; motion/reduced-motion settings. All daily and raid rewards give a maximum 24,130 planned XP.

Progress stays in browser localStorage. Export/import JSON backups to transfer devices. Midnight checks use Asia/Kolkata and catch up on the next visit. A closed static page cannot run background jobs. Curriculum updates preserve completion history; revised artifact quality still needs review.

The website tracks evidence but does not install or operate tools on the user's PC. All supplied records are fictional. Virtual shop actions are not real payments. The SQL schema is a future-backend reference. This programme is practice, not a qualification or guarantee of employment.
