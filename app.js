/* =============================================================================
   UI layer (Hallmark · Workbench). Crosswalk, the D3 document mind map,
   gaps, overlaps, per-document worklist, framework explorer, integrity, and the
   upload/version workflow. Analysis logic lives in data.js + engine.js.
   ========================================================================== */

const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const el = (t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
const planById = id => PLANS.find(p=>p.id===id);
const sevOrder = {high:0,med:1,low:2};

/* engine state (upload/version workflow only) */
let CURRENT_TEXTS = baselineDocs();
let CURRENT = analyze(CURRENT_TEXTS);
const uploaded = {};

/* ---------- CURATED crosswalk (authoritative) ---------- */
const CURATED = (() => {
  const gapObj = new Set(GAPS.map(g=>g.spd.split('.').slice(0,2).join('.')));
  const pillar = {};
  for(const p of FRAMEWORK) pillar[p.id]={primary:new Set(),secondary:new Set()};
  for(const pl of PLANS) for(const th of pl.themes){
    (th.pillars.primary||[]).forEach(pid=>pillar[pid]?.primary.add(pl.id));
    (th.pillars.secondary||[]).concat(th.pillars.touch||[]).forEach(pid=>pillar[pid]?.secondary.add(pl.id));
  }
  const objCov={}; let total=0, covered=0; const pillarCov={};
  for(const p of FRAMEWORK){
    let pc=0;
    for(const o of p.objectives){
      total++;
      const isGap=gapObj.has(o.id);
      const contributors = isGap? [] : [...pillar[p.id].primary, ...pillar[p.id].secondary];
      objCov[o.id]={gap:isGap, primary:[...pillar[p.id].primary], secondary:[...pillar[p.id].secondary], contributors};
      if(!isGap){covered++;pc++;}
    }
    pillarCov[p.id]={covered:pc,total:p.objectives.length,primary:[...pillar[p.id].primary],secondary:[...pillar[p.id].secondary]};
  }
  return {gapObj, pillar, objCov, pillarCov, total, covered, score:Math.round(100*covered/total)};
})();

/* ---------- theme ---------- */
function initTheme(){
  const saved=localStorage.getItem('mp_theme');
  if(saved) document.documentElement.setAttribute('data-theme',saved);
  $('#themebtn').onclick=()=>{
    const cur=document.documentElement.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
    const next=cur==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('mp_theme',next);
  };
}

/* ---------- nav ---------- */
function initNav(){
  $$('#nav button').forEach(b=>b.onclick=()=>{
    $$('#nav button').forEach(x=>x.classList.remove('active'));
    $$('section.view').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); $('#view-'+b.dataset.v).classList.add('active');
    window.scrollTo({top:0,behavior:'instant'});
    if(b.dataset.v==='network') ensureFit(); // tree needs a visible box to fit
  });
}

/* ---------- overview ---------- */
function renderKpis(){
  const gapsHi=GAPS.filter(g=>g.sev==='high').length;
  $('#kpis').innerHTML=`
    <div class="kpi ok"><div class="n">${CURATED.score}%</div><div class="l">Objectives with a contributing plan · ${CURATED.covered}/${CURATED.total}</div></div>
    <div class="kpi hi"><div class="n">${GAPS.length}</div><div class="l">Coverage gaps · ${gapsHi} high priority</div></div>
    <div class="kpi med"><div class="n">${OVERLAPS.length}</div><div class="l">Overlaps needing realignment</div></div>
    <div class="kpi"><div class="n">${INTEGRITY.length}</div><div class="l">Document integrity issues</div></div>`;
}
function renderHiermap(){
  const sect=PLANS.filter(p=>p.tier==='sector');
  $('#hiermap').innerHTML=`
    <div class="row"><div class="hnode fw">Urban Development Framework<small>8 pillars · ${CURATED.total} objectives · ${SPD_INDEX.list.length} policy directions</small></div></div>
    <div class="conn">↓ sets policy for</div>
    <div class="row"><div class="hnode" style="border-color:var(--accent)">Urban Development Master Plan</div></div>
    <div class="conn">↓ delivered through</div>
    <div class="row">${sect.map(p=>`<div class="hnode sector" style="--dc:${p.colour}">${p.short}</div>`).join('')}</div>`;
}
function renderBars(){
  $('#bars').innerHTML=FRAMEWORK.map(p=>{
    const c=CURATED.pillarCov[p.id]; const pct=Math.round(100*c.covered/c.total);
    const col=pct>=75?'var(--ok)':pct>=40?'var(--med)':'var(--hi)';
    return `<div class="bar"><div class="lbl"><b>${p.id}</b>${p.title}</div>
      <div class="track"><div class="fill" style="width:${pct}%;background:${col}"></div></div>
      <div class="pc">${c.covered}/${c.total}</div></div>`;
  }).join('');
}

