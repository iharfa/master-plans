/* =============================================================================
   UI layer (Hallmark · Workbench). Renders the crosswalk, the expandable
   document-network graph, gaps, overlaps, per-document worklist, framework
   explorer, integrity, and the upload/version workflow.
   Analysis logic lives in data.js + engine.js.
   ========================================================================== */

const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const el = (t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
const planById = id => PLANS.find(p=>p.id===id);
const sevOrder = {high:0,med:1,low:2};
const SECTORS = ["SMP","HTMP","EMP","LDS"];
const NS = "http://www.w3.org/2000/svg";

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
   NETWORK — expandable force-directed graph
   Nodes: framework · pillars · plans · themes · actions.
   Themes feed pillars (the interlink); plans expand to themes; themes to actions.
   ========================================================================== */
const NETW=900, NETH=600, NPAD=46;
const REST={backbone:150,hier:92,planfeed:180,own:70,feed:128,act:46,overlap:178};
const REP=5200, SPRING=0.05, GRAV=0.006, DAMP=0.85, REPCAP=9;
const R={framework:24,pillar:15,plan:16,theme:11,action:5.5};
let GRAPH=null, gEls={}, focused=null;

function buildGraph(){
  const nodes={}, links=[];
  const add=(id,o)=>{nodes[id]={id,x:null,y:null,vx:0,vy:0,...o};};
  add('F',{type:'framework',label:'UDF',full:'Urban Development Framework',fixed:true});
  FRAMEWORK.forEach(p=>{add('P'+p.id,{type:'pillar',label:'P'+p.id,full:p.id+'. '+p.title});
    links.push({s:'F',t:'P'+p.id,type:'backbone'});});
  PLANS.forEach(pl=>{
    const prim=new Set(); pl.themes.forEach(th=>(th.pillars.primary||[]).forEach(x=>prim.add(x)));
    add(pl.id,{type:'plan',label:pl.short,full:pl.name,color:pl.colour,expandable:true,expanded:false});
    pl.aggPillars=[...prim];
  });
  links.push({s:'F',t:'UDMP',type:'hier'});
  SECTORS.forEach(s=>links.push({s:'UDMP',t:s,type:'hier'}));
  PLANS.forEach(pl=>{
    pl.aggPillars.forEach(pid=>links.push({s:pl.id,t:'P'+pid,type:'planfeed'}));
    pl.themes.forEach(th=>{
      const tid=pl.id+':'+th.id;
      add(tid,{type:'theme',label:th.id,full:th.title,plan:pl.id,color:pl.colour,
        expandable:!!(th.actions&&th.actions.length),expanded:false});
      links.push({s:pl.id,t:tid,type:'own'});
      (th.pillars.primary||[]).forEach(pid=>links.push({s:tid,t:'P'+pid,type:'feed',strong:true}));
      (th.pillars.secondary||[]).concat(th.pillars.touch||[]).forEach(pid=>links.push({s:tid,t:'P'+pid,type:'feed',strong:false}));
      (th.actions||[]).forEach((a,i)=>{const aid=tid+':a'+i;
        add(aid,{type:'action',label:'',full:a,plan:pl.id,color:pl.colour,theme:tid});
        links.push({s:tid,t:aid,type:'act'});});
    });
  });
  // cross-plan overlap edges (plan↔plan) from OVERLAPS
  const pairs={};
  OVERLAPS.forEach(o=>{const ds=o.docs.filter(d=>SECTORS.includes(d));
    for(let i=0;i<ds.length;i++)for(let j=i+1;j<ds.length;j++){
      const k=[ds[i],ds[j]].sort().join('|');
      if(!pairs[k])pairs[k]={s:k.split('|')[0],t:k.split('|')[1],type:'overlap',weight:0,sev:'low',topics:[]};
      pairs[k].weight++;pairs[k].topics.push(o.title);
      if(sevOrder[o.sev]<sevOrder[pairs[k].sev])pairs[k].sev=o.sev;}});
  Object.values(pairs).forEach(p=>links.push(p));
  return {nodes,links};
}
const nodeVisible=n=>{
  if(n.type==='framework'||n.type==='pillar'||n.type==='plan')return true;
  if(n.type==='theme')return GRAPH.nodes[n.plan].expanded;
  if(n.type==='action')return GRAPH.nodes[n.theme].expanded&&GRAPH.nodes[n.plan].expanded;
  return false;
};
const linkVisible=l=>{
  const a=GRAPH.nodes[l.s],b=GRAPH.nodes[l.t];
  if(!nodeVisible(a)||!nodeVisible(b))return false;
  if(l.type==='planfeed')return !GRAPH.nodes[l.s].expanded; // themes take over when expanded
  return true;
};
const parentOf=n=> n.type==='theme'?GRAPH.nodes[n.plan] : n.type==='action'?GRAPH.nodes[n.theme] : null;

function seed(nodes){
  const cx=NETW/2, cy=NETH/2;
  nodes.forEach((n,i)=>{
    if(n.x!=null) return;
    const p=parentOf(n); const ang=(i*2.399);
    if(n.type==='framework'){n.x=cx;n.y=cy;}
    else if(p&&p.x!=null){n.x=p.x+Math.cos(ang)*40;n.y=p.y+Math.sin(ang)*40;}
    else {n.x=cx+Math.cos(ang)*190;n.y=cy+Math.sin(ang)*150;}
  });
}
function simulate(nodes,links,iters,a0){
  let alpha=a0;
  for(let it=0;it<iters;it++){
    for(let i=0;i<nodes.length;i++){const A=nodes[i];
      for(let j=i+1;j<nodes.length;j++){const B=nodes[j];
        let dx=A.x-B.x,dy=A.y-B.y,d2=dx*dx+dy*dy||0.01,d=Math.sqrt(d2);
        let rep=REP/d2; if(rep>REPCAP)rep=REPCAP; const fx=dx/d*rep,fy=dy/d*rep;
        A.vx+=fx;A.vy+=fy;B.vx-=fx;B.vy-=fy;}}
    links.forEach(l=>{const A=GRAPH.nodes[l.s],B=GRAPH.nodes[l.t];
      let dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy)||0.01;
      const f=(d-(REST[l.type]||90))*SPRING, fx=dx/d*f, fy=dy/d*f;
      A.vx+=fx;A.vy+=fy;B.vx-=fx;B.vy-=fy;});
    const cx=NETW/2,cy=NETH/2;
    nodes.forEach(n=>{ if(n.fixed){n.x=cx;n.y=cy;n.vx=0;n.vy=0;return;}
      n.vx+=(cx-n.x)*GRAV; n.vy+=(cy-n.y)*GRAV;
      n.vx*=DAMP; n.vy*=DAMP; n.x+=n.vx*alpha; n.y+=n.vy*alpha;
      n.x=Math.max(NPAD,Math.min(NETW-NPAD,n.x)); n.y=Math.max(NPAD,Math.min(NETH-NPAD,n.y)); });
    alpha*=0.985;
  }
}
function linkStyle(l){
  if(l.type==='overlap')return{stroke:l.sev==='high'?'var(--hi)':l.sev==='med'?'var(--med)':'var(--low)',w:1.4+l.weight*1.1,dash:'1 5',op:.9};
  if(l.type==='hier')return{stroke:'var(--ink-2)',w:1.5,dash:'',op:.5};
  if(l.type==='backbone')return{stroke:'var(--accent)',w:1.2,dash:'',op:.28};
  if(l.type==='planfeed')return{stroke:'var(--accent)',w:1.2,dash:'4 4',op:.35};
  if(l.type==='feed')return{stroke:'var(--accent)',w:l.strong?1.8:1,dash:l.strong?'':'3 4',op:l.strong?.6:.35};
  if(l.type==='own')return{stroke:'var(--line-2)',w:1.3,dash:'',op:.7};
  if(l.type==='act')return{stroke:'var(--line-2)',w:1,dash:'',op:.5};
  return{stroke:'var(--line-2)',w:1,dash:'',op:.5};
}
function drawGraph(){
  const vis=Object.values(GRAPH.nodes).filter(nodeVisible);
  const vl=GRAPH.links.filter(linkVisible);
  seed(vis);
  simulate(vis,vl,360,1.0);
  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('viewBox',`0 0 ${NETW} ${NETH}`);
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.setAttribute('role','img'); svg.setAttribute('aria-label','Document relationship network');
  const gl=document.createElementNS(NS,'g'), gn=document.createElementNS(NS,'g');
  gEls={links:[],nodes:{},nodeList:vl};
  vl.forEach(l=>{const st=linkStyle(l);
    const ln=document.createElementNS(NS,'line');
    ln.setAttribute('stroke',st.stroke);ln.setAttribute('stroke-width',st.w);
    if(st.dash)ln.setAttribute('stroke-dasharray',st.dash);
    ln.setAttribute('stroke-linecap','round');ln.setAttribute('opacity',st.op);
    gl.append(ln); gEls.links.push({l,ln});});
  vis.forEach(n=>{
    const g=document.createElementNS(NS,'g');
    g.setAttribute('tabindex','0'); g.dataset.id=n.id;
    g.style.cursor=n.expandable?'pointer':'default';
    const r=R[n.type];
    // expandable halo
    if(n.expandable){const h=document.createElementNS(NS,'circle');
      h.setAttribute('r',r+4);h.setAttribute('fill','none');
      h.setAttribute('stroke',n.color||'var(--accent)');h.setAttribute('stroke-width',1);
      h.setAttribute('stroke-dasharray',n.expanded?'':'2 3');h.setAttribute('opacity',n.expanded?.9:.5);g.append(h);}
    const c=document.createElementNS(NS,'circle'); c.setAttribute('r',r);
    if(n.type==='framework'){c.setAttribute('fill','var(--accent)');}
    else if(n.type==='pillar'){c.setAttribute('fill','var(--panel)');c.setAttribute('stroke','var(--accent)');c.setAttribute('stroke-width',1.6);}
    else if(n.type==='plan'){c.setAttribute('fill',n.color);}
    else if(n.type==='theme'){c.setAttribute('fill',n.color);c.setAttribute('fill-opacity',.28);c.setAttribute('stroke',n.color);c.setAttribute('stroke-width',1.6);}
    else {c.setAttribute('fill',n.color);c.setAttribute('fill-opacity',.55);}
    g.append(c);
    // inside label for framework + pillar; below for plan/theme
    if(n.type==='framework'){const t=document.createElementNS(NS,'text');t.setAttribute('text-anchor','middle');t.setAttribute('dy','4');t.setAttribute('font-size',12);t.setAttribute('font-weight','700');t.setAttribute('fill','var(--on-accent)');t.textContent='UDF';g.append(t);}
    if(n.type==='pillar'){const t=document.createElementNS(NS,'text');t.setAttribute('text-anchor','middle');t.setAttribute('dy','3.5');t.setAttribute('font-size',10);t.setAttribute('font-weight','700');t.setAttribute('fill','var(--accent-ink)');t.setAttribute('font-family','var(--font-mono)');t.textContent=n.label;g.append(t);}
    if(n.type==='plan'||n.type==='theme'){const t=document.createElementNS(NS,'text');t.setAttribute('text-anchor','middle');t.setAttribute('dy',r+11);t.setAttribute('font-size',n.type==='plan'?11:9.5);t.setAttribute('font-weight',n.type==='plan'?'600':'500');t.setAttribute('fill','var(--ink-2)');t.setAttribute('font-family',n.type==='theme'?'var(--font-mono)':'var(--font-display)');t.textContent=n.label;g.append(t);}
    g.addEventListener('mouseenter',()=>focus(n.id));
    g.addEventListener('focus',()=>focus(n.id));
    g.addEventListener('click',()=>{ if(n.expandable){n.expanded=!n.expanded; drawGraph(); focus(n.id);} else focus(n.id); });
    gn.append(g); gEls.nodes[n.id]=g;
  });
  svg.append(gl,gn);
  const cvs=$('#net-canvas'); cvs.replaceChildren(svg);
  cvs.onmouseleave=reset;
  paint();
  if(focused&&GRAPH.nodes[focused]&&nodeVisible(GRAPH.nodes[focused])) applyFocus(focused); else reset();
}
function paint(){
  gEls.links.forEach(({l,ln})=>{const a=GRAPH.nodes[l.s],b=GRAPH.nodes[l.t];
    ln.setAttribute('x1',a.x.toFixed(1));ln.setAttribute('y1',a.y.toFixed(1));
    ln.setAttribute('x2',b.x.toFixed(1));ln.setAttribute('y2',b.y.toFixed(1));});
  Object.entries(gEls.nodes).forEach(([id,g])=>{const n=GRAPH.nodes[id];
    g.setAttribute('transform',`translate(${n.x.toFixed(1)},${n.y.toFixed(1)})`);});
}
const neighbours=id=>{const set=new Set([id]);
  gEls.nodeList.forEach(l=>{if(l.s===id)set.add(l.t);if(l.t===id)set.add(l.s);});return set;};
