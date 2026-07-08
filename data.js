/* =============================================================================
   Hulhumalé Master Plan Alignment — baseline data
   Source of truth:
     - Urban Development Framework.xlsx  (sheet "Framework Objectives")
     - Master Plans/*.md  (Social, Transport, Environment, Landscape/Garden Island)
   Everything an analyst curated lives here. The engine (engine.js) reproduces
   the same keyword logic so uploaded plans re-score consistently.
   ========================================================================== */

/* ---- 1. THE OVERARCHING FRAMEWORK -------------------------------------------
   8 Policy Pillars -> 33 Strategic Objectives -> 133 Strategic Policy Directions.
   `kw` = keyword tags used by the auto-matcher to attribute uploaded actions. */
const FRAMEWORK = [
  { id:"1", title:"Balanced Urban Growth & Spatial Development",
    scope:"Managing population growth, land use, density distribution, and spatial efficiency.",
    kw:["population distribution","land use","density","mixed-use","mixed use","spatial","phased","expansion","reclaim","carrying capacity","growth area","intensification","plot","zoning"],
    objectives:[
      { id:"1.1", title:"Promote balanced population distribution across all areas under HDC's mandate",
        spds:[
          {id:"1.1.1", text:"Urban development should support a more balanced distribution of population across planned urban areas."},
          {id:"1.1.2", text:"Land use planning should contribute to equitable access to housing, services and economic opportunities."},
          {id:"1.1.3", text:"Development patterns should minimize excessive concentration of population in high-pressure areas."},
          {id:"1.1.4", text:"Population distribution should be aligned with infrastructure capacity and service availability."}]},
      { id:"1.2", title:"Manage urban growth to ensure efficient, coordinated and sustainable development",
        spds:[
          {id:"1.2.1", text:"Land use and infrastructure planning should be integrated to ensure coordinated and efficient urban development."},
          {id:"1.2.2", text:"Urban growth should be guided by the availability and capacity of infrastructure and services."},
          {id:"1.2.3", text:"Development phasing should be aligned with infrastructure provision to support sustainable growth."},
          {id:"1.2.4", text:"Planning processes should promote coordination across sectors and agencies involved in urban development."}]},
      { id:"1.3", title:"Optimize land use, density and mixed-use development to improve efficiency and accessibility",
        spds:[
          {id:"1.3.1", text:"Land use planning should promote efficient use of land through appropriate density and development intensity."},
          {id:"1.3.2", text:"Mixed-use development should be encouraged to enhance accessibility, reduce travel demand and support urban vitality."},
          {id:"1.3.3", text:"Underutilized land and existing built assets should be optimized to improve overall land efficiency."},
          {id:"1.3.4", text:"Density and land use should be aligned with infrastructure capacity and transport accessibility."}]},
      { id:"1.4", title:"Direct urban expansion to planned areas in a phased and context-responsive manner",
        spds:[
          {id:"1.4.1", text:"Urban expansion should be directed toward designated growth areas identified through long-term spatial planning."},
          {id:"1.4.2", text:"Development should be phased in alignment with infrastructure provision and population growth."},
          {id:"1.4.3", text:"Expansion areas should be planned in response to environmental conditions and local context."},
          {id:"1.4.4", text:"Unplanned or fragmented development beyond designated areas should be avoided."},
          {id:"1.4.5", text:"New development areas should be integrated with existing urban systems and networks."}]}
    ]},
  { id:"2", title:"Inclusive, Healthy & Livable Communities",
    scope:"Creating equitable, accessible, safe, and socially supportive urban environments for all population groups.",
    kw:["inclusive","inclusion","accessibility","universal design","community facilit","public space","public realm","park","recreation","engagement","participation","equity","vulnerable","disabilit","elderly","children","women","youth","wellbeing","social cohesion","safe"],
    objectives:[
      { id:"2.1", title:"Promote inclusive and equitable urban environments for all population groups",
        spds:[
          {id:"2.1.1", text:"Urban planning and design should respond to the needs of diverse population groups, including children, women and senior citizens."},
          {id:"2.1.2", text:"Development should promote safe, inclusive and supportive environments for all users."},
          {id:"2.1.3", text:"Urban environments should reduce social and spatial inequalities in access to opportunities and services."},
          {id:"2.1.4", text:"Planning approaches should foster inclusive communities and social cohesion."}]},
      { id:"2.2", title:"Enhance accessibility and universal design across urban spaces and services",
        spds:[
          {id:"2.2.1", text:"Urban environments should be designed to be accessible and usable by all individuals, regardless of age or ability."},
          {id:"2.2.2", text:"Public spaces, buildings and services should incorporate universal design principles."},
          {id:"2.2.3", text:"Barriers to accessibility in the built environment should be minimized."},
          {id:"2.2.4", text:"Accessibility considerations should be integrated into all stages of planning and development."}]},
      { id:"2.3", title:"Strengthen provision and accessibility of community facilities and social infrastructure",
        spds:[
          {id:"2.3.1", text:"Urban development should ensure adequate provision of community facilities to meet current and future needs."},
          {id:"2.3.2", text:"Community facilities should be equitably distributed and accessible to all residents."},
          {id:"2.3.3", text:"Planning should support integration of social infrastructure within residential areas."},
          {id:"2.3.4", text:"Community facilities should contribute to social wellbeing and community interaction."}]},
      { id:"2.4", title:"Improve quality, accessibility and usability of public spaces and the public realm",
        spds:[
          {id:"2.4.1", text:"Public spaces should be designed to be safe, inclusive and accessible for all users."},
          {id:"2.4.2", text:"Urban development should enhance the quality and usability of the public realm."},
          {id:"2.4.3", text:"Parks and recreational spaces should be integrated within urban areas to support health and wellbeing."},
          {id:"2.4.4", text:"Public spaces should encourage social interaction and active lifestyles."}]},
      { id:"2.5", title:"Promote community engagement and empowerment in urban development",
        spds:[
          {id:"2.5.1", text:"Planning processes should encourage community participation and engagement."},
          {id:"2.5.2", text:"Development approaches should support a sense of ownership and belonging among residents."},
          {id:"2.5.3", text:"Community input should be considered in shaping urban environments."},
          {id:"2.5.4", text:"Urban development should support community-led initiatives where appropriate."}]}
    ]},
  { id:"3", title:"Adequate & Affordable Housing",
    scope:"Ensuring access to diverse, affordable, resilient, and high-quality housing.",
    kw:["housing","affordab","dwelling","residential unit","tenure","typolog","home ownership","social housing","rent","apartment"],
    objectives:[
      { id:"3.1", title:"Increase availability of adequate housing to meet current and future demand",
        spds:[
          {id:"3.1.1", text:"Urban development should provide sufficient housing supply to meet current and projected population needs."},
          {id:"3.1.2", text:"Housing provision should be aligned with spatial growth strategies and infrastructure capacity."},
          {id:"3.1.3", text:"Planning should support timely delivery of housing across planned development areas."},
          {id:"3.1.4", text:"Housing development should be distributed to support balanced urban growth."}]},
      { id:"3.2", title:"Promote housing affordability across different income groups",
        spds:[
          {id:"3.2.1", text:"Housing development should support affordability across a range of income levels."},
          {id:"3.2.2", text:"Planning approaches should promote access to housing for low- and middle-income groups."},
          {id:"3.2.3", text:"Housing policies should encourage a mix of price points within residential developments."},
          {id:"3.2.4", text:"Affordability considerations should be integrated into housing and land use planning."}]},
      { id:"3.3", title:"Encourage a diverse range of housing typologies and tenures",
        spds:[
          {id:"3.3.1", text:"Housing development should include a variety of typologies to respond to different household needs."},
          {id:"3.3.2", text:"Planning should support a mix of housing tenures to enhance flexibility and accessibility."},
          {id:"3.3.3", text:"Housing provision should respond to changing demographic and social needs over time."},
          {id:"3.3.4", text:"Residential areas should support a balanced mix of housing types."}]},
      { id:"3.4", title:"Ensure housing quality, livability and accessibility standards",
        note:"Framework numbering bug: this objective's SPDs are labelled 3.3.1–3.3.4 in the source Excel, duplicating Objective 3.3. Should be 3.4.1–3.4.4.",
        spds:[
          {id:"3.4.1", srcId:"3.3.1", text:"Housing should provide safe, healthy and comfortable living environments."},
          {id:"3.4.2", srcId:"3.3.2", text:"Residential development should meet appropriate livability and design standards."},
          {id:"3.4.3", srcId:"3.3.3", text:"Housing should be accessible and adaptable to accommodate different user needs."},
          {id:"3.4.4", srcId:"3.3.4", text:"Housing environments should support overall wellbeing and quality of life."}]}
    ]},
  { id:"4", title:"Integrated Infrastructure & Urban Services",
    scope:"Providing reliable, integrated, and efficient urban infrastructure and utility systems.",
    kw:["infrastructure","utility","utilities","water","sewer","drainage","electricity","power","telecom","waste collection","service delivery","digital infrastructure","smart system","data platform","gis","iot","maintenance"],
    objectives:[
      { id:"4.1", title:"Ensure provision of reliable and efficient urban infrastructure and utility services",
        spds:[
          {id:"4.1.1", text:"Urban development should ensure the provision of essential infrastructure and utility services to meet current and future needs."},
          {id:"4.1.2", text:"Infrastructure systems should support reliable, safe and continuous service delivery."},
          {id:"4.1.3", text:"Infrastructure provision should be aligned with population distribution and urban growth patterns."},
          {id:"4.1.4", text:"Urban services should be planned to maintain functionality and long-term sustainability."}]},
      { id:"4.2", title:"Strengthen integration between infrastructure planning and urban development",
        spds:[
          {id:"4.2.1", text:"Infrastructure planning should be integrated with land use planning to support coordinated urban development."},
          {id:"4.2.2", text:"Urban growth should be guided by infrastructure capacity and service availability."},
          {id:"4.2.3", text:"Development phasing should be aligned with infrastructure provision and upgrades."},
          {id:"4.2.4", text:"Planning processes should promote coordination between agencies responsible for infrastructure and development."}]},
      { id:"4.3", title:"Improve efficiency and performance of urban service delivery",
        spds:[
          {id:"4.3.1", text:"Urban service delivery should be managed to ensure efficiency and effective use of resources."},
          {id:"4.3.2", text:"Infrastructure systems should support optimized operation and maintenance."},
          {id:"4.3.3", text:"Planning should promote improvements in service delivery performance over time."},
          {id:"4.3.4", text:"Service provision should respond to changing urban needs and demands."}]},
      { id:"4.4", title:"Promote digital infrastructure and smart systems to support urban management",
        spds:[
          {id:"4.4.1", text:"Urban development should support the integration of digital infrastructure within urban systems."},
          {id:"4.4.2", text:"Smart systems should be used to improve management, monitoring and delivery of urban services."},
          {id:"4.4.3", text:"Digital solutions should support data-driven decision-making and operational efficiency."},
          {id:"4.4.4", text:"Infrastructure planning should incorporate opportunities for technological innovation."}]}
    ]},
  { id:"5", title:"Climate Resilience & Environmental Management",
    scope:"Strengthening environmental resilience, climate adaptation, and long-term ecological sustainability.",
    kw:["climate","resilience","flood","coastal","erosion","sea level","storm surge","heat","cooling","canopy","tree","biodiversity","ecolog","green infrastructure","blue-green","low-carbon","carbon","emission","air quality","waste","pollution","environmental","disaster","shoreline"],
    objectives:[
      { id:"5.1", title:"Strengthen resilience to climate-related risks and hazards",
        spds:[
          {id:"5.1.1", text:"Urban development should respond to climate-related risks, including flooding, coastal impacts and extreme heat."},
          {id:"5.1.2", text:"Planning should incorporate measures to enhance resilience of urban areas to environmental hazards."},
          {id:"5.1.3", text:"Development should consider long-term climate projections and associated risks."},
          {id:"5.1.4", text:"Urban systems should be designed to maintain functionality under changing environmental conditions."}]},
      { id:"5.2", title:"Reduce environmental impact and support low-carbon urban development",
        spds:[
          {id:"5.2.1", text:"Urban development should promote efficient use of resources and reduce environmental impact."},
          {id:"5.2.2", text:"Planning should support low-carbon approaches to urban growth and development."},
          {id:"5.2.3", text:"Resource efficiency should be integrated into land use, infrastructure and building development."},
          {id:"5.2.4", text:"Development patterns should minimize environmental degradation over time."}]},
      { id:"5.3", title:"Protect and enhance natural systems and biodiversity",
        spds:[
          {id:"5.3.1", text:"Urban development should protect and enhance natural ecosystems and biodiversity."},
          {id:"5.3.2", text:"Green infrastructure should be integrated into urban areas to support ecological functions."},
          {id:"5.3.3", text:"Planning should maintain ecological connectivity and environmental integrity."},
          {id:"5.3.4", text:"Natural systems should be considered as part of the urban development framework."}]},
      { id:"5.4", title:"Improve environmental quality and urban living conditions",
        spds:[
          {id:"5.4.1", text:"Urban environments should maintain and improve air, water and overall environmental quality."},
          {id:"5.4.2", text:"Development should contribute to healthier and more comfortable urban living conditions."},
          {id:"5.4.3", text:"Planning should mitigate environmental stressors affecting urban areas."},
          {id:"5.4.4", text:"Environmental considerations should be integrated into all stages of urban development."}]}
    ]},
  { id:"6", title:"Sustainable Mobility & Connectivity",
    scope:"Creating safe, efficient, and accessible multimodal transport systems.",
    kw:["mobility","transport","pedestrian","walkab","cycling","bicycle","bike","bus","public transport","transit","road","street","crossing","connectivity","multimodal","parking","traffic","active mobility","ev","electric vehicle","last-mile"],
    objectives:[
      { id:"6.1", title:"Promote safe and accessible active mobility",
        spds:[
          {id:"6.1.1", text:"Urban environments should support safe, continuous and accessible walking and cycling."},
          {id:"6.1.2", text:"Street design should prioritize pedestrian and cyclist safety and comfort."},
          {id:"6.1.3", text:"Active mobility should be integrated into overall urban planning and development."},
          {id:"6.1.4", text:"Public spaces and streets should support inclusive and barrier-free movement."}]},
      { id:"6.2", title:"Strengthen public transport systems and accessibility",
        spds:[
          {id:"6.2.1", text:"Public transport should provide accessible, reliable and efficient mobility options."},
          {id:"6.2.2", text:"Urban development should support improved access to public transport services."},
          {id:"6.2.3", text:"Public transport systems should be integrated with surrounding land uses and activity areas."},
          {id:"6.2.4", text:"Planning should enhance connectivity between different transport modes."}]},
      { id:"6.3", title:"Improve connectivity and integration across the transport network",
        spds:[
          {id:"6.3.1", text:"Transport networks should be designed to improve connectivity within and between urban areas."},
          {id:"6.3.2", text:"Planning should promote integration between different modes of transport."},
          {id:"6.3.3", text:"Street networks should support efficient and legible movement."},
          {id:"6.3.4", text:"Connectivity should enhance access to services, employment and public spaces."}]},
      { id:"6.4", title:"Reduce reliance on private vehicles through integrated land use and transport planning",
        spds:[
          {id:"6.4.1", text:"Land use planning should support reduced dependence on private vehicles."},
          {id:"6.4.2", text:"Development patterns should promote proximity between housing, services and employment."},
          {id:"6.4.3", text:"Transport and land use planning should be coordinated to support sustainable mobility choices."},
          {id:"6.4.4", text:"Urban form should encourage the use of public and active transport over private vehicles."}]}
    ]},
  { id:"7", title:"Economic Development & Urban Competitiveness",
    scope:"Strengthening economic resilience, productivity, innovation, and investment attractiveness.",
    kw:["economic","employment","job","sme","small business","enterprise","commercial","market","business","innovation","entrepreneur","investment","tourism","competitiveness","livelihood","economy","skills","workforce"],
    objectives:[
      { id:"7.1", title:"Support local economic development and employment generation",
        spds:[
          {id:"7.1.1", text:"Urban development should support opportunities for local economic activity and employment."},
          {id:"7.1.2", text:"Planning should facilitate the growth and sustainability of small and medium enterprises."},
          {id:"7.1.3", text:"Economic activities should be integrated within urban areas to enhance accessibility and opportunity."},
          {id:"7.1.4", text:"Development should support a diverse and inclusive local economy."}]},
      { id:"7.2", title:"Enhance vitality and performance of commercial areas and urban centers",
        spds:[
          {id:"7.2.1", text:"Urban planning should support vibrant and active commercial areas and centers."},
          {id:"7.2.2", text:"Development should promote a mix of uses that enhance economic activity and footfall."},
          {id:"7.2.3", text:"Commercial areas should be designed to support accessibility, usability and economic performance."},
          {id:"7.2.4", text:"Planning should support the effective management and long-term viability of commercial spaces."}]},
      { id:"7.3", title:"Promote innovation, entrepreneurship and emerging economic sectors",
        spds:[
          {id:"7.3.1", text:"Urban development should support innovation and entrepreneurship within the urban economy."},
          {id:"7.3.2", text:"Planning should enable spaces and environments that support emerging and creative industries."},
          {id:"7.3.3", text:"Economic development should respond to evolving market trends and opportunities."},
          {id:"7.3.4", text:"Urban environments should support knowledge-based and creative economic activities."}]},
      { id:"7.4", title:"Strengthen economic competitiveness and investment attractiveness",
        spds:[
          {id:"7.4.1", text:"Urban development should enhance the attractiveness of the city as a place for investment and economic activity."},
          {id:"7.4.2", text:"Planning should support the development of economic clusters and specialized areas."},
          {id:"7.4.3", text:"Urban environments should support tourism and related economic activities."},
          {id:"7.4.4", text:"Development should contribute to long-term economic resilience and competitiveness."}]}
    ]},
  { id:"8", title:"Urban Governance & Institutional Capacity",
    scope:"Strengthening governance systems, implementation capacity, coordination, financial management, and accountability.",
    kw:["governance","coordination","inter-agency","interdepartmental","compliance","enforcement","financial","asset management","budget","data-driven","monitoring","accountability","transparency","implementation","institutional","policy","regulation","grievance","stakeholder"],
    objectives:[
      { id:"8.1", title:"Strengthen integrated urban governance and interdepartmental coordination",
        spds:[
          {id:"8.1.1", text:"Urban governance should promote coordination across departments and agencies involved in planning and development."},
          {id:"8.1.2", text:"Planning and development processes should be aligned to support efficient and consistent decision-making."},
          {id:"8.1.3", text:"Development control mechanisms should ensure compliance with established planning policies and frameworks."},
          {id:"8.1.4", text:"Institutional arrangements should support integrated and streamlined urban management."}]},
      { id:"8.2", title:"Enhance financial and asset management for sustainable urban development",
        spds:[
          {id:"8.2.1", text:"Urban development should be supported by sustainable and well-aligned financial planning."},
          {id:"8.2.2", text:"Asset management approaches should optimize long-term value and performance of urban assets."},
          {id:"8.2.3", text:"Financial considerations should be integrated into planning and development decision-making."},
          {id:"8.2.4", text:"Resource allocation should support strategic priorities and efficient urban development."}]},
      { id:"8.3", title:"Establish data-driven, digital and transparent governance systems",
        spds:[
          {id:"8.3.1", text:"Urban planning and management should be supported by reliable data and information systems."},
          {id:"8.3.2", text:"Digital systems should be used to improve efficiency, transparency and coordination."},
          {id:"8.3.3", text:"Data governance should support informed decision-making and monitoring of urban development."},
          {id:"8.3.4", text:"Information systems should enable integration across departments and functions."}]},
      { id:"8.4", title:"Improve implementation capacity, performance management and accountability",
        spds:[
          {id:"8.4.1", text:"Urban development should be supported by clear implementation frameworks and processes."},
          {id:"8.4.2", text:"Performance management systems should be used to monitor progress and outcomes."},
          {id:"8.4.3", text:"Institutional capacity should be strengthened to support effective delivery of urban initiatives."},
          {id:"8.4.4", text:"Governance systems should promote accountability and continuous improvement."}]}
    ]}
];

