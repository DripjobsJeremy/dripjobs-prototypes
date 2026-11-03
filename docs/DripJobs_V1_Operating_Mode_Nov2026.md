# DripJobs V1 Operating Mode (Nov 2026)

Effective: Tuesday, November 3, 2026 (immediately, until otherwise directed)
Owner: Jeremy Harrison, PM
Applies to: DripJobs | Product Management, UX/UI, QA, Delivery Orchestrator, Copywriter

---

## 1. The decision

> V1 story is we still tackle small improvements that help and maintain the app while v2 is done no major tickets after thumbtack and business entity.
> (Jesus Rubio, Tue Nov 3 2026)

Business Entity Records (V1) and Add Thumbtack direct integration continue to completion. All other work from this date forward follows this document.

---

## 2. Team and ownership

| Person | Role in this mode |
|---|---|
| TJ (Terry Bennett) | Sole V1 developer: bugs and approved enhancements. Treat V1 capacity as one developer. |
| Nate Wallin | Technical Lead Manager. Owns V1 technical feasibility and code review. All V1 DECISION REQUIRED items route to Nate. |
| Ali Raza | Moves to the V2 team once Business Entity Records (V1) is complete. No new V1 work routes to Ali. |
| Jesus Rubio | Project Manager, now also V2 Project Manager. Bridges V1 and V2. Makes initial scope calls with Jeremy and decides any pause or gate on in flight work. |
| Jason (CTO) | Owns V2. Technical questions route to Jason only for explicitly V2 scope work. |
| Jeremy Harrison and Laura Cuadros | Own V1 product side. Laura started as Junior PM on Nov 2, 2026, under these guidelines from day one. |

---

## 3. V1 Intake Gate

Every new enhancement is placed in one lane before any ticket is drafted.

| Lane | Accepts |
|---|---|
| Bug | Any reproducible broken or regressed behavior |
| Maintenance | Small improvements that help and maintain the app |
| Approved Exception | Job Costing enhancements, Invoice Reminders, Color Chart |
| V2 Candidate | Everything else. Not ticketed as V1 work. |

### Who decides
"Low lift" is a judgment call, not a fixed threshold.
1. Jeremy and Jesus make the initial call based on need.
2. Nate has final say on anything that pushes the boundary. Tanner or Jason weigh in if needed.
3. The same path applies to approving any exception beyond the three named above.

### Product side signals that an item may not be low lift
New module or screen, new integration, new outbound communication type, pricing logic changes, or a change spanning multiple workflows. These signals prompt the decision path above; they do not decide it.

### In flight work
Any ticket already in the ClickUp DripJobs Development V1 space (Ready for Dev, QA Kickback, PR Created, Testing Ready, Testing Complete, or similar) stays in play and is completed, unless Jesus decides to pause or gate it.

### V2 Candidates in ClickUp
Tag with the blue "v2 candidate" tag. Keep the 🎯 tag so the ticket stays in reporting and on the Roadmap. The Model field is not changed; the tag alone carries the meaning. Do not draft a V1 ticket. Log a one line rationale for why it did not pass the gate.

### Roadmap lane tags (ClickUp, Product Management space)
The Prototype Hub Roadmap assigns lanes in this order:
1. Ticket is in the DripJobs Development V1 space: In Flight (no tag needed)
2. `v2 candidate`: V2 Candidate
3. `lane: exception`: V1 Approved Exception
4. `lane: maintenance`, or Type = Bug: V1 Maintenance
5. `lane: gate`: Gate Decision Needed
6. `lane: v2 prep`: V2 Prep
7. 🎯 with none of the above: Unassigned (needs a lane)

The old `v1` and `v2` tags are retired for roadmap purposes.

### Stripe Epic
Reframed as future V2 integration enhancements. Model = V2, engineering owner = Jason.

---

## 4. V2 Alignment Check (standing rule)

Required on every enhancement and bug ticket, next to the Communications Impact Check. Document:
- V2 equivalent: Exists / Partial / Not seen / Unknown
- Divergence risk: does this V1 change introduce behavior, terminology, or data V2 handles differently?
- V2 insight: is there a V2 pattern worth mirroring in V1?

If nothing applies: "No V2 alignment concerns identified."

V2 alignment questions that need a V2 answer route to Jesus (V2 PM) for product questions and Jason for technical ones.

---

## 5. Using the V2 Functionality Audit

DripJobs_V2_Functionality_Audit.md (Nov 2, 2026) is a high level, read only pass on the V2 test environment, run without codebase access. Features are incomplete and may change.

Rules:
1. Cite every audit claim as ⚠️ Unverified.
2. Never treat it as confirmed V2 behavior or as a source of truth.
3. Never promise, name, or imply V2 functionality in customer facing copy until there is an official announcement.
4. When the audit is refreshed, replace the file and log the date here.

---

## 6. Revision Log

> Nov 3, 2026 | Section 3 | V2 Candidate tag renamed to "v2 candidate", 🎯 retained, lane tags and precedence added | Decided by Jeremy Harrison
> Nov 3, 2026 | All sections | Initial version: V1 operating mode, intake gate, decision path, in flight rule, V2 tag, V2 Alignment Check | Decided by Jesus Rubio and Jeremy Harrison
