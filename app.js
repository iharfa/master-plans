/* =============================================================================
   UI layer. Renders the framework↔plan crosswalk, gaps, overlaps, integrity,
   framework explorer, and the upload/version workflow.
   ========================================================================== */

const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const el = (t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
const planById = id => PLANS.find(p=>p.id===id);
const sevOrder = {high:0,med:1,low:2};

/* live analysis state (engine): used ONLY for the upload / version workflow */
let CURRENT_TEXTS = baselineDocs();
let CURRENT = analyze(CURRENT_TEXTS);
const uploaded = {}; // planId -> {filename, text}

/* ---------- CURATED crosswalk (authoritative for matrix/gaps/explorer) ------
   Pillar-level plan contribution from PLANS + objective-level gap flags from GAPS. */
const CURATED = (() => {
  const gapObj = new Set(GAPS.map(g=>g.spd.split('.').slice(0,2).join('.')));
  const pillar = {}; // pid -> {primary:Set, secondary:Set}
  for(const p of FRAMEWORK) pillar[p.id]={primary:new Set(),secondary:new Set()};
  for(const pl of PLANS) for(const th of pl.themes){
    (th.pillars.primary||[]).forEach(pid=>pillar[pid]?.primary.add(pl.id));
    (th.pillars.secondary||[]).concat(th.pillars.touch||[]).forEach(pid=>pillar[pid]?.secondary.add(pl.id));
  }
  // objective coverage
  const objCov={}; let total=0, covered=0;
  const pillarCov={};
  for(const p of FRAMEWORK){
    let pc=0;
    for(const o of p.objectives){
      total++;
      const isGap=gapObj.has(o.id);
      const contributors = isGap? [] : [...pillar[p.id].primary, ...pillar[p.id].secondary];
      objCov[o.id]={gap:isGap, primary:[...pillar[p.id].primary], secondary:[...pillar[p.id].secondary], contributors};
      if(!isGap){covered++;pc++;}
    }
    pillarCov[p.id]={covered:pc,total:p.objectives.length,
      primary:[...pillar[p.id].primary],secondary:[...pillar[p.id].secondary]};
  }
  return {gapObj, pillar, objCov, pillarCov, total, covered, score:Math.round(100*covered/total)};
})();

/* ---------- theme toggle ---------- */
function initTheme(){
  const saved = localStorage.getItem('mp_theme');
  if(saved) document.documentElement.setAttribute('data-theme',saved);
  $('#themebtn').onclick=()=>{
    const cur = document.documentElement.getAttribute('data-theme')
      || (matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
    const next = cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('mp_theme',next);
  };
}

/* ---------- hierarchy diagram ---------- */
function renderHierarchy(){
  const h=$('#hier');
  const sectors = PLANS.filter(p=>p.tier==='sector');
  h.innerHTML=`
    <div class="row"><div class="node fw"><span class="k">Overarching</span>Urban Development Framework<br><small style="font-weight:500;color:var(--muted)">8 Pillars · ${CURATED.total} Objectives · ${SPD_INDEX.list.length} Policy Directions</small></div></div>
    <div class="conn">↓ sets policy for</div>
    <div class="row"><div class="node um"><span class="k">Tier 2</span>Urban Development Master Plan</div></div>
    <div class="conn">↓ delivered through</div>
    <div class="row">${sectors.map(p=>`<div class="node sector" style="--pc:${p.colour}"><span class="k">Sector plan</span>${p.short}</div>`).join('')}</div>`;
}

/* ---------- KPI stats ---------- */
function renderStats(){
  const gapsHi = GAPS.filter(g=>g.sev==='high').length;
  const s=$('#stats');
  s.innerHTML=`
    <div class="stat ok"><div class="n">${CURATED.score}%</div><div class="l">Framework objectives with a contributing plan (${CURATED.covered}/${CURATED.total})</div></div>
    <div class="stat hi"><div class="n">${GAPS.length}</div><div class="l">Flagged coverage gaps (${gapsHi} high priority)</div></div>
    <div class="stat med"><div class="n">${OVERLAPS.length}</div><div class="l">Overlaps needing textual realignment</div></div>
    <div class="stat"><div class="n">${INTEGRITY.length}</div><div class="l">Document integrity issues to fix</div></div>`;
}

/* ---------- coverage matrix (pillars × plans) ---------- */
function renderMatrix(){
  const wrap=$('#matrix'); const plans=PLANS;
  let head=`<tr><th class="pillar">Policy Pillar</th>`+plans.map(p=>`<th style="text-align:center">${p.short}</th>`).join('')+`<th style="text-align:center">Coverage</th></tr>`;
  let rows='';
  for(const p of FRAMEWORK){
    const pc=CURATED.pillarCov[p.id];
    let cells='';
    for(const pl of plans){
      const isPrimary = pc.primary.includes(pl.id);
      const isSecondary = pc.secondary.includes(pl.id);
      let cls='none',txt='·';
      if(isPrimary){cls='p';txt='●';}
      else if(isSecondary){cls='s';txt='◐';}
      cells+=`<td class="cell"><span class="cov ${cls}" title="${pl.name}">${txt}</span></td>`;
    }
    const cov=pc;
    const pct=Math.round(100*cov.covered/cov.total);
    rows+=`<tr><th class="pillar"><b>${p.id}.</b> ${p.title}<div class="mini">${cov.covered}/${cov.total} objectives covered</div></th>${cells}<td class="cell"><span class="mini" style="font-family:var(--mono)">${pct}%</span></td></tr>`;
  }
  wrap.innerHTML=`<div class="matrix-wrap"><table class="matrix"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
    <div class="legend">
      <span><span class="sw" style="background:color-mix(in srgb,var(--ok) 45%,transparent)"></span> ● Primary owner (theme dedicated to this pillar)</span>
      <span><span class="sw" style="background:color-mix(in srgb,var(--low) 40%,transparent)"></span> ◐ Secondary contribution</span>
      <span><span class="sw" style="background:var(--line)"></span> · No contribution</span>
    </div>`;
}

/* ---------- per-pillar coverage bars ---------- */
function renderBars(){
  const b=$('#bars'); let h='';
  for(const p of FRAMEWORK){
    const c=CURATED.pillarCov[p.id]; const pct=Math.round(100*c.covered/c.total);
    const col = pct>=75?'var(--ok)':pct>=40?'var(--med)':'var(--hi)';
    h+=`<div class="bar"><div title="${p.title}"><b>${p.id}.</b> ${p.title}</div>
      <div class="track"><div class="fill" style="width:${pct}%;background:${col}"></div></div>
      <div class="pc">${pct}%</div></div>`;
  }
  b.innerHTML=h;
}

/* ---------- gaps ---------- */
function renderGaps(){
  const wrap=$('#gaps-cards');
  const sorted=[...GAPS].sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]);
  wrap.innerHTML=sorted.map(g=>{
    const p=SPD_INDEX.pillarById[g.pillar];
    return `<div class="card ${g.sev}">
      <h3><span class="pill spd">SPD ${g.spd}</span> ${g.title}</h3>
      <div class="meta"><span class="pill sev-${g.sev}">${g.sev.toUpperCase()} PRIORITY</span>
        <span class="pill doc">Pillar ${g.pillar}: ${p.title}</span></div>
      <p>${g.detail}</p>
      <div class="change"><b>Recommended fix →</b> ${g.change}</div>
    </div>`;
  }).join('');
  $('#gaps-extra').innerHTML=`<div class="note">The 8 flags above are the human-curated coverage gaps. When you upload revised plans in <b>Upload &amp; Versions</b>, the keyword engine re-checks every objective and reports which of these gaps a revision has closed (or newly opened).</div>`;
}