/* ---- 2. THE PLANS -----------------------------------------------------------
   Each theme lists the framework pillars it feeds (primary/secondary/touch) and
   a few representative actions. `file` matches the uploaded filename stem so the
   engine can replace a plan's parsed content on upload. */
const PLANS = [
  { id:"UDMP", name:"Urban Development Master Plan (booklet)", short:"UDMP", tier:"masterplan",
    status:"draft", file:"HULHUMAL", colour:"#6366f1",
    note:"Structural spine. Its 8 themes map 1:1 onto the 8 framework pillars, but the booklet is narrative — Masterplan Strategy, Character Areas, Priority Projects and KPIs are still placeholders and it carries no action layer that links down to the sector plans.",
    themes:[
      {id:"U1", title:"Th01 Balanced Urban Growth & Spatial Development", pillars:{primary:["1"]}},
      {id:"U2", title:"Th02 Inclusive, Healthy & Livable Communities", pillars:{primary:["2"]}},
      {id:"U3", title:"Th03 Adequate & Affordable Housing", pillars:{primary:["3"]}},
      {id:"U4", title:"Th04 Integrated Infrastructure & Urban Services", pillars:{primary:["4"]}},
      {id:"U5", title:"Th05 Climate Resilience & Environmental Management", pillars:{primary:["5"]}},
      {id:"U6", title:"Th06 Sustainable Mobility & Connectivity", pillars:{primary:["6"]}},
      {id:"U7", title:"Th07 Economic Development & Urban Competitiveness", pillars:{primary:["7"]}},
      {id:"U8", title:"Th08 Urban Governance & Institutional Capacity", pillars:{primary:["8"]}}
    ]},
  { id:"SMP", name:"Social Development Masterplan", short:"Social", tier:"sector",
    status:"v1.0 draft", file:"Social_Development", colour:"#ec4899",
    themes:[
      {id:"S1", title:"Governance", pillars:{primary:["8"], secondary:["1","4"]},
        actions:["Standardised review & participatory planning framework (5.1.1)","Integrate social indicators into urban plans (5.1.1.2)","Centralised data hub / GIS planning system + Urban Management System (5.1.4.1)","Grievance redress & monitoring (5.1.2.2)"]},
      {id:"S2", title:"Social Equity & Inclusion", pillars:{primary:["2"], secondary:["1","6","3"]},
        actions:["Designated plots for commercial/institutional uses in P2 (5.2.1)","Multi-functional community service hubs (5.2.2)","Digital kiosks / multilingual service delivery (5.2.4)","Retrofit ramps, tactile paving, accessible crossings (5.2.5)"]},
      {id:"S3", title:"Community Wellbeing & Safety", pillars:{primary:["2"], secondary:["5","6","3"]},
        actions:["City-wide lighting audit & CCTV expansion (5.3.1)","Community engagement spaces & town halls (5.3.2)","Healthcare space allocation, mental health, walkability, NCDs (5.3.3)","Green cover / urban cooling / waste segregation / disaster plan (5.3.4)","Pedestrian infra & road safety, bus-stop access (5.3.5)","Community areas in developments & affordable housing (5.3.6)"]},
      {id:"S4", title:"Economic Sustainability", pillars:{primary:["7"], secondary:["2"]},
        actions:["Demand-driven skills training & apprenticeships (5.4.1)","Co-working / SME / resource-sharing hubs (5.4.2)","Government satellite offices (5.4.3)","Urban farming, community markets, food security (5.4.4)","Green & blue economy, tourism, local retail (5.4.5)"]}
    ]},
  { id:"HTMP", name:"Transport Masterplan", short:"Transport", tier:"sector",
    status:"draft", file:"Transport_Masterplan", colour:"#0ea5e9",
    themes:[
      {id:"T1", title:"Efficient & Accessible Public Transportation System", pillars:{primary:["6"], secondary:["2","4"]},
        actions:["Integrated multimodal system & feeder services / last-mile","Universal transit payment system","Bus Rapid Transit (BRT) spine","Accessible transit hubs, dedicated bus lanes, bus-stop design standard","RTPI, demand prediction, MaaS app, Smart Mobility Management Platform","Subsidised fares for vulnerable groups; proactive Phase-2 provision"]},
      {id:"T2", title:"Sustainable Transportation Modes", pillars:{primary:["6"], secondary:["5","2"]},
        actions:["Pedestrian priority zones & citywide pedestrian network","Integrated cycling network & shared micro-mobility","Public EV charging, fleet transition, incentives","Green verges, street tree canopy, blue-green mobility corridors","Parking management, TDM, pricing instruments"]},
      {id:"T3", title:"Intelligent Traffic Management System", pillars:{primary:["6"], secondary:["4","8"]},
        actions:["Citywide signalised intersection network & adaptive control","Real-time traffic monitoring & data governance framework","Smart parking & curbside management","Integrated land use & transport planning","IoT / connected mobility & cybersecurity"]},
      {id:"T4", title:"Environmental Integration (green verges, lighting, heat)", pillars:{primary:["5"], secondary:["6"]},
        actions:["Protection & restoration of green verges","Roadside greening & tree canopy","Energy-efficient / solar public lighting","Reduced urban-heat retention surfaces"]}
    ]},
  { id:"EMP", name:"Environment Master Plan", short:"Environment", tier:"sector",
    status:"v2 draft 1.0", file:"Environment_Master_Plan", colour:"#22c55e",
    themes:[
      {id:"E1", title:"Open Environmental Governance, GIS & Public Data", pillars:{primary:["8"], secondary:["4"]},
        actions:["Central Environmental GIS Repository","Open environmental data portal & data classification register","Service-provider & CSO data-sharing MOUs","Six-month complaint summaries & ESG data"]},
      {id:"E2", title:"Coastal, Climate, Water & Disaster Resilience", pillars:{primary:["5"], secondary:["4"]},
        actions:["Shoreline trend & coastal asset mapping","Water pooling hotspots & passive drainage audit","Water security & non-potable reuse","Disaster preparedness layers; climate risk in approvals"]},
      {id:"E3", title:"Blue-Green Infrastructure, Urban Cooling & Biodiversity", pillars:{primary:["5"], secondary:["2"]},
        actions:["Public tree & vegetation inventory","Canopy/shade maps & annual urban heat map","Cooling corridors; blue-green corridor network","Biodiversity monitoring & habitat sites; green space audits"]},
      {id:"E4", title:"Waste, Pollution Prevention & Environmental Health", pillars:{primary:["5"], secondary:["2"]},
        actions:["Waste collection & bin network mapping; WAMCO performance data","Source segregation & organic recovery pilots","Hazardous waste pathway","Construction dust control; air/dust/noise sensors; marine litter"]},
      {id:"E5", title:"Low-Carbon Buildings, Energy, Solar & Utility Resilience", pillars:{primary:["4"], secondary:["5"]},
        actions:["Hulhumalé Green Building Performance Standard","Solar potential & shared-solar models","HDC building energy audits","Public utility data & utility resilience layers; STELCO/MWSC MOUs"]},
      {id:"E6", title:"Sustainable Mobility, Access & Public Realm", pillars:{primary:["6"], secondary:["2"]},
        actions:["Walkability indicator framework & priority walking network","Shade & public-realm comfort mapping","Accessibility barrier mapping","Public transport access, cycling network, parking conflict maps; corridor upgrades"]},
      {id:"E7", title:"Delivery, Compliance, Partnerships & Public Reporting", pillars:{primary:["8"], secondary:["4"]},
        actions:["EMP Delivery Unit & master action tracker","GIS-Based Environmental Decision Gate","Public complaint logging & dashboards","Annual State of the Environment report; five-year reviews"]}
    ]},
  { id:"LDS", name:"Garden Island – Landscape Masterplan", short:"Landscape", tier:"sector",
    status:"draft (merging Garden Island + LDS)", file:"LDS_Masterplan", altFile:"GARDEN_ISLAND", colour:"#f59e0b",
    note:"Two documents being combined: the delivered 'Garden Island' initiative (2024) and the new LDS Landscape Masterplan draft. Targets and action IDs differ between them and must be reconciled during the merge.",
    themes:[
      {id:"L1", title:"Enhancing Pedestrian Experience", pillars:{primary:["6"], secondary:["2"]},
        actions:["Citywide pedestrian connectivity network","Universal accessibility / Universal Design Standards","Shaded streets & comfortable public realm","Wayfinding & public-realm identity; streetscape management"]},
      {id:"L2", title:"Green Development", pillars:{primary:["2"], secondary:["5"]},
        actions:["City & destination parks; upgrade Central Park","Neighborhood & pocket parks","Recreation & sports hubs","Inclusive & family-oriented spaces; waterfront & beach recreation"]},
      {id:"L3", title:"Green Forest", pillars:{primary:["5"], secondary:["2"]},
        actions:["Citywide tree planting (25,000 trees by 2040) & 30% canopy","Urban Forest Management Plan & tree inventory","Native species & biodiversity corridors","Bioswales/rain gardens; community stewardship"]},
      {id:"L4", title:"Green Economic Activation", pillars:{primary:["7"], secondary:["2"]},
        actions:["Landscape-integrated SME & market spaces","Waterfront activation & events","Green tourism & recreation economy","Urban agriculture & local produce markets"]}
    ]}
];