function applyFocus(id){
  const near=neighbours(id);
  Object.entries(gEls.nodes).forEach(([nid,g])=>g.style.opacity=near.has(nid)?'1':'.2');
  gEls.links.forEach(({l,ln})=>ln.style.opacity=(l.s===id||l.t===id)?'':'0.06');
}
function focus(id){
  focused=id; applyFocus(id);
  const n=GRAPH.nodes[id]; if(!n)return;
  const title=$('#net-title'),desc=$('#net-desc'),box=$('#net-links');
  let links='';
  if(n.type==='pillar'){
    const pid=id.slice(1);
    title.textContent=n.full;
    desc.textContent='Every theme that feeds this pillar — the interlink between plans. '+(SPD_INDEX.pillarById[pid]?.scope||'');
    const feeders={};
    GRAPH.links.filter(l=>l.type==='feed'&&l.t===id).forEach(l=>{const th=GRAPH.nodes[l.s];(feeders[th.plan]??=[]).push({th,strong:l.strong});});
    Object.entries(feeders).forEach(([plan,ths])=>{
      links+=`<div class="linkitem"><b style="color:${planById(plan)?.colour}">${planById(plan)?.short||plan}</b><br>${ths.map(x=>`${x.strong?'● ':'◐ '}${x.th.full}`).join('<br>')}</div>`;});
    if(!links)links='<div class="linkitem mini">No theme feeds this pillar — a coverage gap.</div>';
  } else if(n.type==='plan'){
    title.textContent=n.full;
    desc.textContent=(DOC_ALIGN[id]&&DOC_ALIGN[id].role)||'';
    const ths=planById(id).themes;
    links+=`<div class="linkitem"><b>${n.expanded?'Themes (click node to collapse)':'Click the node to expand its themes'}</b><br>${ths.map(t=>`${t.id} · ${t.title}`).join('<br>')}</div>`;
    GRAPH.links.filter(l=>l.type==='overlap'&&(l.s===id||l.t===id)).sort((a,b)=>sevOrder[a.sev]-sevOrder[b.sev]).forEach(l=>{
      const other=l.s===id?l.t:l.s;
      links+=`<div class="linkitem"><span class="pill sev-${l.sev} dot" style="margin-bottom:6px">${l.weight} shared · ${planById(other)?.short}</span><br>${l.topics.join('<br>')}</div>`;});
  } else if(n.type==='theme'){
    title.textContent=n.full;
    const pl=planById(n.plan);
    const feeds=GRAPH.links.filter(l=>l.type==='feed'&&l.s===id).map(l=>`${l.strong?'●':'◐'} P${l.t.slice(1)} ${SPD_INDEX.pillarById[l.t.slice(1)]?.title}`);
    desc.textContent=`Theme of ${pl.name}. ${n.expandable?'Click to '+(n.expanded?'collapse':'expand')+' its actions.':''}`;
    links+=`<div class="linkitem"><b>Feeds framework pillars</b><br>${feeds.join('<br>')||'—'}</div>`;
    const th=pl.themes.find(t=>t.id===n.label);
    if(th&&th.actions)links+=`<div class="linkitem"><b>Actions (${th.actions.length})</b><br>${th.actions.join('<br>')}</div>`;
  } else if(n.type==='action'){
    const pl=planById(n.plan), th=GRAPH.nodes[n.theme];
    title.textContent='Action';
    desc.textContent=`${pl.short} · ${th.full}`;
    links=`<div class="linkitem">${n.full}</div>`;
  } else {
    title.textContent=n.full;
    desc.textContent='The overarching policy layer. Its 8 pillars are the backbone every plan connects through.';
    links=`<div class="linkitem"><b>8 policy pillars</b><br>${FRAMEWORK.map(p=>`P${p.id} · ${p.title}`).join('<br>')}</div>`;
  }
  box.innerHTML=links;
}
function reset(){
  focused=null;
  if(gEls.nodes)Object.values(gEls.nodes).forEach(g=>g.style.opacity='1');
  if(gEls.links)gEls.links.forEach(({ln})=>ln.style.opacity='');
  $('#net-title').textContent='The framework backbone';
  $('#net-desc').textContent='Pillars P1–P8 sit at the centre. Hover a pillar to see which themes — across every plan — feed it. Click a plan to expand its themes and actions.';
  $('#net-links').innerHTML='';
}
function renderNetwork(){
  if(!GRAPH) GRAPH=buildGraph();
  drawGraph();
}
function initNetControls(){
  $('#net-expand').onclick=()=>{PLANS.forEach(p=>{if(GRAPH.nodes[p.id])GRAPH.nodes[p.id].expanded=true;});drawGraph();};
  $('#net-collapse').onclick=()=>{Object.values(GRAPH.nodes).forEach(n=>{if(n.expandable)n.expanded=false;});focused=null;drawGraph();};
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
  renderBydoc();renderNetwork();initNetControls();renderFileList();renderVersions();

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