/* ---------- overlaps & realignment ---------- */
function renderOverlaps(){
  const wrap=$('#overlaps-cards');
  const sorted=[...OVERLAPS].sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]);
  wrap.innerHTML=sorted.map(o=>{
    const p=SPD_INDEX.pillarById[o.pillar];
    return `<div class="card ${o.sev}">
      <h3>${o.title}</h3>
      <div class="meta"><span class="pill sev-${o.sev}">${o.sev.toUpperCase()}</span>
        <span class="pill doc">Pillar ${o.pillar}: ${p.title}</span>
        ${o.docs.map(d=>`<span class="pill doc" style="border-color:${planById(d)?.colour||'var(--line)'}">${planById(d)?.short||d}</span>`).join('')}</div>
      <p>${o.detail}</p>
      <div class="change"><b>Realignment — change these docs →</b> ${o.change}</div>
    </div>`;
  }).join('');
}

/* ---------- integrity ---------- */
function renderIntegrity(){
  const wrap=$('#integrity-cards');
  wrap.innerHTML=[...INTEGRITY].sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]).map(i=>`
    <div class="card ${i.sev}">
      <h3>${i.title}</h3>
      <div class="meta"><span class="pill sev-${i.sev}">${i.sev.toUpperCase()}</span><span class="pill doc">${i.doc}</span></div>
      <p>${i.detail}</p>
      <div class="change"><b>Fix →</b> ${i.change}</div>
    </div>`).join('');
}