/* ---- 3. CURATED FINDINGS ----------------------------------------------------
   sev: high | med | low.  `docs` = plans involved.  `change` = which document(s)
   need textual realignment and how. */
const GAPS = [
  { spd:"1.3", pillar:"1", sev:"high", title:"Density, mixed-use & land-efficiency optimization has no sector-plan action",
    detail:"SPD 1.3.1–1.3.4 (appropriate density, mixed-use, optimizing underutilized land) sit only in the UDMP narrative. No sector master plan proposes actions to deliver density/mixed-use outcomes.",
    change:"UDMP should add a Land Use & Density action layer (or a dedicated Land Use Plan) with measurable actions; sector plans reference it.",
    signals:["density optimization","mixed-use development","development intensity","land efficiency","underutilized land","intensification"] },
  { spd:"1.4", pillar:"1", sev:"med", title:"Phased, context-responsive expansion is narrative-only",
    detail:"SPD 1.4.1–1.4.5 (directing expansion to designated growth areas, phasing with infrastructure) appears in UDMP history/Phase-3 discussion but has no tracked actions.",
    change:"UDMP Implementation Framework > Development Phasing should carry explicit phasing actions tied to infrastructure triggers.",
    signals:["designated growth areas","development phasing","phased expansion","expansion areas","phasing action"] },
  { spd:"3.1", pillar:"3", sev:"high", title:"Housing supply delivery is unowned at the action level",
    detail:"SPD 3.1 (sufficient supply, timely delivery, distribution) is described in UDMP Theme 03 but no master plan holds delivery actions. Social plan only touches affordability (3.2) and quality (3.4) via 5.3.6.",
    change:"Needs a Housing delivery action set — either a Housing Master Plan or a UDMP housing action layer. Flag for review at master-plan level.",
    signals:["housing supply","housing delivery","housing units delivered","housing provision","dwelling supply"] },
  { spd:"3.3", pillar:"3", sev:"med", title:"Housing typology & tenure diversity not actioned",
    detail:"SPD 3.3 (variety of typologies, mix of tenures) is aspirational in UDMP with no delivering action.",
    change:"UDMP or a Housing plan should set typology-mix and tenure-mix requirements.",
    signals:["housing typolog","mix of tenures","housing tenure","variety of typologies","housing types"] },
  { spd:"4.1", pillar:"4", sev:"med", title:"Utilities are mapped but not provisioned",
    detail:"EMP maps utility corridors/resilience and Transport handles mobility infrastructure, but SPD 4.1 (provision of water/sewer/power/telecom to meet demand) has no master plan owning the provisioning actions — only data/mapping.",
    change:"Confirm whether utility provisioning lives in a separate HDC infrastructure programme; if so, reference it from UDMP Theme 04. Otherwise flag as an action gap.",
    signals:["utility provision","provision of water","sewerage capacity","water supply capacity","utility service provision","expand utility"] },
  { spd:"7.3", pillar:"7", sev:"high", title:"Innovation & emerging sectors have no delivering action",
    detail:"SPD 7.3 (innovation, entrepreneurship, creative/knowledge industries, Knowledge Park) is in UDMP land-use typologies and Theme 07 narrative, but neither Social nor Landscape economic themes deliver it — they focus on SMEs, markets and livelihoods.",
    change:"UDMP Theme 07 needs an innovation/knowledge-economy action layer, or assign to Social 5.4 as a new objective.",
    signals:["innovation hub","knowledge economy","creative industries","incubator","tech-incubator","research center","knowledge park"] },
  { spd:"7.4", pillar:"7", sev:"med", title:"Investment attractiveness & economic clusters unactioned",
    detail:"SPD 7.4 (investment attractiveness, economic clusters, tourism, long-term competitiveness) is narrative-only in UDMP.",
    change:"UDMP Implementation Framework should add economic-competitiveness actions; Landscape 4.3 (green tourism) partially contributes and should cross-reference.",
    signals:["investment attractiveness","economic cluster","attract investment","economic competitiveness","specialized areas"] },
  { spd:"8.2", pillar:"8", sev:"high", title:"Financial & asset management barely addressed",
    detail:"SPD 8.2 (financial planning, asset management, resource allocation) is not meaningfully covered by any plan. EMP/SMP governance themes focus on data, coordination and delivery, not finance or asset lifecycle.",
    change:"Add financial & asset-management actions at the UDMP governance/implementation level. Flag for review at master-plan level.",
    signals:["asset management","financial planning","resource allocation","capital budget","lifecycle cost","financial sustainability"] }
];