/* ---------- matrix ---------- */
function renderMatrix(){
  const plans=PLANS;
  const head=`<tr><th class="pillar">Policy Pillar</th>${plans.map(p=>`<th>${p.short}</th>`).join('')}<th>Cover</th></tr>`;
  let rows='';
  for(const p of FRAMEWORK){
    const pc=CURATED.pillarCov[p.id];
    const cells=plans.map(pl=>{
      let cls='none',txt='·';
      if(pc.primary.includes(pl.id)){cls='p';txt='●';}
      else if(pc.secondary.includes(pl.id)){cls='s';txt='◐';}
      return `<td class="cell"><span class="cov ${cls}" title="${pl.name}">${txt}</span></td>`;
    }).join('');
    const pct=Math.round(100*pc.covered/pc.total);
    rows+=`<tr><th class="pillar"><span class="pn">${p.id}</span>${p.title}<div class="mini">${pc.covered}/${pc.total} objectives covered</div></th>${cells}<td class="cell"><span class="cpct">${pct}%</span></td></tr>`;
  }
  $('#matrix').innerHTML=`<div class="matrix-wrap"><table class="matrix"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
    <div class="legend">
      <span><span class="sw cov p">●</span> Primary owner — a theme dedicated to this pillar</span>
      <span><span class="sw cov s">◐</span> Secondary contribution</span>
      <span><span class="sw cov none">·</span> No contribution</span>
    </div>`;
}

/* ---------- gaps ---------- */
function renderGaps(){
  const sorted=[...GAPS].sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]);
  $('#gaps-cards').innerHTML=sorted.map(g=>{
    const p=SPD_INDEX.pillarById[g.pillar];
    return `<div class="card flag ${g.sev}">
      <div class="meta"><span class="pill spd">SPD ${g.spd}</span><span class="pill sev-${g.sev} dot">${g.sev.toUpperCase()}</span><span class="pill doc">Pillar ${g.pillar} · ${p.title}</span></div>
      <h3>${g.title}</h3><p>${g.detail}</p>
      <div class="fix"><b>Recommended fix →</b> ${g.change}</div></div>`;
  }).join('');
  $('#gaps-extra').innerHTML=`<div class="note">The 8 flags above are the curated coverage gaps. Uploading a revised plan on <b>Upload &amp; Versions</b> re-checks each and reports which a revision has closed or newly opened.</div>`;
}

/* ---------- overlaps ---------- */
function renderOverlaps(){
  const sorted=[...OVERLAPS].sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]);
  $('#overlaps-cards').innerHTML=sorted.map(o=>{
    const p=SPD_INDEX.pillarById[o.pillar];
    return `<div class="card flag ${o.sev}">
      <div class="meta"><span class="pill sev-${o.sev} dot">${o.sev.toUpperCase()}</span><span class="pill doc">Pillar ${o.pillar} · ${p.title}</span>
        ${o.docs.map(d=>`<span class="pill doc" style="border-color:${planById(d)?.colour}">${planById(d)?.short||d}</span>`).join('')}</div>
      <h3>${o.title}</h3><p>${o.detail}</p>
      <div class="fix"><b>Realignment — change these docs →</b> ${o.change}</div></div>`;
  }).join('');
}

