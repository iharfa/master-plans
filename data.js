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

/* Convenience: flat SPD list + pillar lookup, built once. */
const SPD_INDEX = (() => {
  const list=[]; const pillarById={};
  for(const p of FRAMEWORK){ pillarById[p.id]=p;
    for(const o of p.objectives) for(const s of o.spds)
      list.push({id:s.id, text:s.text, pillar:p.id, objective:o.id}); }
  return {list, pillarById};
})();

if (typeof module!=="undefined") module.exports={FRAMEWORK,PLANS,GAPS,OVERLAPS,INTEGRITY,SPD_INDEX};