const OVERLAPS = [
  { sev:"high", pillar:"4", title:"Three parallel city data platforms proposed independently",
    docs:["EMP","SMP","HTMP"],
    detail:"EMP proposes a 'Central Environmental GIS Repository / Open Environmental Data portal' (E1); Social proposes a 'centralised Urban Management System / GIS planning data hub' (5.1.4); Transport proposes a 'Smart Mobility Management Platform' + Transport Operations Centre (T3). Three overlapping data/GIS platforms with overlapping datasets and governance.",
    change:"Designate ONE integrated city data/GIS platform (Framework Pillar 8.3 / UDMP Theme 08 governance). Recast each plan's system as a themed module of it. Edit EMP E1, SMP 5.1.4 and HTMP T3 to cross-reference the shared platform and a single data-governance owner (Planning Division GIS Team)." },
  { sev:"high", pillar:"5", title:"Tree-planting & canopy targets conflict across documents",
    docs:["LDS","EMP"],
    detail:"Garden Island (2024) states 'Plant 25,000 trees by 2025'; the new LDS draft states '25,000 trees by 2040 & 30% canopy'; EMP sets canopy/heat targets and a tree inventory with 85% survival. Same programme, three different targets/dates.",
    change:"Landscape (owner of Green Forest / urban forestry) sets the canonical tree & canopy target and date. EMP references it (EMP owns the monitoring/inventory data). Update the Garden Island figure during the merge so the combined document is internally consistent." },
  { sev:"high", pillar:"6", title:"Walkability / pedestrian realm owned by four plans",
    docs:["HTMP","LDS","EMP","SMP"],
    detail:"Pedestrian network & shade appear in Transport T2 (active mobility), Landscape L1 (pedestrian experience), Environment E6 (walkability indicators & corridor upgrades) and Social 5.3.5 (pedestrian safety). Risk of duplicated corridors, standards and KPIs.",
    change:"Assign scope: Transport owns network design & standards; Landscape owns public-realm/shade design & delivery; Environment owns walkability data/indicators & heat linkage; Social owns the safety dimension. Add a scope-boundary note in each of the four plans pointing to the others." },
  { sev:"med", pillar:"2", title:"Universal accessibility / universal design standard duplicated",
    docs:["LDS","SMP","HTMP","EMP"],
    detail:"Landscape L1.2 proposes 'Adopt Universal Design Standards'; Social 5.2.5 retrofits ramps/tactile paving; Transport sets accessible-hub/bus-stop standards; Environment E6 maps accessibility barriers. Multiple standards risk diverging.",
    change:"Establish a single citywide Universal Design Standard (recommend Landscape/UDMP as owner). Social, Transport and Environment reference and apply it rather than each defining their own." },
  { sev:"med", pillar:"7", title:"SME / market spaces proposed by two plans",
    docs:["SMP","LDS"],
    detail:"Social 5.4.2 proposes co-working/SME/resource-sharing hubs; Landscape L4.1 proposes landscape-integrated SME & market spaces (one SME hub per neighbourhood). Overlapping physical provision and targets.",
    change:"Split responsibility: Landscape delivers the physical space typology & public-realm market design; Social delivers the enterprise-support programmes & tenancy models. Cross-reference so 'one SME hub per neighbourhood' is a single shared target, not two." },
  { sev:"med", pillar:"5", title:"Green/blue corridors & biodiversity in both Environment and Landscape",
    docs:["EMP","LDS"],
    detail:"EMP E3 maps blue-green corridors, biodiversity monitoring and green-space condition; Landscape L3 delivers biodiversity corridors, native planting and green infrastructure. Same corridors, different documents.",
    change:"Environment owns environmental monitoring/data & performance targets; Landscape owns corridor design, planting palettes & delivery. State this division explicitly in EMP E3 and LDS L3." },
  { sev:"med", pillar:"5", title:"Urban cooling / heat mitigation appears in three plans",
    docs:["EMP","LDS","SMP"],
    detail:"EMP E3 (cooling corridors, urban heat map), Landscape L1.3/L3 (shaded streets, canopy) and Social 5.3.4.2 (green cover for cooling). Coordinated intent, uncoordinated actions.",
    change:"Use the shared canopy/cooling target from the tree-target realignment. Social references Landscape+Environment rather than proposing its own cooling action." },
  { sev:"low", pillar:"6", title:"Cycling / micro-mobility network in three plans",
    docs:["HTMP","EMP","LDS"],
    detail:"Transport builds the integrated cycling network & shared micro-mobility; Environment maps the cycling network & conflict points; Landscape creates green pedestrian/cycle links. Minor duplication of network definition.",
    change:"Transport is the network owner; Environment provides the conflict/gap data; Landscape provides greened links. Cross-reference in each." }
];

/* Framework / document integrity issues (not gaps or overlaps — errors to fix). */
const INTEGRITY = [
  { sev:"med", doc:"Urban Development Framework.xlsx", title:"Objective 3.4 SPDs mis-numbered",
    detail:"Under Objective 3.4 (housing quality/livability) the Strategic Policy Directions are numbered 3.3.1–3.3.4, duplicating Objective 3.3's numbering.",
    change:"Renumber to 3.4.1–3.4.4 in the Excel." },
  { sev:"low", doc:"Social Development Masterplan", title:"Duplicate action ID 5.2.1.1.2 under Theme 2",
    detail:"A sub-action under objective 5.2.6 is labelled '5.2.1.1.2' (line ~3342), duplicating an ID already used under 5.2.1.",
    change:"Renumber to the correct 5.2.6.x sequence." },
  { sev:"low", doc:"Urban Development Framework.xlsx", title:"Pillar title typos",
    detail:"'Integrated nfrastructure' (Pillar 4) and 'competetiveness' (Pillar 7) are misspelled in the source.",
    change:"Correct spelling in the Excel titles." },
  { sev:"med", doc:"UDMP booklet", title:"No action layer linking down to sector plans",
    detail:"Masterplan Strategy, Character Areas, Priority Projects and KPIs are placeholders. The booklet does not yet reference the sector plans that hold the delivering actions.",
    change:"Add an action-crosswalk appendix in the UDMP mapping each theme to the contributing sector-plan actions (this tool generates the baseline)." }
];

/* ---- 4. PER-DOCUMENT ALIGNMENT --------------------------------------------
   For each document: what it owns, what's missing from it, what to add (and
   where), and how it should realign with sibling documents. Synthesised from
   GAPS / OVERLAPS / INTEGRITY plus pillar coverage. `where` = the section to edit. */
const DOC_ALIGN = {
  UDF:{
    role:"The overarching policy layer. 8 pillars → 33 objectives → 133 policy directions. Every plan must trace upward to it.",
    owns:["1","2","3","4","5","6","7","8"],
    missing:[
      {sev:"med", text:"No downward crosswalk — policy directions don't record which master plan is meant to deliver them."},
      {sev:"med", text:"Objective 3.4's directions are mis-numbered 3.3.1–3.3.4, duplicating Objective 3.3."},
      {sev:"low", text:"Pillar titles contain typos ('nfrastructure', 'competetiveness')."}],
    add:[
      {sev:"med", what:"A 'Delivered by' column mapping each objective/direction to the owning master plan + action ID.", where:"New column in the Framework Objectives sheet"},
      {sev:"med", what:"Renumber Objective 3.4's directions to 3.4.1–3.4.4.", where:"Excel rows for Objective 3.4"},
      {sev:"low", what:"Correct the pillar-title spelling.", where:"Pillar 4 & Pillar 7 titles"}],
    realign:[
      {with:["UDMP"], text:"Framework pillars and UDMP themes are 1:1 — keep the titles identical so the mapping stays legible."}]
  },
  UDMP:{
    role:"The structural spine / booklet. Its 8 themes equal the 8 framework pillars, but it is narrative — it holds no action layer.",
    owns:["1","2","3","4","5","6","7","8"],
    missing:[
      {sev:"high", text:"No action layer: Masterplan Strategy, Priority Projects and KPIs are placeholders and nothing links down to the sector plans."},
      {sev:"high", text:"Density & mixed-use (1.3) and phased expansion (1.4) are discussed but never actioned."},
      {sev:"high", text:"Housing supply (3.1) and typology/tenure diversity (3.3) have no delivering action."},
      {sev:"high", text:"Innovation / knowledge economy (7.3) and investment / competitiveness (7.4) are narrative-only."},
      {sev:"high", text:"Financial & asset management (8.2) is barely addressed by any document."}],
    add:[
      {sev:"high", what:"An action-crosswalk appendix mapping each theme to the contributing sector-plan actions (this tool generates the baseline).", where:"New appendix / Implementation Framework"},
      {sev:"high", what:"A Land Use & Density action set — measurable targets for density, mixed-use and land optimization.", where:"Theme 01 / Overall Land Use Planning"},
      {sev:"high", what:"A housing action layer, or a referenced Housing Master Plan (supply, delivery, typology mix, tenure mix).", where:"Theme 03"},
      {sev:"high", what:"Innovation & knowledge-economy actions (Knowledge Park, incubators, creative industries).", where:"Theme 07"},
      {sev:"med", what:"Economic-competitiveness plus financial & asset-management actions.", where:"Theme 07 / Theme 08 / Implementation Framework"},
      {sev:"high", what:"Designate ONE integrated city data platform and reference it as the parent of the sector systems.", where:"Theme 08 Governance"}],
    realign:[
      {with:["SMP","HTMP","EMP","LDS"], text:"Add explicit references so each theme names the sector plan(s) that deliver it."}]
  },
  SMP:{
    role:"Sector plan. Primary owner of governance-of-social (Pillar 8), inclusion (Pillar 2) and economic-social (Pillar 7). Rich action layer.",
    owns:["8","2","7"],
    missing:[
      {sev:"med", text:"Duplicate action ID 5.2.1.1.2 appears under Theme 2 (should sit in the 5.2.6 sequence)."},
      {sev:"low", text:"Innovation / knowledge economy (7.3) isn't picked up despite Social owning the economic-social theme."}],
    add:[
      {sev:"low", what:"Consider an objective under 5.4 on innovation / creative-economy support to help close framework gap 7.3.", where:"Theme 4 · Economic Sustainability"},
      {sev:"med", what:"Fix the duplicate sub-action ID.", where:"Objective 5.2.6"}],
    realign:[
      {with:["EMP","HTMP"], text:"Recast the 'Urban Management System' (5.1.4) as a module of the single shared city data platform, not a separate system."},
      {with:["LDS"], text:"Split SME provision — Social owns enterprise programmes & tenancy; Landscape owns the physical market/SME space. Share one 'SME hub per neighbourhood' target."},
      {with:["LDS","HTMP","EMP"], text:"Reference the shared Universal Design Standard instead of defining accessibility retrofits independently (5.2.5)."},
      {with:["LDS","EMP"], text:"Point the cooling / green-cover action (5.3.4.2) to Landscape + Environment targets rather than a standalone measure."}]
  },
  HTMP:{
    role:"Sector plan. Primary owner of mobility (Pillar 6). Four themes: public transport, sustainable modes, intelligent traffic management, green integration.",
    owns:["6"],
    missing:[
      {sev:"low", text:"Transport 'asset management' (road / ITMS) is distinct from framework 8.2 (urban financial & asset management) — it should not be read as covering 8.2."}],
    add:[
      {sev:"low", what:"A scope-boundary note clarifying Transport owns network design + standards for walkability & cycling.", where:"Theme 2 · active-mobility introduction"}],
    realign:[
      {with:["EMP","SMP"], text:"Recast the 'Smart Mobility Management Platform' (T3) as the mobility module of the shared city data platform."},
      {with:["LDS","EMP","SMP"], text:"Walkability: Transport owns network + standards; cross-reference Landscape (public realm/shade), Environment (indicators/data), Social (safety)."},
      {with:["EMP","LDS"], text:"Cycling network: Transport is the owner; Environment supplies conflict/gap data; Landscape supplies greened links."},
      {with:["LDS"], text:"Green verges / roadside canopy (T4) overlaps Landscape's Green Forest — align target and ownership."}]
  },
  EMP:{
    role:"Sector plan. Primary owner of climate & environment (Pillar 5) and environmental data governance. Seven themes with action + KPI tables.",
    owns:["5","4","8"],
    missing:[
      {sev:"low", text:"Utility provisioning (4.1) is mapped and monitored but not provisioned here — confirm which programme owns provisioning."}],
    add:[
      {sev:"low", what:"A note that EMP owns environmental data & monitoring, not utility provisioning.", where:"Theme 5 · utilities"}],
    realign:[
      {with:["SMP","HTMP"], text:"Recast the 'Central Environmental GIS Repository' (E1) as the environmental module of the single shared platform."},
      {with:["LDS"], text:"Tree / canopy: adopt Landscape's canonical 25,000-tree & canopy target; EMP owns the inventory & monitoring data."},
      {with:["LDS"], text:"Blue-green corridors & biodiversity: EMP owns monitoring & targets, Landscape owns corridor design & planting — state the split in E3."},
      {with:["HTMP","LDS"], text:"Walkability: EMP provides indicators & data; defer network design to Transport and public-realm design to Landscape (E6)."}]
  },
  LDS:{
    role:"Sector plan. Landscape & public-realm delivery. A merge of Garden Island (2024) + the LDS Landscape draft. Contributes to Pillars 2, 5, 6, 7.",
    owns:["2","5","6","7"],
    missing:[
      {sev:"high", text:"Tree-planting target conflicts across the two documents being merged (25,000 by 2025 vs 25,000 by 2040) — must be reconciled."},
      {sev:"med", text:"Garden Island action IDs (1.x–5.x) differ from the LDS theme/focus IDs — reconcile numbering in the merged document."}],
    add:[
      {sev:"high", what:"Set the canonical tree & canopy target + date for the merged document.", where:"Green Forest theme"},
      {sev:"med", what:"Adopt or author the citywide Universal Design Standard that the other plans will reference.", where:"Enhancing Pedestrian Experience · Focus 1.2"},
      {sev:"med", what:"A crosswalk reconciling Garden Island action IDs with LDS theme/focus IDs.", where:"Merged-document front matter"}],
    realign:[
      {with:["SMP"], text:"SME / market spaces: Landscape delivers the physical space; Social delivers the enterprise programmes. Share one target."},
      {with:["HTMP","EMP","SMP"], text:"Own the public-realm / shade design of walkability; cross-reference Transport (network), Environment (data), Social (safety)."},
      {with:["EMP"], text:"Biodiversity / green corridors: Landscape owns design & planting; Environment owns monitoring & targets."}]
  }
};

