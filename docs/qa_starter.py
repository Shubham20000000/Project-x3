"""General BA data-quality starter. Python standard library only.
Save beside service_requests.csv and practice_checks.json; run python qa_starter.py.
All inputs are fictional. Assertions verify the intentionally imperfect fixture.
"""
import csv, json
from pathlib import Path
from collections import Counter
from datetime import date
folder = Path(__file__).resolve().parent
with (folder / "service_requests.csv").open(encoding="utf-8-sig", newline="") as handle:
    raw = list(csv.DictReader(handle))
unique = {}
for row in raw:
    unique.setdefault(row["request_id"], row)
rows = list(unique.values())
for row in rows:
    for field in ("created_date", "due_date", "resolved_date"):
        if row[field]: date.fromisoformat(row[field])
eligible = [r for r in rows if r["resolved_date"] and r["resolved_date"] >= r["created_date"]]
checks = {
    "raw_rows": len(raw), "unique_request_ids": len(rows),
    "removed_duplicate_ids": len(raw) - len(rows),
    "open_requests": sum(not r["resolved_date"] for r in rows),
    "invalid_resolutions": sum(bool(r["resolved_date"]) and r["resolved_date"] < r["created_date"] for r in rows),
    "eligible_resolutions": len(eligible),
    "late_eligible_resolutions": sum(r["resolved_date"] > r["due_date"] for r in eligible),
    "unknown_team_keys": sum(r["team_id"] not in {"T01","T02","T03","T04"} for r in rows),
    "status_conflicts": sum((r["status"] == "Closed") != bool(r["resolved_date"]) for r in rows),
}
expected = json.loads((folder / "practice_checks.json").read_text())
assert checks == expected, f"Reconciliation failed: {checks} vs {expected}"
references = Counter(r["external_ref"] for r in rows)
print(json.dumps(checks, indent=2))
print("Repeated references:", {k:n for k,n in references.items() if n>1})
print("PASS: controls reconcile; anomalies remain visible for investigation.")
# Extension: reproduce these checks in pandas/SQL; compare eligibility and grain.