/* ---------- integrity ---------- */
function renderIntegrity(){
  $('#integrity-cards').innerHTML=[...INTEGRITY].sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]).map(i=>`
    <div class="card flag ${i.sev}">
      <div class="meta"><span class="pill sev-${i.sev} dot">${i.sev.toUpperCase()}</span><span class="pill doc">${i.doc}</span></div>
      <h3>${i.title}</h3><p>${i.detail}</p>
      <div class="fix"><b>Fix →</b> ${i.change}</div></div>`).join('');
}

/* ---------- framework explorer ---------- */
function renderExplorer(){
  const wrap=$('#explorer');
  wrap.innerHTML=FRAMEWORK.map(p=>{
    const objs=p.objectives.map(o=>{
      const c=CURATED.objCov[o.id];
      const chip=(pid,pri)=>`<span class="pill doc" style="border-color:${planById(pid)?.colour}" title="${pri?'primary owner':'secondary'}">${pri?'●':'◐'} ${planById(pid)?.short||pid}</span>`;
      const chips=c.gap?`<span class="gapflag">GAP — no plan action</span>`
        :(c.primary.map(pid=>chip(pid,true)).join('')+c.secondary.map(pid=>chip(pid,false)).join(''));
      const spds=o.spds.map(s=>`<li><code>${s.id}</code><span>${s.text}${s.srcId?` <em style="color:var(--med)">(source labels it ${s.srcId})</em>`:''}</span></li>`).join('');
      return `<div class="obj"><div class="oh"><span class="oid">${o.id}</span><span class="ot">${o.title}</span></div>
        ${o.note?`<div class="note" style="margin:var(--s3) 0">${o.note}</div>`:''}
        <div class="contribs"><span class="lbl">Contributing plans:</span> ${chips}</div>
        <ul class="spds">${spds}</ul></div>`;
    }).join('');
    const pc=CURATED.pillarCov[p.id];
    return `<div class="pblock"><div class="phead"><span class="idx">${p.id}</span>
      <span class="t">${p.title}<div class="mini">${p.scope}</div></span>
      <span class="cnt">${pc.covered}/${pc.total} obj · ${p.objectives.reduce((n,o)=>n+o.spds.length,0)} SPDs</span>
      <span class="chev">▸</span></div>
      <div class="pbody">${objs}</div></div>`;
  }).join('');
  $$('.phead',wrap).forEach(h=>h.onclick=()=>h.parentElement.classList.toggle('open'));
  wrap.firstElementChild?.classList.add('open');
}

/* ---------- by document ---------- */
function renderBydoc(){
  const order=["UDF","UDMP","SMP","HTMP","EMP","LDS"];
  const meta={UDF:{name:"Urban Development Framework",tier:"Overarching",colour:"var(--accent)",status:"policy layer"},
              UDMP:{name:"Urban Development Master Plan",tier:"Tier 2 · booklet",colour:"#6366f1",status:"draft"}};
  $('#docgrid').innerHTML=order.map(id=>{
    const a=DOC_ALIGN[id]; if(!a) return '';
    const pl=planById(id);
    const name=pl?pl.name:meta[id].name;
    const tier=pl?(pl.tier==='sector'?'Sector plan':'Tier 2 · booklet'):meta[id].tier;
    const colour=pl?pl.colour:meta[id].colour;
    const status=pl?pl.status:meta[id].status;
    const owns=a.owns.map(pid=>`<span class="pill doc">P${pid}</span>`).join('');
    const missing=a.missing.map(m=>`<li><span class="tick miss">✕</span><span>${m.text}</span></li>`).join('');
    const adds=a.add.map(x=>`<li><span class="tick add">＋</span><span>${x.what}<span class="where">▸ ${x.where}</span></span></li>`).join('');
    const re=a.realign.map(r=>`<li><span class="tick re">⇄</span><span><span class="with">${r.with.map(w=>`<span class="pill doc" style="border-color:${planById(w)?.colour||'var(--accent)'}">${planById(w)?planById(w).short:w}</span>`).join('')}</span>${r.text}</span></li>`).join('');
    return `<div class="docpanel">
      <div class="dh" style="--dc:${colour}">
        <div class="tier">${tier} · ${status}</div>
        <h3>${name}</h3>
        <div class="role">${a.role}</div>
        <div class="owns"><span class="mini" style="align-self:center">Owns pillars:</span> ${owns}</div>
      </div>
      <div class="db">
        <div class="dsec"><div class="st">Missing / weak <span class="c">${a.missing.length}</span></div><ul class="dlist">${missing}</ul></div>
        <div class="dsec"><div class="st">Suggested additions <span class="c">${a.add.length}</span></div><ul class="dlist">${adds}</ul></div>
        <div class="dsec"><div class="st">Realign with siblings <span class="c">${a.realign.length}</span></div><ul class="dlist">${re}</ul></div>
      </div></div>`;
  }).join('');
}

