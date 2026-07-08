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

## What it does

- **Document network** — an expandable force-directed graph. The Framework's 8 policy
  pillars form the backbone; every plan's **themes feed the pillars**, so two plans that
  touch the same pillar are interlinked through it. Click a plan to fan out its **themes**,
  click a theme to fan out its **actions**. Dashed edges mark cross-plan overlaps
  (realignment). Hover a pillar to list every theme feeding it across all plans; hover a
  theme to see the pillars it feeds and its actions.
- **By document** — a per-document worklist: what's missing from each document, concrete
  additions with the exact section to edit, and the realignments it shares with its siblings.
- **Coverage matrix** — which plan owns or contributes to each framework pillar.
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
| `app.js` | rendering / interaction, incl. the SVG network diagram |
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