/* Convenience: flat SPD list + pillar lookup, built once. */
const SPD_INDEX = (() => {
  const list=[]; const pillarById={};
  for(const p of FRAMEWORK){ pillarById[p.id]=p;
    for(const o of p.objectives) for(const s of o.spds)
      list.push({id:s.id, text:s.text, pillar:p.id, objective:o.id}); }
  return {list, pillarById};
})();

/* ---- 5. MIND MAP -----------------------------------------------------------
   Curated collapsible-tree model for the Document Mind Map view: the six plans,
   the shared foundation, an 18-domain overlap map (each node carries verbatim
   plan quotes + an alignment insight), and cross-cutting recommendations.
   MM_PLAN = the mind map's own plan taxonomy (U/S/T/L/G/E — Landscape 2026 and
   Garden Island 2024 kept distinct while they merge). MM_SC = status colours. */
const MM_PLAN = {
  U:{name:"Hulhumalé Urban Development Masterplan (Booklet v3)",color:"#6366f1"},
  S:{name:"Social Development Masterplan (v01, 29/03/2026)",color:"#ec4899"},
  T:{name:"Hulhumalé Transport Masterplan (draft)",color:"#0ea5e9"},
  L:{name:"Garden Island — Landscape Masterplan (v01, 29/03/2026)",color:"#f59e0b"},
  G:{name:"Garden Island 2024 (supporting source to Landscape MP '26)",color:"#b45309"},
  E:{name:"Environment Master Plan V2 (Draft 1.0, June 2026)",color:"#22c55e"}
};
const MM_SC = {green:"var(--ok)",amber:"var(--med)",red:"var(--hi)",blue:"var(--accent)",plan:"var(--muted)",root:"var(--ink)",group:"var(--ink-2)"};