/* =============================================================================
   MIND MAP — D3 horizontal collapsible tree (adapted from the reference design).
   Data: MINDMAP / MM_PLAN / MM_SC in data.js. Panel shows verbatim plan quotes
   + alignment insight. Legend filters by status. Zoom/pan + full-screen expand.
   ========================================================================== */
let mmBuilt=false, mmSvg,mmGRoot,mmGLinks,mmGNodes,mmRoot,mmSel=null,mmFilter=null,mmZoom,mmTreeLayout;
const MM_STATUSNAME={green:"Aligned / complementary",amber:"Overlap — needs coordination",red:"Duplication / conflict flagged",blue:"Insight / recommendation",plan:"Plan reference",group:"Cluster",root:"System"};
const MM_NODE_H=34, MM_NODE_VGAP=12;
const mmEsc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const mmTreewrap=()=>document.querySelector('.mm-treewrap');
function mmCollapse(d){ if(d.children){ d._children=d.children; d._children.forEach(mmCollapse); d.children=null; } }
function mmNodeWidth(d){
  const base=30+d.data.name.length*6.6;
  const badges=d.data.plans?d.data.plans.length*17+12:0;
  const caret=(d.children||d._children)?16:0;
  return Math.max(90, base+badges+caret);
}
/* my plan ids -> mind-map plan codes */
const ID2MM={UDMP:'U',SMP:'S',HTMP:'T',EMP:'E',LDS:'L'};
/* Build the overarching Urban Development Framework branch from FRAMEWORK + CURATED + GAPS,
   so its pillars/objectives, coverage and gaps show live on the map. */