/* ---------- framework explorer ---------- */
function renderExplorer(){
  const wrap=$('#explorer');
  wrap.innerHTML=FRAMEWORK.map(p=>{
    const objs=p.objectives.map(o=>{
      const c=CURATED.objCov[o.id];
      const chip=(pid,pri)=>`<span class="pill doc" style="border-color:${planById(pid)?.colour}" title="${pri?'primary owner':'secondary contribution'}">${pri?'● ':'◐ '}${planById(pid)?.short||pid}</span>`;
      const chips = c.gap
        ? `<span class="gapflag">GAP — no plan action</span>`
        : (c.primary.map(pid=>chip(pid,true)).join('') + c.secondary.map(pid=>chip(pid,false)).join(''));
      const spds=o.spds.map(s=>`<li><code>${s.id}</code><span>${s.text}${s.srcId?` <em style="color:var(--med)">(source labels it ${s.srcId})</em>`:''}</span></li>`).join('');
      return `<div class="obj">
        <div class="oh"><span class="oid">${o.id}</span><span class="ot">${o.title}</span></div>
        ${o.note?`<div class="note" style="margin:6px 0">${o.note}</div>`:''}
        <div class="contribs"><span class="lbl">Contributing plans:</span> ${chips}</div>
        <ul class="spds">${spds}</ul>
      </div>`;
    }).join('');
    const cov=CURATED.pillarCov[p.id];
    return `<div class="pillar-block">
      <div class="pillar-head"><span class="idx">${p.id}</span>
        <span class="t">${p.title}<div class="mini" style="font-weight:400">${p.scope}</div></span>
        <span class="cnt">${cov.covered}/${cov.total} obj · ${p.objectives.reduce((n,o)=>n+o.spds.length,0)} SPDs</span></div>
      <div class="pillar-body">${objs}</div>
    </div>`;
  }).join('');
  $$('.pillar-head',wrap).forEach(h=>h.onclick=()=>h.parentElement.classList.toggle('open'));
  if($$('.pillar-block',wrap)[0]) $$('.pillar-block',wrap)[0].classList.add('open');
}