const MINDMAP = {
name:"HDC · Hulhumalé Masterplan System", status:"root", detail:{
 summary:"Planning documents produced under HDC's Planning Division: one umbrella Urban Development Masterplan, four sector plans (Social, Transport, Landscape 2026 — primary, Environment), and one supporting source document (Garden Island 2024, feeding the Landscape MP). This map shows where they overlap, where they duplicate each other, and where alignment would produce a more cohesive combined output.",
 quotes:[],
 insight:"The plans share a genuine common foundation (joint stakeholder consultations, same GIS base, same city context) but were drafted by different sections with different structures, KPI styles and delivery mechanisms. 8 red-flag duplications and 9 coordination overlaps are mapped below."
}, children:[
{name:"The Plans", status:"group", detail:{summary:"Reference branch — the umbrella plan, four sector plans, and one supporting source document (Garden Island 2024, nested under the primary Landscape MP 2026).",quotes:[],insight:""}, children:[
 {name:"Urban Development MP (umbrella)", status:"plan", plans:["U"], detail:{
  summary:"The city-wide framework. 8 planning themes; vision, land use, planning principles, urban structure. The natural parent taxonomy for the four sector plans.",
  quotes:[
   {p:"U",r:"Vision",t:"To develop Hulhumalé as the primary urban, economic and innovation hub of the Maldives. To create an inclusive, climate resilient city that supports the growing population through sustainable development, world class infrastructure and connected communities."},
   {p:"U",r:"Themes 01–08",t:"Balances Urban Growth & Spatial Development … Inclusive, Healthy & Livable Communities … Adequate & Affordable Housing … Integrated Infrastructure & Urban Services … Climate Resilience & Environmental Management … Sustainable Mobility & Connectivity … Economic Development & Urban Competitiveness … Urban Governance & Institutional Capacity"}],
  insight:"This booklet is still structural (many section headings are empty: Urban Profile figures blank, 'Masterplan Strategy' onward is an outline). It should be finished first, because it is the only document positioned to arbitrate between the sector plans."}},
 {name:"Social Development MP", status:"plan", plans:["S"], detail:{
  summary:"Most developed sector plan: 4 themes, 22 objectives, 58 actions, 146 sub-actions, with an implementation matrix (indicators, timeframes, responsible parties).",
  quotes:[
   {p:"S",r:"Ch.1 Vision",t:"Hulhumalé Aharenge: A Community We Call Home"},
   {p:"S",r:"B-Summary",t:"Theme 1: Governance, Theme 2: Social Equity and Inclusion, Theme 3: Community Wellbeing and Safety, and Theme 4: Economic Sustainability."},
   {p:"S",r:"Ch.5",t:"The plan structured across four thematic pillars, comprises a total of 22 objectives, 58 strategic actions, and 146 detailed sub-actions."}],
  insight:"Strongest numbering discipline of the six (4.x.x.x issues ↔ 5.x.x.x actions). Its cross-referencing convention is worth adopting system-wide. Internal QA items remain: TOC shows two 'Chapter 7' entries, 'Error! Bookmark not defined' fields, and yellow placeholder notes (bus map, flooding & erosion map, tables) still unresolved."}},
 {name:"Transport MP", status:"plan", plans:["T"], detail:{
  summary:"4 themes, each with focus areas and key issues; actions chapter drafted in outline. Explicitly frames itself as the mobility backbone the other plans depend on.",
  quotes:[
   {p:"T",r:"Themes 1–4",t:"Theme 1: Efficient and Accessible Public Transportation System … Theme 2: Sustainable Transportation Modes … Theme 3: Intelligent Traffic Management System … Theme 4: Environmental Conservation and Resilience in Transport Planning Systems"},
   {p:"T",r:"Ch.5, Theme 3",t:"This theme is therefore best understood not as a parallel programme to Themes 01 and 02, but as their operational and technological substrate."}],
  insight:"Marked '~ DRAFT IN PROGRESS BEYOND THIS POINT ~' after Theme 4 — demand forecasting, costing, M&E and implementation chapters are outlines only. Its Theme 4 is where most of the environmental duplication with the EMP and LDS lives."}},
 {name:"Landscape MP 2026 (Garden Island) — primary", status:"plan", plans:["L"], detail:{
  summary:"The primary landscape document. 4 themes with focus areas, actions and quantified KPIs. The Garden Island 2024 initiative sits beneath it as supporting source material used to flesh this plan out.",
  quotes:[
   {p:"L",r:"Ch.3 Vision",t:"Garden Island – A Resilient Blue-Green Hulhumale' for People, Nature, and Community."},
   {p:"L",r:"Ch.5",t:"These themes comprise: Enhancing Pedestrian Experience … Green Development … Green Forest … and Green Economic Activation."}],
  insight:"Sets the most aggressive numeric KPIs of any plan (canopy %, corridor km, SME counts). Several of those KPIs belong operationally to other sections — flagged per-node below. As the primary document, it should absorb the 2024 initiative's delivered work and completed pilots as its implementation baseline."},
  children:[
   {name:"Supporting: Garden Island 2024", status:"plan", plans:["G"], detail:{
    summary:"Supporting source document, not a standalone plan. June 2024 implementation deck: 5 objectives with action trackers, many marked COMPLETED (alleyway rejuvenation, shaded pedestrian paths stage 1–2, wayfinding proposals). Its content feeds directly into the Landscape MP 2026.",
    quotes:[
     {p:"G",r:"Objectives",t:"Enhancing Pedestrian Experience Within the City … Quality of Urban Streetscape … Green Developments … Introducing Community Gathering Spots … Economic Drive"},
     {p:"G",r:"Action 2.2.2",t:"Plant 25,000 trees by 2025"}],
    insight:"Treat as the implementation baseline and evidence source for LDS 2026: completed actions become the plan's delivered baseline, in-progress actions carry forward into LDS focus areas, and lapsed targets (the 25,000-tree deadline) get formally restated in the LDS. Where G appears on overlap nodes in this map, it marks delivered or trialled work the primary plans should build on rather than re-propose."}}
  ]},
 {name:"Environment MP V2", status:"plan", plans:["E"], detail:{
  summary:"7 themes built on an Open Environmental Governance + GIS spine; every action has GIS outputs, KPIs and review cycles. The most operationally specified plan.",
  quotes:[
   {p:"E",r:"3.2 Vision",t:"To develop Hulhumalé as a climate-ready, low-carbon, resource-efficient, nature-positive and liveable urban island, guided by Open Environmental Governance, GIS-based planning, public accountability and collaboration…"},
   {p:"E",r:"3.7 Themes",t:"1. Open Environmental Governance, GIS and Public Environmental Data · 2. Coastal, Climate, Water and Disaster Resilience · 3. Blue-Green Infrastructure, Urban Cooling and Biodiversity · 4. Waste, Pollution Prevention and Environmental Health · 5. Low-Carbon Buildings, Energy, Solar and Utility Resilience · 6. Sustainable Mobility, Access and Public Realm · 7. Delivery, Compliance, Partnerships and Public Reporting"}],
  insight:"Its GIS repository, data classification register, Delivery Unit and Decision Gate are the only whole-of-system delivery machinery in the set. Themes 1 and 7 should serve all six plans, not just the environmental one."}}
]},
{name:"Shared Foundation", status:"green", plans:["S","T","L","E"], detail:{
 summary:"The four sector plans were built from a single joint consultation process and a shared issue-grouping method — a genuinely strong basis for integration that the documents themselves state.",
 quotes:[
  {p:"S",r:"Ch.2 Methodology",t:"These consultations were carried out jointly for the four master plans (social, landscape, transport, and environment). In these sessions, the identified issues were grouped into broader categories to develop initial actions to address these challenges."},
  {p:"T",r:"Ch.3 Methodology",t:"These consultation sessions were conducted in an integrated manner for all four master plans, namely the social, landscape, transport, and environmental master plans."}],
 insight:"Because the evidence base is shared, the divergence happens downstream — at theme naming, KPI setting and ownership. That's fixable at document level without re-consulting stakeholders. The 194 coded social issues (SMP Sankey) could be re-tagged with a cross-plan ID so every issue traces to exactly one owning action."}},
{name:"Overlap Map", status:"group", detail:{summary:"18 domains where two or more plans occupy the same territory, grouped in four clusters. Colour = severity.",quotes:[],insight:""}, children:[
{name:"Environment & Climate", status:"group", detail:{summary:"Seven overlap domains between EMP, LDS, Transport Theme 4, SMP wellbeing actions and UDM Theme 5.",quotes:[],insight:""}, children:[
 {name:"Urban heat, trees & canopy", status:"red", plans:["L","G","S","E","T","U"], detail:{
  summary:"All six documents address urban heat and tree cover. Three plans each propose their own city greening plan, and the flagship tree target contradicts itself across the two Garden Island documents.",
  quotes:[
   {p:"G",r:"Action 2.2.2 (2024)",t:"Plant 25,000 trees by 2025"},
   {p:"L",r:"FA 3.1 KPIs (2026)",t:"Plant 25,000 new trees by 2040. Achieve minimum 30% citywide canopy cover. 100% of major roads lined with shade trees."},
   {p:"S",r:"Sub-action 5.3.4.2.1",t:"Develop a city-level plan to increase green cover as a strategy for urban heat mitigation."},
   {p:"E",r:"Theme 3 actions",t:"Produce annual urban heat map … Identify and upgrade cooling corridors … At least 5 priority corridors upgraded by year 5."},
   {p:"T",r:"Theme 4, Focus 05",t:"Impervious materials used for paving, leads to excessive heat retention and poor water absorption"},
   {p:"U",r:"Theme 02",t:"The limited availability of mature trees throughout many parts of the island reduces natural shade, resulting in higher pedestrian exposure to heat…"}],
  insight:"Duplication flag 1: the same 25,000-tree figure carries a 2025 deadline in the 2024 supporting deck and a 2040 deadline in the primary LDS, with no reconciliation. Since the LDS is primary, it should state how many trees the 2024 initiative actually planted as its baseline, then define the 2040 figure as net additional trees. Duplication flag 2: SMP 5.3.4.2.1 (a green cover plan), LDS Theme 3 (an Urban Forest Management Plan) and EMP Theme 3 (cooling corridor programme) are three versions of one programme. Recommended split: EMP owns the evidence (heat map, tree inventory, canopy map — it already specifies them); the LDS owns the single Urban Greening & Cooling Programme, seeded with the 2024 planting record; SMP and Transport delete their duplicate planning actions and cross-reference instead."}},
 {name:"Green verges & passive drainage", status:"amber", plans:["E","T","L","S"], detail:{
  summary:"Green verges are claimed by four plans for four competing functions: drainage performance (EMP), driveway/stormwater conflict (Transport), landscape buffers (LDS) and community gardening pressure (SMP). No plan owns the arbitration.",
  quotes:[
   {p:"E",r:"Theme 2 action",t:"Audit green verges and passive drainage — Assess compaction, blockage, surface gradient, soil condition and vegetation health. Prioritise rehabilitation."},
   {p:"T",r:"Theme 4, Focus 01",t:"Green verges are been compromised for driveways and infrastructure expansion. Lack of bioswales for stormwater filtration at common flood zones."},
   {p:"L",r:"FA 1.3",t:"Establish green verges and landscape buffers."},
   {p:"S",r:"Ch.4 (photo caption)",t:"Planting by residents within green verge areas has been reported to create challenges for the passive drainage system. In some cases, root spreading has also contributed to damage to surrounding infrastructure and utilities."}],
  insight:"Write one Green Verge Policy that rules on the four competing uses. Sequence already exists implicitly: EMP audit first (condition + drainage function), then LDS sets the planting/design standard, Transport sets driveway crossing rules, SMP allocates sanctioned community-gardening verges (it already flags 'lack of community garden spaces, and illegal gardening' as issue 4.3.2.11). Without a single policy, the four plans will keep generating contradictory verge interventions."}},
 {name:"Flooding, drainage & SuDS", status:"amber", plans:["E","T","L","S","U"], detail:{
  summary:"Bioswales, rain gardens and drainage upgrades appear in three plans; EMP maps pooling; SMP and UDM restate the risk. Complementary in intent, but the LDS carries a flood-reduction KPI it cannot deliver alone.",
  quotes:[
   {p:"L",r:"FA 3.4",t:"Integrate bioswales and rain gardens. Develop green infrastructure corridors. … 50% reduction in localized flooding."},
   {p:"T",r:"Theme 4, Focus 01",t:"Impervious road infrastructure increases localized flooding. Disregard for Stormwater retention systems in parking areas."},
   {p:"E",r:"Theme 2 action",t:"Map water pooling hotspots — Use public reports, field checks, rainfall events and drone observations to validate pooling locations and causes."},
   {p:"S",r:"Sub-action 5.3.4.1.2",t:"Incorporate required measures to improve living conditions, reduce flood risks, strengthen drainage systems, and safeguard homes and property."}],
  insight:"A '50% reduction in localized flooding' KPI sits in the Landscape plan, but drainage engineering sits with Utilities and the pooling evidence sits in the EMP. Move the flood-reduction KPI to the EMP (which has the hotspot baseline to measure it) and let the LDS carry only the green-infrastructure delivery KPIs (bioswales installed, permeable area added)."}},
 {name:"Waste & source segregation", status:"red", plans:["S","E","L","U"], detail:{
  summary:"SMP and EMP each independently commission neighbourhood segregation pilots — the same intervention, two owners, two KPI sets.",
  quotes:[
   {p:"S",r:"Sub-action 5.3.4.3.2",t:"Conduct neighborhood-level segregation pilots and periodic waste collection campaigns."},
   {p:"E",r:"Theme 4 action + KPI",t:"Pilot source segregation — Pilot organics, recyclables, residual waste and special waste separation in residential clusters, schools, public buildings and commercial areas. … Segregation pilots launched in at least 3 residential clusters and 5 institutions. Contamination rate below 20% in pilot areas within 12 months."},
   {p:"L",r:"FA 1.5",t:"Upgrade waste infrastructure."}],
  insight:"Duplication flag: identical pilots. Assign the pilot to the EMP — it alone has the delivery mechanism (WAMCO data-sharing MOU, quarterly performance dashboard, contamination KPI). SMP retains what it does uniquely: behaviour change (5.3.4.3.3 student/household engagement, 5.3.4.3.4 awareness materials). LDS keeps only the physical bin/point provision inside streetscape standards."}},
 {name:"Air quality, dust & noise sensors", status:"red", plans:["S","E","T"], detail:{
  summary:"Three plans independently propose building an environmental sensor network for the same locations (construction zones, high-density areas).",
  quotes:[
   {p:"S",r:"Sub-action 5.1.1.3.2 (Ch.7 matrix)",t:"Install urban air quality sensors and public dashboards, particularly near construction zones and high-activity areas, to support public health awareness"},
   {p:"E",r:"Theme 4 action",t:"Deploy air quality, dust and noise sensors — Install sensors in construction zones, Industrial Zone, high-density areas, schools, major roads and coastal public spaces."},
   {p:"T",r:"Theme 4, Focus 03",t:"No pollution monitoring systems installed across Hulhumale' leading to a significant lack in relevant data to make informed decisions"}],
  insight:"Duplication flag: three sensor networks for one island. The EMP's Section 4.8 IoT Environmental Sensor Network is the only fully specified version (sensor types, priority locations, validation, GIS linkage) — make it the single network. SMP and Transport become data consumers: SMP gets the public health dashboard feed, Transport gets construction-dust and roadside pollution feeds for enforcement."}},
 {name:"Green buildings & solar", status:"amber", plans:["E","S","G","U"], detail:{
  summary:"The EMP mandates a performance standard; the SMP 'encourages' practices; the 2024 deck proposed an incentive. Mandatory vs voluntary has never been decided.",
  quotes:[
   {p:"E",r:"Theme 5 action + KPI",t:"Develop Hulhumalé Green Building Performance Standard — Set local standards for passive cooling, shading, glazing, ventilation, lighting, cooling systems and water efficiency. … 100% new major developments screened against green building criteria."},
   {p:"S",r:"Sub-action 5.3.4.1.3",t:"Encourage green building practices that enhance energy efficiency and environmental performance."},
   {p:"G",r:"Action 3.2 (2024)",t:"Green Building Incentive"}],
  insight:"Pick the instrument: the EMP's mandatory screening standard is the stronger and more measurable path; fold the 2024 incentive idea into it as the compliance carrot (expedited approvals — which SMP 5.2.1.1.2 separately proposes as a planning incentive). Rewrite SMP 5.3.4.1.3 to reference the EMP standard rather than a parallel voluntary track. Solar overlap is minor and healthy: EMP maps solar potential; Transport's solar streetlights (Theme 4 Focus 04) should draw sites from that map."}},
 {name:"Disaster preparedness", status:"green", plans:["S","E","U"], detail:{
  summary:"Cleanest division of labour in the set: SMP writes the plan and communications; EMP maps the spatial layers; both build on the same DMP/HVCA work.",
  quotes:[
   {p:"S",r:"Sub-action 5.3.4.4.1",t:"Formulate, validate, and publish a comprehensive local disaster preparedness and response plan. The detailed plan must clearly outline roles, protocols, and emergency procedures to ensure community safety and resilience."},
   {p:"E",r:"Theme 2 action",t:"Map disaster preparedness layers — Integrate DMP and HVCA outputs. Publish assembly points, public shelter areas and relief management areas where appropriate."},
   {p:"S",r:"Sub-action 5.1.1.3.4",t:"Establish and regularly update a registry and spatial mapping of vulnerable populations, including elderly persons, persons with disabilities, migrant populations, and high-risk households, to support targeted planning, evacuation, and emergency planning."}],
  insight:"Keep the split, add one stitch: the SMP's vulnerable-population registry must live as a single dataset inside the EMP GIS repository under Class 4/5 protection (the EMP's own classification register handles the privacy question SMP doesn't address). Both plans also propose emergency/temporary housing siting — make it one site assessment."}}
]},
{name:"Public Realm & Mobility", status:"group", detail:{summary:"Seven domains — the densest duplication cluster, because Landscape, Transport, Social and Environment all touch streets.",quotes:[],insight:""}, children:[
 {name:"Walkability & pedestrian corridors", status:"red", plans:["L","T","S","E","U","G"], detail:{
  summary:"Every plan proposes pedestrian corridor upgrades, each with its own target: LDS wants 5 km, EMP wants 5 corridors, Transport wants pedestrian priority zones, SMP wants continuous sidewalks — with no shared corridor list.",
  quotes:[
   {p:"L",r:"FA 1.1 KPIs",t:"90% of residents within 300m of a safe pedestrian route. … Minimum 5km of upgraded pedestrian corridors."},
   {p:"E",r:"Theme 6 action + KPI",t:"Upgrade priority walking corridors — Deliver shade, crossings, lighting, seating, planting, accessibility and public realm upgrades. … At least 5 priority walking corridors upgraded by year 5."},
   {p:"T",r:"Theme 2, Focus 01",t:"…advances the identification, design, and progressive implementation of Pedestrian Priority Zones within Hulhumalé's highest-activity locations…"},
   {p:"S",r:"Sub-action 5.3.5.1.1",t:"Improve pedestrian infrastructure through planning, development and maintenance of uninterrupted sidewalks, raised and signalized crossings"},
   {p:"G",r:"Actions 1.1–1.2 (2024)",t:"Rejuvenation of Alleyways … Shaded Pedestrian Pathway — COMPLETED"}],
  insight:"Duplication flag: four live corridor programmes plus a completed 2024 one. Fix in three moves: (1) adopt the EMP's walkability indicator framework as the single measurement standard — it's the only plan that defines indicators; (2) publish one Priority Walking Network map (EMP already commits to mapping it) that all plans' KPIs reference; (3) split delivery — Transport owns crossings/priority zones/traffic interface, Landscape owns shade/surface/streetscape, SMP drops 5.3.5.1.1 to a cross-reference. Reconcile '5 km' vs '5 corridors' into one target on that map."}},
 {name:"Universal accessibility (PWD)", status:"red", plans:["S","L","T","E"], detail:{
  summary:"SMP and LDS contain near-identical retrofit actions, drafted independently. Transport and EMP add two more layers.",
  quotes:[
   {p:"S",r:"Sub-action 5.2.5.1.1",t:"Retrofit public spaces and buildings with ramps, lifts, tactile paving, and inclusive signage."},
   {p:"L",r:"FA 1.2",t:"Retrofit existing parks and streets. Install tactile guidance systems. Provide accessible crossings and public amenities. … 80% of existing public spaces upgraded by 2035."},
   {p:"E",r:"Theme 6 action",t:"Map accessibility barriers — Identify broken footpaths, missing ramps, unsafe crossings, poor lighting and obstruction points."},
   {p:"T",r:"Theme 1, Focus 04",t:"Social equity and universal accessibility"}],
  insight:"Duplication flag — but also the best chaining opportunity in the set, because each plan holds a different piece: SMP holds the demand data (908 PWDs mapped by residence, Jan 2024, concentrated in Hiyaa and Flats 1–7); EMP holds the barrier-mapping method; LDS holds the retrofit KPI and design standard; Transport holds the transit accessibility piece. Chain them into one Universal Access Programme: SMP data → EMP barrier map → prioritised LDS/Transport retrofit pipeline, with the LDS '80% by 2035' as the single shared KPI."}},
 {name:"Wayfinding & signage", status:"red", plans:["L","S","T","G"], detail:{
  summary:"A citywide wayfinding system is proposed in three live plans, and the 2024 deck already ran a wayfinding-board action.",
  quotes:[
   {p:"L",r:"FA 1.4",t:"Install citywide wayfinding system. Develop district identity markers. Introduce Park information signage. Establish digital navigation integration."},
   {p:"S",r:"Sub-action 5.3.5.1.2",t:"Design and install clear, consistent road and public space signage to support wayfinding, and improve road usage and safety."},
   {p:"G",r:"Action 1.3.4 (2024)",t:"Introduce Wayfinding boards — Propose road signboard and park wayfinding boards"},
   {p:"S",r:"Issue 4.2.1.5",t:"Lack of inclusive wayfinding and navigational systems"}],
  insight:"Duplication flag: audit what the 2024 action actually installed before any plan re-scopes it. Then one wayfinding design standard, owned by Landscape (identity + parks) with Transport supplying the road-safety signage layer. SMP's contribution should narrow to the inclusivity requirement (tactile, multilingual — consistent with its digital-divide objective 5.2.4) rather than a parallel installation action."}},
 {name:"Cycling networks", status:"amber", plans:["T","L","E","S","G"], detail:{
  summary:"Recreational trails (LDS), commuter infrastructure (Transport), a network gap map (EMP) and fitness loops (SMP) — four cycling geometries that have never been drawn on one map.",
  quotes:[
   {p:"T",r:"Theme 1, Focus 01",t:"Insufficient Cycling Infrastructure … Expand Cycling Infrastructure"},
   {p:"L",r:"FA 2.3 KPI",t:"Minimum 10km of recreational trails."},
   {p:"E",r:"Theme 6 action",t:"Map cycling and micromobility network — Identify safe corridors, parking points, conflict areas and links to public facilities."},
   {p:"S",r:"Sub-action 5.3.3.3.1",t:"…development of fitness areas, walking and cycling loops."},
   {p:"S",r:"Ch.4, 4.3.5",t:"Cycling is theoretically encouraged, but no dedicated lanes currently exist, forcing riders who are mostly expats, to share roads with motor vehicles."}],
  insight:"Transport should own the network plan (it's the only plan treating cycling as a transport mode, incl. bicycle parking at transit stops); LDS supplies the recreational loop layer as a subset; EMP's conflict-area mapping becomes the safety evidence. One network map, two layers (commute + recreation), one delivery owner."}},
 {name:"Public transport & bus stops", status:"green", plans:["T","S","E","U"], detail:{
  summary:"Mostly complementary: Transport plans the service; SMP and EMP add access and audit layers. Small restatement risk around bus stops.",
  quotes:[
   {p:"T",r:"Theme 1",t:"This theme establishes public transportation as the primary and preferred mode of travel in Hulhumalé — not merely as an alternative to private vehicles, but as the backbone of daily urban mobility."},
   {p:"S",r:"Sub-action 5.3.5.3.1",t:"Improve pedestrian access to bus stops through safe and accessible pathways, and well developed and maintained shaded bus stops."},
   {p:"E",r:"Theme 6 KPI",t:"Public transport access map published. Bus stop accessibility and shade audit completed."}],
  insight:"Keep Transport as sole owner of routes, frequency, fares, BRT and hub design; convert SMP 5.3.5.3 and the EMP bus-stop audit into inputs to it (the EMP audit is genuinely useful — it gives Transport a shade/accessibility baseline it doesn't collect itself). SMP's issue evidence (Sinamalé Bridge peak-hour outbound commuting data) belongs in Transport's demand chapter, which is currently an outline."}},
 {name:"Street lighting & CCTV", status:"amber", plans:["S","T","E"], detail:{
  summary:"SMP audits and expands lighting/CCTV for safety; Transport separately plans an energy-efficient/solar lighting transition; EMP handles the energy angle. Same poles, three programmes.",
  quotes:[
   {p:"S",r:"Sub-action 5.3.1.1.1",t:"Conduct a city-wide lighting audit across streets, parks, and public spaces to assess coverage, functionality, and gaps."},
   {p:"S",r:"Ch.4 (CCTV caption)",t:"Currently, a total of 322 bullet cameras are planned for Phase 1 and 274 for Phase 2."},
   {p:"T",r:"Theme 4, Focus 04",t:"Lack of solar powered streetlights … Critical intersections fixed with similar systems as low traffic roads or intersections"}],
  insight:"Merge into one Street Lighting Programme with two objectives (safety coverage + energy transition): SMP's audit defines the gap map, Transport's solar/LED transition defines the technology pathway, EMP's solar potential map defines siting. CCTV stays with SMP/Police but should be logged in the same GIS asset layer so lighting and camera gaps are assessed together — SMP already links both to its Urban Management System."}},
 {name:"Beach & waterfront access", status:"red", plans:["S","L","U","G"], detail:{
  summary:"The same public-access-vs-commercial-use policy is written twice, in almost interchangeable words, in the SMP and the LDS.",
  quotes:[
   {p:"S",r:"Sub-action 5.1.3.3.2",t:"Ensure free public access and uninterrupted pedestrian movement for citizens in public spaces. (eg. open-use beach frontage)"},
   {p:"L",r:"FA 4.2 KPI",t:"Maintain 100% public shoreline access."},
   {p:"S",r:"Issue 4.2.4.1",t:"Privatization or restricted access to public spaces"},
   {p:"L",r:"FA 4.2 issue",t:"Conflicts between businesses and public access."}],
  insight:"Duplication flag: one enforceable Beachfront Commercial Use Policy is needed, and it belongs under SMP Theme 1 Governance — that's where HDC's leasing, zoning controls (5.1.3.3.1) and enforcement limits as an SOE are analysed. LDS keeps the spatial framework (waterfront activation zones, beach parks, swimming zones) and inherits the '100% public shoreline access' KPI as the measure of the SMP policy's success. Also reconcile physical access: SMP documents the sand-buried Ruhgandu 3 ramp; LDS FA 2.5 plans beach access improvements — same asset, two plans."}}
]},
{name:"Community & Economy", status:"group", detail:{summary:"Three domains where the Social and Landscape plans compete for the same community and micro-economy space.",quotes:[],insight:""}, children:[
 {name:"Urban agriculture & food", status:"red", plans:["S","L","E","G"], detail:{
  summary:"Community gardens and local-produce actions appear in three live plans, while the SMP itself documents that a working allocation model (UNDP SEEDS/PDSAE) already exists.",
  quotes:[
   {p:"S",r:"Sub-action 5.4.4.1.3",t:"Pilot urban farming and gardening programs in partnership with schools, NGOs, and households."},
   {p:"L",r:"FA 4.4",t:"Develop community gardens. Introduce edible landscapes. Support local produce markets. … Community gardens in all neighbourhoods."},
   {p:"E",r:"Theme 3 focus areas",t:"Community gardens and public green space quality"},
   {p:"S",r:"Ch.4 (caption)",t:"Under the SEEDS project, 16 farming lots of approximately 600 sqft each were developed, while the PDSAE project developed 12 farming lots of approximately 707 sqft each. … a total of 48 farmers under SEEDS and 36 farmers under PDSAE."}],
  insight:"Duplication flag: three plans propose 'pilots' for something that already ran — 28 lots, 84 farmers under SEEDS/PDSAE. Scale that model instead of piloting again: LDS allocates the land (its neighbourhood coverage KPI is the right one), SMP runs the social programme (applicant categories: women, youth/PWD — its existing framework), EMP monitors green-space condition. The SMP's separate food-affordability assessment (5.4.4.2.3) is unique and stays."}},
 {name:"SME spaces, markets & activation", status:"amber", plans:["S","L","U","G"], detail:{
  summary:"Pop-up markets, SME hubs and multi-purpose rentable spaces appear in both SMP and LDS; only the LDS quantifies them.",
  quotes:[
   {p:"L",r:"FA 4.1 KPIs",t:"Minimum one SME hub per neighbourhood. 100 SME spaces delivered by 2035. 80% occupancy rate."},
   {p:"S",r:"Sub-action 5.4.2.1.4",t:"Design and facilitate the development of rentable multi-purpose spaces within residential clusters for business activities, events, and local markets."},
   {p:"S",r:"Sub-action 5.3.1.3.3",t:"Activate public spaces through community-oriented uses such as pop-up events, weekend markets, cultural fairs, and art installations."},
   {p:"L",r:"FA 4.1",t:"Introduce flexible pop-up market zones. Establish community marketplace programme."}],
  insight:"Not a conflict, but two half-programmes. Adopt the LDS numbers (100 spaces / 2035 / 80% occupancy) as the shared target; split roles by competence — LDS designs the landscape-integrated market spaces, SMP/Business Development runs leasing, vendor regulation (its 5.1.3.3 vendor zoning) and event programming. One activation calendar prevents the two sections from booking the same parks."}},
 {name:"Public space programming & culture", status:"amber", plans:["S","L","G","U"], detail:{
  summary:"Cultural events, community stewardship and space activation run in parallel between SMP Theme 3 and LDS/2024 community actions.",
  quotes:[
   {p:"S",r:"Sub-action 5.3.2.4.1",t:"Organize and support periodic cultural and intercultural events in public spaces, including performances, cultural showcases presenting different island communities unique traditions, food, and crafts…"},
   {p:"L",r:"FA 3.5",t:"Community tree planting programme. Urban agriculture initiatives. Environmental awareness campaigns. … 5,000 residents participating annually."},
   {p:"G",r:"Objective 4 (2024)",t:"Public participation to develop hangout spots … Introduce Urban Furniture"},
   {p:"S",r:"Sub-action 5.3.2.4.4",t:"Integrate cultural elements into public space design to reflect local identity and heritage."}],
  insight:"SMP owns programming and community leadership (its CSR team is named responsible party throughout Ch.7); LDS owns the physical stage. The one action that genuinely needs a joint owner is SMP 5.3.2.4.4 (cultural elements in public space design) — it's a design directive sitting in a social plan; move its delivery to LDS with SMP as content advisor. LDS's '5,000 residents participating annually' should be counted through SMP's community engagement indicators, not a separate count."}}
]},
{name:"Governance, Data & Systems", status:"group", detail:{summary:"Three domains where the biggest single alignment win lives: the plans describe one digital backbone three different ways.",quotes:[],insight:""}, children:[
 {name:"GIS / central data platform", status:"amber", plans:["S","E","T","U"], detail:{
  summary:"SMP proposes a centralized data hub plus an Urban Management System; EMP proposes an Environmental GIS Repository that explicitly ingests SMP layers; Transport needs a traffic data platform; UDM calls for integrated data systems. These are one system described four ways.",
  quotes:[
   {p:"S",r:"Sub-action 5.1.1.3.1",t:"Develop a centralized data hub or GIS-based planning system, regularly updated and maintained as a comprehensive tool for planning and decision-making."},
   {p:"S",r:"Sub-action 5.1.4.1.1",t:"Develop a centralized Urban Management System to integrate urban data, monitor service delivery, and support internal and external decision-making. The system is to be connected to the centralized data hub or GIS-based planning system"},
   {p:"E",r:"Theme 1 action",t:"Establish Hulhumalé Environmental GIS Repository — Create central GIS repository. Compile HDC, HVCA, DMP, SMP, survey and monitoring layers."},
   {p:"T",r:"Theme 3",t:"…it generates the continuous stream of operational data that underpins evidence-based planning across this entire Master Plan…"},
   {p:"U",r:"Theme 08",t:"…improved planning processes, digital governance tools, integrated data systems, and more coordinated decision-making."}],
  insight:"Highest-value alignment in the whole set. The EMP is the only plan that specifies the architecture (owners, metadata, update cycles, five-class data classification, publication formats, MOUs with WAMCO/MWSC/STELCO/MTCC) — and it already names SMP layers as inputs. Declare one corporate GIS platform using the EMP Theme 1 architecture, with the SMP's Urban Management System and Transport's ITS as functional modules on top of it. Otherwise HDC funds three repositories holding the same basemaps."}},
 {name:"Complaints & grievance", status:"amber", plans:["S","E","T"], detail:{
  summary:"SMP builds the resident-facing grievance system; EMP builds GIS complaint logging with public six-month summaries; Transport wants route feedback kiosks. Three intakes for one resident.",
  quotes:[
   {p:"S",r:"Sub-action 5.1.2.2.1",t:"Maintain an accessible grievance redress system with direct routing to relevant teams. Enable residents to report issues through multiple channels (online portal, hotline, QR-code location tagging)"},
   {p:"E",r:"Theme 7 action",t:"Log public complaints in GIS — Record complaint type, broad location, status, response time and resolution. Keep detailed records internal. … Six-month public summaries published."},
   {p:"T",r:"Public Engagement actions",t:"Crowdsourced Feedback on Routes and Schedules … Establish Feedback Kiosks … Feedback Analytics Dashboard"}],
  insight:"One pipeline, three views: SMP owns the front door (channels, 24-hr call centre, routing, response-time SLAs — all already specified); EMP owns the GIS log and the public transparency layer (its six-month anonymised summaries are the accountability mechanism SMP's issue 4.1.2 asks for); Transport subscribes to the transport-tagged complaint stream instead of building kiosks. The QR-code location tagging in SMP maps naturally onto EMP's GIS complaint layer — the two sub-actions were written for each other without knowing it."}},
 {name:"Monitoring, KPIs & delivery units", status:"amber", plans:["S","E","T","L","U"], detail:{
  summary:"Each plan defines its own monitoring machinery: SMP an indicator matrix, EMP a Delivery Unit + Decision Gate + dashboard, Transport an M&E framework (outline), LDS bare KPIs. KPI styles are incompatible across plans.",
  quotes:[
   {p:"E",r:"Theme 7 actions",t:"Establish EMP Delivery Unit — Create a small unit inside Planning Division to track implementation, coordinate teams and prepare reports. … Introduce GIS-Based Environmental Decision Gate — Screen major approvals, land use changes, infrastructure projects, public realm works, utility works and major planning deviations against EMP layers."},
   {p:"S",r:"Ch.9",t:"Developed actions will be executed across short-, medium-, and long-term phases, to achieve the objectives, supported by regular monitoring, evaluation, and adaptive learning."},
   {p:"S",r:"Issue 4.1.1.6",t:"Weak monitoring and lack of improvement mechanisms (MEL)"},
   {p:"L",r:"FA 1.1 KPI",t:"Reduction in pedestrian-related accidents by 50%."}],
  insight:"Broaden the EMP Delivery Unit into a Masterplan Delivery Unit tracking all four sector plans in one master action tracker (the EMP's Appendix C format already exists). Extend the Decision Gate beyond environmental layers so a single approval screening covers social, transport and landscape requirements too — otherwise a project passes four separate gates or none. KPI reconciliation is needed: LDS claims a 50% pedestrian-accident reduction, but accident data and enforcement sit with Transport/Police; several LDS KPIs measure outcomes other sections deliver."}}
]}
]},
{name:"Alignment Recommendations", status:"group", detail:{summary:"Cross-cutting moves that would turn six documents into one coherent system. All blue nodes are insight, not original text.",quotes:[],insight:""}, children:[
 {name:"1 · UDM's 8 themes as master taxonomy", status:"blue", detail:{summary:"",quotes:[],
  insight:"The sector plans use 4, 4, 4 and 7 themes with overlapping names ('Governance' appears in SMP and UDM; 'Economic Sustainability' in SMP vs 'Economic Development & Urban Competitiveness' in UDM; three plans have a sustainability/environment theme). Map every sector theme to one of the UDM's eight, and add a one-page crosswalk matrix to each plan. This costs a table per document and eliminates the reader's biggest orientation problem when using the plans together."}},
 {name:"2 · One GIS backbone (EMP architecture)", status:"blue", detail:{summary:"",quotes:[],
  insight:"Adopt EMP Theme 1 (repository, classification register, publication pathway, service-provider MOUs) as the corporate data platform for all plans. SMP's Urban Management System, Transport's ITS, and LDS's tree inventory become modules/layers, not systems. This single decision collapses roughly a dozen duplicated data actions across the four sector plans."}},
 {name:"3 · Reconcile conflicting KPIs", status:"blue", detail:{summary:"",quotes:[],
  insight:"Priority conflicts to resolve in the next revision: (a) 25,000 trees by 2025 (Garden Island '24) vs by 2040 (LDS '26) — state the planted baseline and restate the target; (b) '5 km of pedestrian corridors' (LDS) vs '5 priority walking corridors by year 5' (EMP) — one corridor map, one target; (c) LDS's 50% flood-reduction and 50% accident-reduction KPIs measure outcomes owned by EMP/Utilities and Transport/Police respectively — move outcome KPIs to the owning plan, keep output KPIs (km built, trees planted) in LDS; (d) segregation pilot KPIs exist in both SMP and EMP — keep EMP's (they're measurable: 3 clusters, 5 institutions, <20% contamination)."}},
 {name:"4 · Flesh out LDS '26 from Garden Island '24", status:"blue", detail:{summary:"",quotes:[],
  insight:"Landscape MP 2026 is the primary document; Garden Island 2024 is its supporting source. The LDS should be fleshed out from it in three ways: (1) absorb the 2024 deck's completed actions (alleyways, shaded paths, adopt-a-tree, wayfinding proposals) as the plan's delivered baseline — the LDS executive summary is still '(TO BE CONTINUED)' and this is the material to build it with; (2) carry forward in-progress 2024 actions into the matching LDS focus areas so nothing is silently dropped; (3) formally restate lapsed 2024 targets inside the LDS (the 25,000-trees-by-2025 figure becomes a stated baseline of trees planted to date, against the LDS's 2040 target). Once absorbed, the 2024 deck can be retired as an annex/reference and stops appearing as a parallel voice in overlap domains."}},
 {name:"5 · Standardize structure & drafting", status:"blue", detail:{summary:"",quotes:[],
  insight:"Adopt one skeleton for all four sector plans (the SMP's is closest to complete): Themes → Objectives → Actions → Sub-actions with the SMP's numeric cross-referencing, plus the EMP's per-action table (GIS output, KPI, lead/support, review cycle). Currently Transport uses Focus Areas with bullet issues, LDS uses Focus Areas with KPI lists and no responsible parties, EMP uses tables, SMP uses numbered hierarchy — a combined reading requires four mental models. Also fix drafting-stage artifacts before consolidation: SMP's duplicate Chapter 7, broken bookmarks and highlighted placeholders; Transport's 'DRAFT IN PROGRESS' tail; UDM's empty Urban Profile figures; LDS's '(TO BE CONTINUED)' executive summary."}},
 {name:"6 · One Masterplan Delivery Unit + shared decision gate", status:"blue", detail:{summary:"",quotes:[],
  insight:"The EMP's Delivery Unit, master action tracker and GIS Decision Gate are the only delivery machinery specified anywhere in the set. Generalise them: one unit inside Planning Division tracks all ~300+ actions across the four sector plans; one decision gate screens major approvals against social, transport, landscape and environmental layers simultaneously. The alternative — four parallel monitoring regimes — is exactly the 'siloed operations of agencies and internal departments' the SMP flags as issue 4.1.4.1 in others."}}
]}
]};

if (typeof module!=="undefined") module.exports={FRAMEWORK,PLANS,GAPS,OVERLAPS,INTEGRITY,DOC_ALIGN,SPD_INDEX,MINDMAP,MM_PLAN,MM_SC};
