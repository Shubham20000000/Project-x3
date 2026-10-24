# SYSTEM / Business Analyst Ascension

An interactive 90-day Business Analyst learning app with 14 dungeons, three milestone reviews and animated vector graphics.

## Features

- Daily learning tasks, practical outputs, acceptance checks and speaking exercises.
- Requirements, process modelling, Agile, Excel, SQL, Power BI, integrations, testing and change management.
- XP, levels, ranks, stats, recovery tasks, virtual gold, reward inventory and reusable templates.
- Animated portal artwork, rotating rune graphics, a dungeon map, reward particles and level-up effects.
- A reduced-motion setting and support for the device's accessibility preference.
- Synthetic practice data, SQL examples, an object schema, formulas and a complete system guide.
- Local progress storage and JSON backup export/import.

## Run locally

```sh
python -m http.server 8080 --directory docs
node --test tests/*.test.mjs
```

No install, backend, API keys or sign-in is required. The website is a static app in the `docs` folder.

## GitHub Pages

In repository Settings → Pages, choose Deploy from a branch → main → /docs → Save. The `.nojekyll` file is included.

## Progress and dates

Progress stays in this browser. Export a JSON backup to transfer it to another device. Midnight checks use Asia/Kolkata: checks run while the app is open and catch up on the next visit. The focus timer saves time when Log time is pressed. A closed static website cannot execute background jobs.

The SQL schema is a reference for a future server database. No external accounts or automations are connected. All practice records are synthetic. Virtual rewards are not financial transactions.

The curriculum is educational and does not confer a professional qualification or guarantee employment.