function frameworkBranch(){
  const gapByObj={}; GAPS.forEach(g=>{gapByObj[g.spd.split('.').slice(0,2).join('.')]=g;});
  const pillars=FRAMEWORK.map(p=>{
    const pc=CURATED.pillarCov[p.id];
    const contribMM=[...new Set([...pc.primary,...pc.secondary].map(id=>ID2MM[id]).filter(Boolean))];
    const objs=p.objectives.map(o=>{
      const isGap=CURATED.objCov[o.id].gap, g=gapByObj[o.id];
      const contribs=CURATED.objCov[o.id].contributors.map(id=>planById(id)?.short).filter(Boolean);
      return { name:`${o.id} · ${o.title}`, status:isGap?'red':'green', warn:isGap?'⚠ GAP':null,
        slabel:isGap?'Coverage gap — no delivering action':'Objective — covered',
        wmsg:isGap?'⚠ COVERAGE GAP — no plan currently delivers this policy direction':null,
        detail:{ summary:o.title+'.',
          quotes:o.spds.map(s=>({p:'U',r:'SPD '+s.id,t:s.text})),
          insight: isGap&&g ? `GAP — no delivering action. ${g.detail} Recommended fix: ${g.change}`
                             : `Covered. Contributing plans: ${contribs.join(', ')||'—'}.` } };
    });
    const hasGap=p.objectives.some(o=>CURATED.objCov[o.id].gap);
    const partial=pc.covered<pc.total;
    return { name:`P${p.id} · ${p.title}`, status:hasGap?'red':(partial?'amber':'green'),
      warn:hasGap?'⚠ GAP':null, plans:contribMM,
      slabel:hasGap?'Policy pillar — contains coverage gaps':(partial?'Policy pillar — partial coverage':'Policy pillar — fully covered'),
      wmsg:hasGap?'⚠ CONTAINS COVERAGE GAPS — policy directions with no delivering action':null,
      detail:{ summary:`${p.scope} — ${pc.covered}/${pc.total} objectives have a contributing plan action.`,
        quotes:[],
        insight: hasGap ? `Contains coverage gaps at objective(s) ${p.objectives.filter(o=>CURATED.objCov[o.id].gap).map(o=>o.id).join(', ')}. Expand to see which policy directions have no delivering action and the recommended fix.`
                        : `Fully covered. Contributing plans: ${contribMM.map(c=>c).join(', ')}.` },
      children:objs };
  });
  return { name:"Urban Development Framework (overarching)", status:"group",
    detail:{ summary:`The overarching policy document (Excel): 8 Policy Pillars → ${CURATED.total} Strategic Objectives → ${SPD_INDEX.list.length} Strategic Policy Directions. Every plan traces up to it. Pillar colour shows coverage — red pillars contain policy directions with no delivering action in any plan; amber = partial; green = fully covered.`,
      quotes:[],
      insight:`${CURATED.score}% of framework objectives have a contributing plan action; ${GAPS.length} coverage gaps are flagged as red nodes below. The plan badges on each pillar show which plans currently feed it — that is the interlinkage between the framework and the sector plans. The tier-2 "Urban Development MP" booklet (under The Plans) sits between this framework and the sector plans.` },
    children:pillars };
}
function buildTree(){
  mmSvg=d3.select('#treesvg'); mmSvg.selectAll('*').remove();
  mmGRoot=mmSvg.append('g'); mmGLinks=mmGRoot.append('g'); mmGNodes=mmGRoot.append('g');
  const treeData={...MINDMAP, children:[frameworkBranch(), ...MINDMAP.children]};
  mmRoot=d3.hierarchy(treeData); mmRoot.x0=0; mmRoot.y0=0; let idc=0; mmRoot.each(d=>d.id=++idc);
  // initial collapse: keep root's children open, collapse everything below them
  (mmRoot.children||[]).forEach(c=>{ if(c.children) c.children.forEach(cc=>mmCollapse(cc)); });
  mmTreeLayout=d3.tree().nodeSize([MM_NODE_H+MM_NODE_VGAP,1]);
  mmZoom=d3.zoom().scaleExtent([0.3,2]).on('zoom',ev=>mmGRoot.attr('transform',ev.transform));
  mmSvg.call(mmZoom);
  mmUpdate(mmRoot);
}
function mmUpdate(source){
  mmTreeLayout(mmRoot);
  const colW=[0,210,255,255,265];
  mmRoot.each(d=>{ let y=0; for(let i=0;i<d.depth;i++) y+=(colW[i+1]||255); d.y=y+20; });
  const nodes=mmRoot.descendants(), links=mmRoot.links();
  const t=mmSvg.transition().duration(280);
  const node=mmGNodes.selectAll('g.node-chip').data(nodes,d=>d.id);
  const nEnter=node.enter().append('g').attr('class','node-chip')
    .attr('transform',`translate(${source.y0||0},${source.x0||0})`).style('opacity',0)
    .on('click',(ev,d)=>{ mmToggle(d); mmSelect(d); });
  nEnter.append('rect').attr('class','bg').attr('y',-MM_NODE_H/2).attr('rx',9).attr('height',MM_NODE_H);
  nEnter.append('circle').attr('class','sdot').attr('r',5).attr('cx',14).attr('cy',0);
  nEnter.append('text').attr('class','nlabel').attr('x',26).attr('dy','0.34em');
  nEnter.append('text').attr('class','caret').attr('dy','0.36em');
  const nAll=nEnter.merge(node);
  nAll.each(function(d){
    const g=d3.select(this), w=mmNodeWidth(d);
    g.select('rect.bg').attr('width',w);
    g.select('.sdot').attr('fill',MM_SC[d.data.status]||'var(--muted)');
    g.select('.nlabel').text(d.data.name);
    const hasKids=d.children||d._children;
    g.select('.caret').attr('x',w-14).text(hasKids?(d.children?'−':'+'):'');
    g.selectAll('.pb,.warnbg,.warn').remove();
    if(d.data.plans){
      const labelEnd=26+d.data.name.length*6.6+8;
      d.data.plans.forEach((p,i)=>{ const bx=labelEnd+i*17;
        g.append('circle').attr('class','pb').attr('cx',bx+7).attr('cy',0).attr('r',7.5).attr('fill',MM_PLAN[p].color);
        g.append('text').attr('class','pb badge').attr('x',bx+7).attr('y',3).attr('text-anchor','middle').text(p);
      });
    }
    if(d.data.status==='red'){
      const wtxt=d.data.warn||'⚠ ALIGN', wbw=wtxt.length*6.2+14;
      g.append('rect').attr('class','warnbg').attr('x',w-4).attr('y',-9).attr('width',wbw).attr('height',18).attr('rx',9);
      g.append('text').attr('class','warn').attr('x',w-4+wbw/2).attr('y',3).attr('text-anchor','middle').text(wtxt);
    }
    g.classed('selected', mmSel && mmSel.id===d.id);
    const dim = mmFilter && !['root','group','plan'].includes(d.data.status) && d.data.status!==mmFilter;
    g.classed('dimmed', !!dim);
  });
  nAll.transition(t).attr('transform',d=>`translate(${d.y},${d.x})`).style('opacity',1);
  node.exit().transition(t).attr('transform',`translate(${source.y},${source.x})`).style('opacity',0).remove();
  const link=mmGLinks.selectAll('path.link').data(links,d=>d.target.id);
  const diag=d3.linkHorizontal().x(d=>d.y).y(d=>d.x);
  link.enter().append('path').attr('class','link')
    .attr('d',()=>{ const o={x:source.x0||0,y:source.y0||0}; return diag({source:o,target:o}); })
    .merge(link).transition(t)
    .attr('d',d=>{ const wtxt=d.source.data.warn||'⚠ ALIGN';
      const extra=d.source.data.status==='red'?(wtxt.length*6.2+14):0;
      return diag({source:{x:d.source.x,y:d.source.y+mmNodeWidth(d.source)+extra},target:{x:d.target.x,y:d.target.y}}); });
  link.exit().transition(t).remove();
  mmRoot.each(d=>{ d.x0=d.x; d.y0=d.y; });
}
function mmToggle(d){ if(d.children){d._children=d.children;d.children=null;} else if(d._children){d.children=d._children;d._children=null;} mmUpdate(d); }
function mmSelect(d){
  mmSel=d; if(mmGNodes) mmGNodes.selectAll('g.node-chip').classed('selected',n=>n.id===d.id);
  const dd=d.data, det=dd.detail||{}; let h='';
  h+=`<div class="mm-eyebrow"><span class="d" style="background:${MM_SC[dd.status]||'var(--muted)'}"></span>${dd.slabel||MM_STATUSNAME[dd.status]||''}</div>`;
  h+=`<h2>${mmEsc(dd.name)}</h2>`;
  if(dd.status==='red') h+=`<div class="mm-panelwarn">${mmEsc(dd.wmsg||'⚠ MAJOR ALIGNMENT REQUIRED — duplicated or conflicting actions across plans')}</div>`;
  if(dd.plans) h+=`<div class="mm-plansin">`+dd.plans.map(p=>`<span class="mm-pk" style="background:${MM_PLAN[p].color}">${p} · ${mmEsc(MM_PLAN[p].name)}</span>`).join('')+`</div>`;
  if(det.summary) h+=`<p class="mm-summary">${mmEsc(det.summary)}</p>`;
  if(det.quotes&&det.quotes.length){
    h+=`<div class="mm-seclabel">Original text — verbatim from the plans</div>`;
    det.quotes.forEach(q=>{ h+=`<div class="qblock" style="border-left-color:${MM_PLAN[q.p].color}">
      <div class="qmeta"><span class="mm-pk" style="background:${MM_PLAN[q.p].color}">${q.p}</span><span>${mmEsc(q.r)}</span></div>
      <div class="qtext">${mmEsc(q.t)}</div></div>`; });
  }
  if(det.insight){
    h+=`<div class="mm-seclabel" style="color:var(--accent-ink);border-bottom-color:color-mix(in oklch,var(--accent) 30%,transparent)">Insight — not original text</div>`;
    h+=`<div class="mm-insight"><div class="il">Alignment insight</div><p>${mmEsc(det.insight)}</p></div>`;
  }
  const body=$('#mmbody'); body.innerHTML=h; const panel=$('#mmpanel'); if(panel) panel.scrollTop=0;
}
function mmFit(){
  const tw=mmTreewrap(); if(!tw||!mmZoom) return;
  const w=tw.clientWidth, hh=tw.clientHeight; if(w<60) return;
  mmSvg.call(mmZoom.transform, d3.zoomIdentity.translate(28, Math.max(60,hh/2)).scale(w<700?0.6:0.8));
}
function ensureFit(tries){ tries=tries==null?16:tries;
  const tw=mmTreewrap();
  if(tw && tw.clientWidth>=60){ mmFit(); return; }
  if(tries>0) requestAnimationFrame(()=>ensureFit(tries-1));
}
function mmFsToggle(on){
  const stage=$('#net-stage'); stage.classList.toggle('fs',on);
  document.body.style.overflow=on?'hidden':'';
  $('#mm-fs').hidden=on; $('#mm-fsclose').hidden=!on;
  ensureFit();
}
function renderNetwork(){
  if(!mmBuilt){
    if(typeof d3==='undefined'){ $('#mmbody').innerHTML='<div class="empty">Mind map needs the D3 library (d3.min.js) — it did not load.</div>'; return; }
    buildTree(); mmBuilt=true;
    $('#mm-plankey').innerHTML=Object.entries(MM_PLAN).map(([k,v])=>`<span class="mm-pk" style="background:${v.color}">${k} · ${mmEsc(v.name)}</span>`).join('');
    $$('#mm-legend .mm-lg').forEach(lg=>lg.onclick=()=>{
      const s=lg.dataset.status;
      if(mmFilter===s){mmFilter=null;lg.classList.remove('active');}
      else{mmFilter=s;$$('#mm-legend .mm-lg').forEach(x=>x.classList.remove('active'));lg.classList.add('active');}
      mmUpdate(mmRoot);
    });
    $('#mm-fit').onclick=()=>mmFit();
    $('#mm-fs').onclick=()=>mmFsToggle(true);
    $('#mm-fsclose').onclick=()=>mmFsToggle(false);
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&$('#net-stage').classList.contains('fs')) mmFsToggle(false); });
    let rt; window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if($('#view-network').classList.contains('active'))mmFit();},180);});
    mmSelect(mmRoot);
  }
  ensureFit();
}

