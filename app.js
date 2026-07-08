/* =============================================================================
   UI layer (Hallmark · Workbench). Renders the crosswalk, network diagram,
   gaps, overlaps, per-document worklist, framework explorer, integrity, and the
   upload/version workflow. Analysis logic lives in data.js + engine.js.
   ========================================================================== */

const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const el = (t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
const planById = id => PLANS.find(p=>p.id===id);
const sevOrder = {high:0,med:1,low:2};
const SECTORS = ["SMP","HTMP","EMP","LDS"];

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
    renderNetwork(); // re-read CSS colours
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

/* ---------- network diagram (hand-built SVG) ---------- */
const NET_POS={
  UDF :{x:410,y:60 ,w:210,h:54,label:"Urban Development Framework",short:"Framework",fill:"var(--accent)",ink:"var(--on-accent)"},
  UDMP:{x:410,y:196,w:220,h:48,label:"Urban Development Master Plan",short:"UDMP",fill:"var(--panel)",ink:"var(--ink)",stroke:"var(--accent)"},
  SMP :{x:110,y:392,w:140,h:56},HTMP:{x:305,y:392,w:140,h:56},
  EMP :{x:500,y:392,w:140,h:56},LDS :{x:700,y:392,w:150,h:56}
};
function buildNetEdges(){
  const edges=[];
  edges.push({a:"UDF",b:"UDMP",type:"hier"});
  SECTORS.forEach(s=>edges.push({a:"UDMP",b:s,type:"hier"}));
  const pairs={};
  OVERLAPS.forEach(o=>{
    const ds=o.docs.filter(d=>SECTORS.includes(d));
    for(let i=0;i<ds.length;i++)for(let j=i+1;j<ds.length;j++){
      const key=[ds[i],ds[j]].sort().join('|');
      if(!pairs[key])pairs[key]={a:key.split('|')[0],b:key.split('|')[1],type:"over",weight:0,sev:'low',topics:[]};
      pairs[key].weight++; pairs[key].topics.push(o.title);
      if(sevOrder[o.sev]<sevOrder[pairs[key].sev]) pairs[key].sev=o.sev;
    }
  });
  Object.values(pairs).forEach(p=>edges.push(p));
  return edges;
}
const NET_EDGES=buildNetEdges();
function sevColour(s){return s==='high'?'var(--hi)':s==='med'?'var(--med)':'var(--low)';}

function renderNetwork(){
  const W=820,H=540;
  const P=NET_POS;
  const nodeCenter=id=>({x:P[id].x,y:P[id].y});
  let edgeSvg='',nodeSvg='';
  NET_EDGES.forEach((e,i)=>{
    const a=nodeCenter(e.a),b=nodeCenter(e.b);
    if(e.type==='hier'){
      const y1=a.y+P[e.a].h/2, y2=b.y-P[e.b].h/2;
      edgeSvg+=`<path class="net-edge" data-a="${e.a}" data-b="${e.b}" d="M${a.x},${y1} C${a.x},${(y1+y2)/2} ${b.x},${(y1+y2)/2} ${b.x},${y2}" fill="none" stroke="var(--ink-2)" stroke-width="1.6" opacity=".55"/>`;
    } else {
      const dist=Math.abs(b.x-a.x), bow=46+dist*0.16;
      const midx=(a.x+b.x)/2, cy=a.y+P[e.a].h/2+bow;
      edgeSvg+=`<path class="net-edge over" data-a="${e.a}" data-b="${e.b}" data-topics="${e.topics.join(' ¦ ').replace(/"/g,'')}" d="M${a.x},${a.y+P[e.a].h/2-4} Q${midx},${cy} ${b.x},${b.y+P[e.b].h/2-4}" fill="none" stroke="${sevColour(e.sev)}" stroke-width="${1.6+e.weight*1.3}" stroke-dasharray="1 5" stroke-linecap="round" opacity=".85"/>`;
    }
  });
  Object.entries(P).forEach(([id,n])=>{
    const pl=planById(id);
    const stroke=n.stroke||(pl?pl.colour:'var(--line-2)');
    const fill=n.fill||'var(--panel)';
    const ink=n.ink||'var(--ink)';
    const short=n.short||(pl?pl.short:id);
    const x=n.x-n.w/2, y=n.y-n.h/2;
    const sw=id==='UDF'?0:(id==='UDMP'?1.5:2.5);
    const topbar = pl && pl.tier==='sector'
      ? `<rect x="${x}" y="${y}" width="${n.w}" height="4" rx="2" fill="${pl.colour}"/>` : '';
    nodeSvg+=`<g class="net-node" data-id="${id}" tabindex="0">
      <rect class="box" x="${x}" y="${y}" width="${n.w}" height="${n.h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" filter="url(#nsh)"/>
      ${topbar}
      <text x="${n.x}" y="${n.y+ (pl&&pl.tier==='sector'?2:5)}" text-anchor="middle" font-size="${id==='UDF'?16:14}" font-weight="600" fill="${ink}">${short}</text>
      ${pl&&pl.tier==='sector'?`<text x="${n.x}" y="${n.y+18}" text-anchor="middle" font-size="9.5" fill="var(--muted)" font-family="var(--font-mono)">${id}</text>`:''}
    </g>`;
  });
  $('#net-canvas').innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Document relationship network">
    <defs><filter id="nsh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0a1a55" flood-opacity="0.10"/></filter></defs>
    <g>${edgeSvg}</g><g>${nodeSvg}</g></svg>`;
  wireNetwork();
}
function wireNetwork(){
  const nodes=$$('#net-canvas .net-node'), edges=$$('#net-canvas .net-edge');
  const reset=()=>{nodes.forEach(n=>n.classList.remove('dim'));edges.forEach(e=>e.classList.remove('dim'));
    $('#net-title').textContent='Select a document';
    $('#net-desc').textContent='Hover a node to see everything it connects to — its parent, and every sibling plan it overlaps with.';
    $('#net-links').innerHTML='';};
  const focus=id=>{
    const connected=new Set([id]);
    NET_EDGES.forEach(e=>{if(e.a===id)connected.add(e.b);if(e.b===id)connected.add(e.a);});
    nodes.forEach(n=>n.classList.toggle('dim',!connected.has(n.dataset.id)));
    edges.forEach(ed=>{const on=ed.dataset.a===id||ed.dataset.b===id;ed.classList.toggle('dim',!on);});
    const pl=planById(id);
    $('#net-title').textContent=pl?pl.name:(id==='UDF'?'Urban Development Framework':'Urban Development Master Plan');
    $('#net-desc').textContent=(DOC_ALIGN[id]&&DOC_ALIGN[id].role)||'';
    let links='';
    NET_EDGES.filter(e=>e.type==='hier'&&(e.a===id||e.b===id)).forEach(e=>{
      const other=e.a===id?e.b:e.a; const down=e.a===id;
      links+=`<div class="linkitem"><b>${down?'delivered through':'governed by'}</b> · ${planById(other)?.short||(other==='UDF'?'Framework':'UDMP')}</div>`;
    });
    NET_EDGES.filter(e=>e.type==='over'&&(e.a===id||e.b===id)).sort((x,y)=>sevOrder[x.sev]-sevOrder[y.sev]).forEach(e=>{
      const other=e.a===id?e.b:e.a;
      links+=`<div class="linkitem"><span class="pill sev-${e.sev} dot" style="margin-bottom:6px">${e.weight} shared topic${e.weight>1?'s':''} · ${planById(other)?.short}</span><br>${e.topics.join('<br>')}</div>`;
    });
    $('#net-links').innerHTML=links||'<div class="linkitem mini">No sibling overlaps.</div>';
  };
  nodes.forEach(n=>{
    n.addEventListener('mouseenter',()=>focus(n.dataset.id));
    n.addEventListener('focus',()=>focus(n.dataset.id));
    n.addEventListener('click',()=>focus(n.dataset.id));
  });
  $('#net-canvas').addEventListener('mouseleave',reset);
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
