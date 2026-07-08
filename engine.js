/* =============================================================================
   Alignment engine — the reusable logic.
   Computes objective-level coverage of the framework by the plans, using a
   transparent keyword matcher. The SAME function scores the baseline plan text
   and any uploaded .md, so re-analysis after upload is consistent and diffable.
   ========================================================================== */

/* Count how many distinct signal phrases of `kws` appear in `text`. */
function keywordHits(text, kws){
  let n=0; const found=[]; for(const k of kws){ if(text.indexOf(k.toLowerCase())!==-1){n++;found.push(k);} } return {n,found};
}
const GAP_SIGNAL_MIN = 1;  // >=1 distinctive signal phrase in any plan closes a gap

/* Build a searchable text blob for a baseline plan from its embedded structure.
   Uses only the plan's real theme titles + action text — NO framework keyword
   injection — so the engine genuinely discriminates and upload deltas are real. */
function planBaselineText(plan){
  let t = plan.name + " " + (plan.note||"") + " ";
  for(const th of plan.themes){
    t += th.title + " ";
    if(th.actions) t += th.actions.join(" ") + " ";
  }
  return t.toLowerCase();
}

/* Core analysis: docs = { planId: lowercased fullText }.
   Re-checks the curated coverage gaps against the (baseline or uploaded) plan
   text. A gap is "closed" once a plan contains its distinctive signal phrases.
   Coverage score = (all objectives − still-open gaps) / all objectives. */
function analyze(docs){
  const perPlanBlob = docs;                                   // {planId:text}
  const blob = Object.values(docs).join("  \n  ");
  const gapStatus = GAPS.map(g=>{
    const hit = keywordHits(blob, g.signals||[]);
    // which plan(s) the signal now appears in (helps show who closed it)
    const inPlans = Object.entries(perPlanBlob)
      .filter(([id,t])=>(g.signals||[]).some(s=>t.indexOf(s.toLowerCase())!==-1))
      .map(([id])=>id);
    return { spd:g.spd, obj:g.spd.split('.').slice(0,2).join('.'), pillar:g.pillar, sev:g.sev,
             closed: hit.n>=GAP_SIGNAL_MIN, matched:hit.found, inPlans };
  });
  const openGaps  = gapStatus.filter(g=>!g.closed);
  const closedGaps= gapStatus.filter(g=>g.closed);
  const totalObj  = FRAMEWORK.reduce((n,p)=>n+p.objectives.length,0);
  const covered   = totalObj - openGaps.length;
  return { gapStatus, openGaps, closedGaps, total:totalObj, covered,
           score: Math.round(100*covered/totalObj) };
}

/* Baseline: build texts from embedded plan structure and analyze. */
function baselineDocs(){
  const d={}; for(const p of PLANS) d[p.id]=planBaselineText(p); return d;
}

/* Given an uploaded file (name + text), guess which plan it updates. */
function matchPlan(filename){
  const n=filename.toLowerCase();
  for(const p of PLANS){
    if(p.file && n.indexOf(p.file.toLowerCase())!==-1) return p.id;
    if(p.altFile && n.indexOf(p.altFile.toLowerCase())!==-1) return p.id;
  }
  // fallback: keyword in filename
  if(/social/.test(n))return"SMP"; if(/transport|mobility/.test(n))return"HTMP";
  if(/environ/.test(n))return"EMP"; if(/landscape|garden/.test(n))return"LDS";
  if(/urban.*(framework|master)/.test(n))return"UDMP";
  return null;
}

/* -------- Version tracking (localStorage) -------- */
const Versions = {
  KEY:"mp_align_versions_v1",
  all(){ try{return JSON.parse(localStorage.getItem(this.KEY))||[];}catch(e){return[];} },
  save(entry){ const a=this.all(); a.push(entry); localStorage.setItem(this.KEY, JSON.stringify(a)); return a.length-1; },
  clear(){ localStorage.removeItem(this.KEY); },
  /* diff two analysis results -> which gaps closed / reopened */
  diff(prev, curr){
    const prevOpen=new Set(prev.openGaps.map(g=>g.obj));
    const currOpen=new Set(curr.openGaps.map(g=>g.obj));
    const closed=[...prevOpen].filter(x=>!currOpen.has(x));  // gap resolved by the edit = good
    const opened=[...currOpen].filter(x=>!prevOpen.has(x));  // regression
    const scoreDelta = curr.score - prev.score;
    return {closed, opened, scoreDelta};
  }
};

if (typeof module!=="undefined") module.exports={analyze,baselineDocs,matchPlan,planBaselineText,Versions,keywordHits,GAP_SIGNAL_MIN};