/* ---------- upload / versions ---------- */
function renderFileList(){
  const keys=Object.keys(uploaded);
  $('#filelist').innerHTML=keys.length
    ? keys.map(k=>`<div class="f"><span>${uploaded[k].filename}</span><span class="to">→ ${planById(k)?.short||k}</span></div>`).join('')
    : `<div class="mini" style="padding:var(--s2) 0">No revised plans loaded — analysis reflects the baseline documents.</div>`;
}
function ingestFiles(files){
  [...files].forEach(f=>{
    const r=new FileReader();
    r.onload=e=>{
      const pid=matchPlan(f.name);
      if(!pid){alert(`Couldn't match "${f.name}" to a plan. Include the plan name in the filename (Social, Transport, Environment, Landscape).`);return;}
      uploaded[pid]={filename:f.name,text:String(e.target.result).toLowerCase()};
      renderFileList();
    };
    r.readAsText(f);
  });
}
function runAnalysis(){
  const prev=CURRENT;
  CURRENT_TEXTS=baselineDocs();
  for(const [pid,o] of Object.entries(uploaded)) CURRENT_TEXTS[pid]=o.text;
  CURRENT=analyze(CURRENT_TEXTS);
  const diff=Versions.diff(prev,CURRENT);
  Versions.save({ts:new Date().toISOString(),
    label:Object.keys(uploaded).length?('Updated: '+Object.keys(uploaded).map(k=>planById(k)?.short).join(', ')):'Baseline re-run',
    files:Object.fromEntries(Object.entries(uploaded).map(([k,v])=>[k,v.filename])),
    score:CURRENT.score,covered:CURRENT.covered,total:CURRENT.total,
    openGaps:CURRENT.openGaps.map(g=>g.obj),closedGaps:CURRENT.closedGaps.map(g=>g.obj),diff});
  renderVersions();
  const closedNow=CURRENT.closedGaps.filter(g=>g.inPlans.length);
  $('#run-result').innerHTML=`<div class="note"><b>Analysis complete.</b> Coverage ${CURRENT.score}% (${diff.scoreDelta>=0?'+':''}${diff.scoreDelta} pts) · ${CURRENT.openGaps.length} of ${GAPS.length} tracked gaps still open.
    ${diff.closed.length?`<br><span style="color:var(--ok)">✓ Gap(s) closed by this revision: ${diff.closed.map(x=>`<span class="pill spd">${x}</span>`).join(' ')}</span>`:''}
    ${diff.opened.length?`<br><span style="color:var(--hi)">✕ New gap(s) opened: ${diff.opened.map(x=>`<span class="pill spd">${x}</span>`).join(' ')}</span>`:''}
    ${closedNow.length?`<br><span class="mini">Signals in: ${closedNow.map(g=>`${g.obj}→${g.inPlans.map(p=>planById(p)?.short||p).join('/')}`).join('; ')}</span>`:''}</div>`;
}
function renderVersions(){
  const all=Versions.all();
  $('#versions').innerHTML=all.length
    ? all.map((e,i)=>{const d=e.diff||{closed:[],opened:[],scoreDelta:0};
        return `<div class="version"><div class="vh"><b>v${i+1} · ${e.label}</b><time>${new Date(e.ts).toLocaleString()}</time></div>
        <div class="vm">Coverage ${e.score}% (${e.covered}/${e.total}) · ${(e.openGaps||[]).length} of ${GAPS.length} tracked gaps open</div>
        <div class="delta"><span class="${d.scoreDelta>=0?'up':'down'}">${d.scoreDelta>=0?'▲':'▼'} ${d.scoreDelta>=0?'+':''}${d.scoreDelta} pts</span>
        ${d.closed.length?`<span class="up">✓ closed ${d.closed.length}</span>`:''}${d.opened.length?`<span class="down">✕ opened ${d.opened.length}</span>`:''}
        ${Object.keys(e.files||{}).length?`<span class="mini">${Object.values(e.files).join(', ')}</span>`:''}</div></div>`;
      }).reverse().join('')
    : `<div class="mini">No saved versions yet. Upload revised plans (or re-run the baseline) to create the first tracked version.</div>`;
}
function exportJSON(){
  const payload={generated:new Date().toISOString(),curated:{score:CURATED.score,gaps:GAPS,overlaps:OVERLAPS,integrity:INTEGRITY,byDocument:DOC_ALIGN},
    engine:CURRENT,versions:Versions.all()};
  const a=el('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  a.download='alignment-report.json';a.click();
}

/* ---------- boot ---------- */
function boot(){
  initTheme();initNav();
  renderKpis();renderHiermap();renderBars();renderMatrix();
  renderGaps();renderOverlaps();renderIntegrity();renderExplorer();
  renderBydoc();renderNetwork();renderFileList();renderVersions();

  const drop=$('#drop'),input=$('#fileinput');
  drop.onclick=()=>input.click();
  input.onchange=e=>ingestFiles(e.target.files);
  ['dragover','dragenter'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('drag');}));
  ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('drag');}));
  drop.addEventListener('drop',e=>ingestFiles(e.dataTransfer.files));
  $('#run').onclick=runAnalysis;$('#export').onclick=exportJSON;
  $('#clearv').onclick=()=>{if(confirm('Clear all saved versions?')){Versions.clear();renderVersions();}};
}
document.addEventListener('DOMContentLoaded',boot);
