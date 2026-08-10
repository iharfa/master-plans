# Hulhumalé Master Plan Alignment

A self-contained web tool that checks alignment between the **Urban Development Framework**
(the overarching policy document) and the master plans that sit beneath it, and flags where
those documents need to change.

Live logic, no build step, no server required — open `index.html` or host on GitHub Pages.

## The document hierarchy

```
Urban Development Framework   ← 8 Policy Pillars · 33 Strategic Objectives · 133 Strategic Policy Directions
        │  (its 8 pillars map 1:1 onto ↓)
Urban Development Master Plan  ← the booklet / structural spine
        │  delivered through ↓
┌───────────┬───────────┬───────────┬───────────────────────────┐
│  Social   │ Transport │Environment│ Landscape / Garden Island │  ← the 4 sector plans (hold the actions)
└───────────┴───────────┴───────────┴───────────────────────────┘
```

Garden Island and the Landscape Development Masterplan are being merged into one document.

## Analysis versions

The curated findings are **versioned**. A toggle pinned to the top-right corner switches the
whole workbench between:

- **V1.0** (8 Jul 2026) — baseline analysis of the July 2026 drafts.
- **V1.2** (10 Aug 2026) — re-analysis of the August 2026 updated drafts (revised UDMP,
  Social, Transport and Landscape; the Framework re-issued as a Word draft; Environment
  unchanged).

Both datasets live in `data.js` (`*_V10` / `*_V12` + the `DATA_VERSIONS` registry); the choice
persists in `localStorage`.

## What it does

- **Document mind map** — a D3 horizontal collapsible tree (`d3.min.js` vendored locally).
  Branches: the **Urban Development Framework** (8 pillars → objectives, colour-coded by
  coverage; gap objectives flagged red with the fix; plan badges show which plans feed each
  pillar — the interlinkage), **The Plans**, the **Shared Foundation**, an **18-domain
  Overlap Map** (grouped by cluster + severity, each node carrying verbatim plan quotes and
  an alignment insight), and **Alignment Recommendations**. Click a node to expand and read
  the detail panel. Legend filters by status; drag to pan, scroll to zoom, and a
  **full-screen** toggle. Data lives in `MINDMAP` (`data.js`); the framework branch is
  generated live from `FRAMEWORK` + `GAPS`.
- **By document** — a per-document worklist: what's missing from each document, concrete
  additions with the exact section to edit, and the realignments it shares with its siblings.
- **Coverage matrix** — which plan owns or contributes to each framework pillar. Click a
  pillar row to expand the full list of delivering actions, colour-coded by source document
  and carrying each document's own action numbers (V1.2's `ACTIONS_V12` inventory, 267
  actions; V1.0 falls back to representative theme actions).
- **Gaps** — Strategic Policy Directions with no delivering action in any master plan, with the
  recommended fix and whether it needs resolving at the master-plan level.
- **Overlaps & realignment** — where plans duplicate or contradict each other, naming *which
  document to change* and how to split ownership.
- **Document integrity** — numbering errors, typos and missing cross-links in the sources.
- **Framework explorer** — browse all 8 pillars → objectives → policy directions with the
  contributing plans shown against each.
- **Upload & re-analyze** — drop in revised `.md` plans; the keyword coverage engine re-runs,
  diffs against the previous run, and **version-tracks** the result in your browser
  (`localStorage`). Export the whole report as JSON.

## Files

| file | role |
|------|------|
| `index.html` | side-rail workbench shell + the nine views |
| `data.js` | the framework, the plan crosswalk, the curated gap/overlap/integrity findings, and the per-document `DOC_ALIGN` worklist |
| `engine.js` | the reusable coverage engine + version tracking (runs on baseline *and* uploads) |
| `app.js` | rendering / interaction, incl. the D3 mind-map tree |
| `d3.min.js` | D3 v7 (vendored so the mind map works offline) |
| `styles.css` | Hallmark Workbench design system — Cobalt theme, Space Grotesk + Inter + JetBrains Mono, OKLCH tokens, light + dark |

## Updating the baseline

Edit `data.js`. The framework lives in `FRAMEWORK`, the plans in `PLANS`, and the findings in
`GAPS` / `OVERLAPS` / `INTEGRITY`. To refresh from source, re-read
`Urban Development Framework.xlsx` (sheet *Framework Objectives*) and the plan `.md` files.

## Deploy

Push to `main` and enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).

```
git remote add origin https://github.com/iharfa/master-plans.git
git push -u origin main
```

## Scope note

This is a **structural / textual** alignment aid — a decision-support prompt for HDC Planning,
not an engineering, legal, or policy sign-off. The keyword engine is intentionally simple and
transparent; the substantive findings are the human-curated Gaps and Overlaps.