/* ---------- upload & versions ---------- */
function renderFileList(){
  const fl=$('#filelist');
  const keys=Object.keys(uploaded);
  if(!keys.length){fl.innerHTML=`<p class="mini">No updated plans loaded. The analysis below reflects the baseline documents.</p>`;return;}
  fl.innerHTML=keys.map(k=>`<div class="f"><span>${uploaded[k].filename}</span><span class="to">→ replaces ${planById(k)?.name||k}</span></div>`).join('');
}
function ingestFiles(files){
  [...files].forEach(f=>{
    const reader=new FileReader();
    reader.onload=e=>{
      const pid=matchPlan(f.name);
      if(!pid){ alert(`Couldn't match "${f.name}" to a known plan. Rename it to include the plan name (e.g. Social, Transport, Environment, Landscape).`); return; }
      uploaded[pid]={filename:f.name, text:String(e.target.result).toLowerCase()};
      renderFileList();
    };
    reader.readAsText(f);
  });
}
function runAnalysis(){
  const prev=CURRENT;
  CURRENT_TEXTS=baselineDocs();
  for(const [pid,o] of Object.entries(uploaded)) CURRENT_TEXTS[pid]=o.text;
  CURRENT=analyze(CURRENT_TEXTS);
  const diff=Versions.diff(prev,CURRENT);
  const entry={
    ts:new Date().toISOString(),
    label:Object.keys(uploaded).length?('Updated: '+Object.keys(uploaded).map(k=>planById(k)?.short).join(', ')):'Baseline re-run',
    files:Object.fromEntries(Object.entries(uploaded).map(([k,v])=>[k,v.filename])),
    score:CURRENT.score, covered:CURRENT.covered, total:CURRENT.total,
    openGaps:CURRENT.openGaps.map(g=>g.obj), closedGaps:CURRENT.closedGaps.map(g=>g.obj),
    diff
  };
  Versions.save(entry);
  renderVersions();
  const closedNow=CURRENT.closedGaps.filter(g=>g.inPlans.length);
  $('#run-result').innerHTML=`<div class="note"><b>Analysis complete.</b> Coverage ${CURRENT.score}% (${diff.scoreDelta>=0?'+':''}${diff.scoreDelta} pts vs previous) · ${CURRENT.openGaps.length} of ${GAPS.length} tracked gaps still open.
    ${diff.closed.length?`<br><span class="up" style="color:var(--ok)">✓ Gap(s) closed by this revision: ${diff.closed.map(x=>`<span class="pill spd">${x}</span>`).join(' ')}.</span>`:''}
    ${diff.opened.length?`<br><span style="color:var(--hi)">✕ New gap(s) opened: ${diff.opened.map(x=>`<span class="pill spd">${x}</span>`).join(' ')}.</span>`:''}
    ${closedNow.length?`<br><span class="mini">Signals detected in: ${closedNow.map(g=>`${g.obj}→${g.inPlans.map(p=>planById(p)?.short||p).join('/')}`).join('; ')}</span>`:''}
    <br>Saved as a new version below.</div>`;
}
function renderVersions(){
  const v=$('#versions'); const all=Versions.all();
  if(!all.length){v.innerHTML=`<p class="mini">No saved versions yet. Upload updated plans (or re-run the baseline) to create the first tracked version.</p>`;return;}
  v.innerHTML=all.map((e,i)=>{
    const d=e.diff||{closed:[],opened:[],scoreDelta:0};
    return `<div class="version">
      <div class="vh"><b>v${i+1} · ${e.label}</b><time>${new Date(e.ts).toLocaleString()}</time></div>
      <div class="mini">Coverage ${e.score}% (${e.covered}/${e.total} objectives) · ${(e.openGaps||[]).length} of ${GAPS.length} tracked gaps open</div>
      <div class="delta">
        <span class="${d.scoreDelta>=0?'up':'down'}">${d.scoreDelta>=0?'▲':'▼'} ${d.scoreDelta>=0?'+':''}${d.scoreDelta} pts</span>
        ${d.closed.length?`<span class="up">✓ closed ${d.closed.length} gap(s)</span>`:''}
        ${d.opened.length?`<span class="down">✕ opened ${d.opened.length} gap(s)</span>`:''}
        ${Object.keys(e.files||{}).length?`<span class="mini">files: ${Object.values(e.files).join(', ')}</span>`:''}
      </div>
    </div>`;
  }).reverse().join('');
}
function exportJSON(){
  const payload={generated:new Date().toISOString(),analysis:CURRENT,versions:Versions.all(),
    findings:{gaps:GAPS,overlaps:OVERLAPS,integrity:INTEGRITY}};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const a=el('a');a.href=URL.createObjectURL(blob);a.download='alignment-report.json';a.click();
}

/* ---------- tabs ---------- */
function initTabs(){
  $$('nav.tabs button').forEach(b=>b.onclick=()=>{
    $$('nav.tabs button').forEach(x=>x.classList.remove('active'));
    $$('section.tab').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); $('#tab-'+b.dataset.tab).classList.add('active');
  });
}

/* ---------- boot ---------- */
function boot(){
  initTheme();initTabs();
  renderHierarchy();renderStats();renderMatrix();renderBars();
  renderGaps();renderOverlaps();renderIntegrity();renderExplorer();
  renderFileList();renderVersions();

  const drop=$('#drop'), input=$('#fileinput');
  drop.onclick=()=>input.click();
  input.onchange=e=>ingestFiles(e.target.files);
  ['dragover','dragenter'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('drag');}));
  ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('drag');}));
  drop.addEventListener('drop',e=>ingestFiles(e.dataTransfer.files));
  $('#run').onclick=runAnalysis;
  $('#export').onclick=exportJSON;
  $('#clearv').onclick=()=>{if(confirm('Clear all saved versions?')){Versions.clear();renderVersions();}};
}
document.addEventListener('DOMContentLoaded',boot);
