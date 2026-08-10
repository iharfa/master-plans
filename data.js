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
const PLANS_V10 = [
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
const GAPS_V10 = [
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

const OVERLAPS_V10 = [
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
const INTEGRITY_V10 = [
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
const DOC_ALIGN_V10 = {
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
const MM_PLAN_V10 = {
  U:{name:"Hulhumalé Urban Development Masterplan (Booklet v3)",color:"#6366f1"},
  S:{name:"Social Development Masterplan (v01, 29/03/2026)",color:"#ec4899"},
  T:{name:"Hulhumalé Transport Masterplan (draft)",color:"#0ea5e9"},
  L:{name:"Garden Island — Landscape Masterplan (v01, 29/03/2026)",color:"#f59e0b"},
  G:{name:"Garden Island 2024 (supporting source to Landscape MP '26)",color:"#b45309"},
  E:{name:"Environment Master Plan V2 (Draft 1.0, June 2026)",color:"#22c55e"}
};
const MM_SC = {green:"var(--ok)",amber:"var(--med)",red:"var(--hi)",blue:"var(--accent)",plan:"var(--muted)",root:"var(--ink)",group:"var(--ink-2)"};

const MINDMAP_V10 = {
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

/* =============================================================================
   V1.2 DATASET — re-analysis of the August 2026 updated drafts.
   Sources: "Development Frameork.md" (Framework, Word draft), "Urban Development
   Master Plan.md" (revised booklet), "Social.md" (28/07/2026), "Transport.md"
   (Theme 4 drafted), "Landscape.md" (11/07/2026 draft), "Environment.md"
   (re-conversion of the unchanged V2 Draft 1.0). V1.0 kept intact above for
   the version toggle.
   ========================================================================== */

const PLANS_V12 = [
  { id:"UDMP", name:"Urban Development Master Plan (booklet)", short:"UDMP", tier:"masterplan",
    status:"revised draft · Aug 2026", file:"Urban Development Master Plan", altFile:"HULHUMAL", colour:"#6366f1",
    note:"No longer narrative-only: Masterplan Strategy (development control framework, urban systems), zoning/density/height strategies and a real Implementation Framework (priority projects, stakeholders, KPIs per theme) are now drafted. Still empty: Overall Land Use Plan (9.1), Mobility Framework (9.6), Green & Blue Network (9.7) and all ten Character Areas — and the booklet still never references the four sector plans.",
    themes:[
      {id:"U1", title:"Th01 Balanced Spatial Growth & Urban Structure", pillars:{primary:["1"]},
        actions:["Graduated density strategy + building height strategy (9.4 / 9.5)","Urban Development Control Framework — zones, heights, setbacks, plot coverage, parking standards (8.4)","Overall land use planning with area & share for 16 categories (6.x)","Phase 3 integrated with Phase 2 into one continuous landmass (8.3)"]},
      {id:"U2", title:"Th02 Creating Inclusive & Livable Communities", pillars:{primary:["2"]},
        actions:["Walkable city & 5–10 Minute Neighborhoods (8.5)","Public open space KPI — m² per resident (11.4)","Waterfront access & community connections (3.2.5)"]},
      {id:"U3", title:"Th03 Delivering Diverse & Inclusive Housing", pillars:{primary:["3"]},
        actions:["Balanced housing strategy: social / medium-density / high-density / mixed-use residential (5.2)","Housing delivery KPI — units completed vs projected need (11.4)","Mixed-income neighborhoods encouraged (3.3.4)"]},
      {id:"U4", title:"Th04 Strengthening Integrated Infrastructure & Essential Services", pillars:{primary:["4"]},
        actions:["Priority project 11.2.1 — roads, drainage, sewerage, water, power, waste, telecoms","Utility reliability KPI — availability & interruption rates (11.4)","Integrated infrastructure systems & amenity corridor (8.5.9 / 3.4.3)"]},
      {id:"U5", title:"Th05 Building Climate Resilience Through Environmental Management", pillars:{primary:["5"]},
        actions:["Coastal protection maintenance & resilient waterfronts (3.5.2)","Green drainage network & green/wind corridors (8.5)","Climate-responsive urban form"]},
      {id:"U6", title:"Th06 Creating a Connected & Sustainable Mobility Network", pillars:{primary:["6"]},
        actions:["Road hierarchy & connected mobility framework (8.5)","Parking standards — visitor 10%, disability 5% (5.4)","Mobility Framework section (9.6) still to be written"]},
      {id:"U7", title:"Th07 Strengthening Economic Growth & Urban Competitiveness", pillars:{primary:["7"]},
        actions:["Priority project 11.2.5 — commercial centers, office, innovation hubs, tourism facilities","Knowledge Park quantified: 33,524.92 sqm / 0.76% (6.4)","KPIs: job growth, commercial floor area delivered, economic diversification (11.4)"]},
      {id:"U8", title:"Th08 Enhancing Urban Governance & Implementation Capacity", pillars:{primary:["8"]},
        actions:["Implementation Framework: phasing, priority projects, stakeholders, KPIs (11.x)","HDC named primary planning & implementation authority (11.3)","No financing / asset-management section yet"]}
    ]},
  { id:"SMP", name:"Social Development Masterplan", short:"Social", tier:"sector",
    status:"revised draft · 28 Jul 2026", file:"Social", altFile:"Social_Development", colour:"#ec4899",
    note:"Restructured from 4 themes to 5 pillars: Community Wellbeing & Safety split in two, culture and affordable housing added to Theme 2, and a heavy new statistical evidence base (HIES 2019, Census 2022, police crime data). Chapter 7's implementation tables still use the old 4-theme numbering.",
    themes:[
      {id:"S1", title:"Governance", pillars:{primary:["8"], secondary:["1","4"]},
        actions:["Centralised data hub / GIS planning system (5.1.1.3.1) + Urban Management System connected to it (5.1.4.1.1)","Registry & spatial mapping of vulnerable populations (5.1.1.3.3)","Multi-channel grievance redress — portal, hotline, QR location tagging (5.1.2.2.1)","Vendor regulation & open-use beach frontage (5.1.3.3)"]},
      {id:"S2", title:"Social Equity & Inclusion", pillars:{primary:["2"], secondary:["3","6"]},
        actions:["Multi-functional community service hubs in Phase 2 (5.2.2.1.1)","Retrofit ramps, lifts, tactile paving, inclusive signage (5.2.5.1.1)","Safe spaces & crisis centers for DV/GBV survivors (5.2.6.1.1)","NEW — Cultural identity, heritage & connection objective (5.2.7)","NEW — Safe, affordable, sustainable housing incl. rent-to-own schemes (5.2.8)"]},
      {id:"S3", title:"Community Wellbeing", pillars:{primary:["2"]},
        actions:["Community bonds & public space programming (5.3.1)","Healthcare space allocation with access-radius standards (5.3.2.1.1)","Walkability, fitness areas, walking & cycling loops (5.3.2.3.1)","Residential livability — handover only after infrastructure is operational (5.3.6.1.2)"]},
      {id:"S4", title:"Safety & Resilience (new theme)", pillars:{primary:["2"], secondary:["5","6"]},
        actions:["City-wide lighting audit (5.4.1.1.1) & phased CCTV expansion (5.4.1.2.2)","City-level green-cover plan for urban heat mitigation (5.4.2.2.1)","Local disaster preparedness & response plan (5.4.2.4.1)","Road safety: uninterrupted sidewalks, raised & signalized crossings (5.4.3.1.1)"]},
      {id:"S5", title:"Economic Sustainability", pillars:{primary:["7"], secondary:["2"]},
        actions:["Co-working hubs & shared workspaces for SMEs/startups (5.5.2.1.1)","Resource-sharing hubs for micro-entrepreneurs (5.5.2.1.3)","Community markets & mobile vendor spaces (5.5.4.1.4)","Blue economy: fishing piers & fish-market spaces (5.5.5.1.1)","Mandatory social impact assessments for major HDC projects (5.5.6.1.2)"]}
    ]},
  { id:"HTMP", name:"Transport Masterplan", short:"Transport", tier:"sector",
    status:"draft · Theme 4 drafted Aug 2026", file:"Transport", altFile:"Transport_Masterplan", colour:"#0ea5e9",
    note:"Single-purpose revision: Themes 1–3 are word-for-word unchanged; Theme 4 grew from a skeleton to ~19,000 words (17 strategic directions across 5 focus areas). Everything after Chapter 5 is still 'DRAFT IN PROGRESS' — objectives tables exist for Theme 1 only, and the cost/implementation/M&E chapters remain outlines.",
    themes:[
      {id:"T1", title:"Efficient & Accessible Public Transportation System", pillars:{primary:["6"], secondary:["2","4"]},
        actions:["Integrated multimodal system & feeder services / last-mile","Universal contactless transit payment & distance-based fares","Bus Rapid Transit (BRT) spine with TOD","RTPI, MaaS app, Smart Mobility Management Platform + Transport Operations Centre","Subsidised fares for vulnerable groups via digital ID"]},
      {id:"T2", title:"Sustainable Transportation Modes", pillars:{primary:["6"], secondary:["5","2"]},
        actions:["Pedestrian Priority Zones & pedestrianisation of the Phase 2 commercial spine","Integrated Cycling Network — protected, hierarchical","Public EV charging, pilot fleets, incentives","Shared mobility & behaviour-change incentives","Parking management, TDM, pricing instruments"]},
      {id:"T3", title:"Intelligent Traffic Management System", pillars:{primary:["6"], secondary:["4","8"]},
        actions:["Adaptive signal control integrated with the SMMP","Real-time traffic monitoring & data governance","Smart parking & curbside management with open data feeds","Smart Road Condition Monitoring & Asset Management System","Low Emission Zone framework, green waves, eco-routing"]},
      {id:"T4", title:"Environmental Conservation & Resilience in Transport Planning (NEW — fully drafted)", pillars:{primary:["5"], secondary:["6"]},
        actions:["Green Verge Management Standard; verges as a 'linear infiltration system' — bioswales & water-sensitive drainage","Street Tree Network Plan + professional arboricultural standards + shaded active-mobility corridors","Integrated Environmental Monitoring Network + transport emissions accounting","Smart adaptive & solar street lighting (50–70% + 20–40% energy savings)","Heat-reflective surfaces & developer softscape mandates"]}
    ]},
  { id:"EMP", name:"Environment Master Plan", short:"Environment", tier:"sector",
    status:"v2 draft 1.0 · unchanged", file:"Environment", altFile:"Environment_Master_Plan", colour:"#22c55e",
    note:"The August 2026 'Environment.md' is the same V2 Draft 1.0 re-converted from PDF — zero substantive edits (the conversion actually corrupted the action tables). All V1.0 findings stand unchanged.",
    themes:[
      {id:"E1", title:"Open Environmental Governance, GIS & Public Data", pillars:{primary:["8"], secondary:["4"]},
        actions:["Central Environmental GIS Repository (12 months)","Open environmental data portal & data classification register","Service-provider & CSO data-sharing MOUs","Six-month complaint summaries & ESG data"]},
      {id:"E2", title:"Coastal, Climate, Water & Disaster Resilience", pillars:{primary:["5"], secondary:["4"]},
        actions:["Shoreline trend & coastal asset mapping","Water pooling hotspots & passive drainage audit","Water security & non-potable reuse","Disaster preparedness layers; climate risk in approvals"]},
      {id:"E3", title:"Blue-Green Infrastructure, Urban Cooling & Biodiversity", pillars:{primary:["5"], secondary:["2"]},
        actions:["Public tree & vegetation inventory (>85% survival)","Canopy/shade maps & annual urban heat map","Cooling corridors (≥5 upgraded by year 5); corridor gaps −50% by 2030","Biodiversity monitoring & habitat sites; green space audits"]},
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
    status:"new draft · 11 Jul 2026", file:"Landscape", altFile:"LDS_Masterplan", colour:"#f59e0b",
    note:"Rewritten draft: Theme 3 renamed 'Urban Forest', accessibility greatly expanded (Hulhumalé Universal Design Manual), but every quantified KPI was deleted (25,000 trees, 30% canopy, 80%-by-2035 retrofit — all gone; canopy targets deferred to a future Urban Forest Master Plan). Garden Island 2024 was silently half-merged: alleyways/shading/crossings/murals absorbed, Adopt-a-Tree, the 25,000-tree drive, bike routes, roadside irrigation and the green-building incentive dropped without mention. Theme 4 halved — waterfront activation & green tourism removed.",
    themes:[
      {id:"L1", title:"Enhancing Pedestrian Experience", pillars:{primary:["6"], secondary:["2"]},
        actions:["Citywide Pedestrian Connectivity Network + design standards + smart crossings (6.3.1.1)","Green pedestrian links through secondary streets & alleyways (6.3.1.2)","Hulhumalé Universal Design Manual + accessible public facilities (6.3.2)","Street Shade Strategy — school routes, protect mature trees (6.3.3.1)","Citywide wayfinding + placemaking, park branding, public art (6.3.4)"]},
      {id:"L2", title:"Green Development", pillars:{primary:["2"], secondary:["5"]},
        actions:["Develop the LUP's planned city parks — masterplan per park (7.3.1.1)","Neighborhood parks in underserved areas + pocket parks (7.3.2)","Inclusive & family-friendly facilities, sensory gardens (7.3.3)","Park planning & design standards — hierarchy, catchments, palettes (7.3.4)"]},
      {id:"L3", title:"Urban Forest (renamed from Green Forest)", pillars:{primary:["5"], secondary:["2"]},
        actions:["Prepare an Urban Forest Master Plan — canopy targets deferred to it (8.3.1.1)","Road planting plans, continuous green corridors, tree replacement policy (8.3.1.2)","GIS-based urban tree database (8.3.1.2.7 — duplicated at 8.3.2.2.3)","Climate-responsive forestry: native species, bioswales, green roofs (8.3.2.1)","Urban Forest Management Plan & tree protection (8.3.2.2)"]},
      {id:"L4", title:"Green Economic Activation (halved)", pillars:{primary:["7"], secondary:["2"]},
        actions:["Landscape-integrated community market spaces (9.3.1.1)","Urban agriculture, edible landscapes & local produce markets (9.3.2.1)","REMOVED — waterfront activation & events (was FA 4.2)","REMOVED — green tourism & recreation economy (was FA 4.3)"]}
    ]}
];

const GAPS_V12 = [
  { spd:"8.2", pillar:"8", sev:"high", title:"Financial & asset management still unowned by any document",
    detail:"The last pillar-level hole. The revised UDMP mentions asset management once in passing (3.4.4) and its new Implementation Framework has phasing, priority projects, stakeholders and KPIs — but no funding or financing section. Transport's 'Cost Estimates & Financial Plan' chapter is still an empty outline (its road-asset system covers road assets only). No plan addresses SPD 8.2's financial planning, lifecycle asset management or resource allocation.",
    change:"Add a financing & asset-management section to the UDMP Implementation Framework (funding sources, PPP mechanisms, lifecycle asset management) and complete the Transport cost chapter. Flag for review at master-plan level.",
    signals:["asset management","financial planning","resource allocation","capital budget","lifecycle cost","financial sustainability"] },
  { spd:"3.1", pillar:"3", sev:"med", title:"Housing supply: strategy and KPI now exist, but no delivery pipeline",
    detail:"Improved since V1.0 but not closed. UDMP 5.2 now derives housing requirements (population projections, household size, shortages, government programmes) and KPI 11.4 tracks 'housing units completed against projected population growth' — yet the seven priority-project categories in 11.2 contain no housing delivery project, and no unit targets or phased pipeline are stated anywhere.",
    change:"Add a housing delivery priority project (unit targets by phase) to UDMP 11.2, or reference the government housing programme pipeline explicitly.",
    signals:["housing supply","housing delivery","housing units delivered","housing provision","dwelling supply"] },
  { spd:"1.4", pillar:"1", sev:"med", title:"Phased expansion is drafted but advisory — no phase map or triggers",
    detail:"UDMP 11.1 Development Phasing now exists but is undated and advisory ('the phasing strategy should prioritize…'). There is no phase map, timeline, or growth-area schedule; 8.3.1 covers only the Phase 3 → Phase 2 integration.",
    change:"Turn UDMP 11.1 into a real phasing schedule: mapped phases, sequencing, and infrastructure triggers per phase.",
    signals:["designated growth areas","development phasing","phased expansion","expansion areas","phasing action"] },
  { spd:"7.3", pillar:"7", sev:"med", title:"Innovation & knowledge economy: land allocated, programme still missing",
    detail:"Better than V1.0: the Knowledge Park is now quantified (33,524.92 sqm / 0.76%, UDMP 6.4), 'innovation hubs' appear in priority project 11.2.5 and the Work core value. But Character Area 10.6 'Knowledge Park' is an empty heading, there is no knowledge-economy programme, and the revised Social plan still added no innovation/creative-economy objective ('innovation' appears only as issue 4.5.3.3 with no action).",
    change:"Write UDMP Character Area 10.6 with a delivery concept, and add an innovation/creative-economy objective under Social Theme 5.",
    signals:["innovation hub","knowledge economy","creative industries","incubator","tech-incubator","research center","knowledge park"] }
];

const OVERLAPS_V12 = [
  { sev:"high", pillar:"4", title:"City data platforms: three systems in V1.0, now a fourth candidate",
    docs:["EMP","SMP","HTMP"],
    detail:"Worse, not better. EMP still builds its Central Environmental GIS Repository; Social still builds its Urban Management System + centralised data hub (5.1.4.1.1 / 5.1.1.3.1 — now at least connected to each other); Transport still builds the Smart Mobility Management Platform + Transport Operations Centre; and Transport's NEW Theme 4 proposes a separate 'unified data management platform' for environmental monitoring — a fourth platform, unwired to its own SMMP. None reference a shared system.",
    change:"Designate ONE integrated city data/GIS platform (EMP Theme 1 has the only specified architecture). Recast SMP's UMS, HTMP's SMMP and HTMP's new environmental monitoring platform as modules of it. The Social plan's new Chapter 1 hierarchy text (five sectoral plans under the UMP + Framework) is the right hook — extend that acknowledgment to the platform layer." },
  { sev:"high", pillar:"5", title:"Tree & canopy targets: conflict 'resolved' by deleting every number",
    docs:["LDS","EMP","HTMP"],
    detail:"The V1.0 conflict (25,000 trees by 2025 vs by 2040 + 30% canopy) is gone because the new Landscape draft deleted all of it — canopy targets are deferred to a future Urban Forest Master Plan ('Establish long-term urban tree canopy targets', 8.3.1.1.2). Meanwhile Transport's new Theme 4 demands a Street Tree Network Plan with 'corridor-by-corridor canopy coverage targets' (numbers unstated), and EMP retains the only numeric commitments (100% tree inventory, >85% survival, net canopy increase YoY). Nobody owns an actual target anymore.",
    change:"Don't defer: set the citywide canopy/tree target inside LDS 8.3.1.1 now (adopting EMP's monitoring KPIs as the measurement), and make Transport's Street Tree Network Plan and EMP's inventory reference that single figure. Also reconcile the twin tree-management instruments (LDS Urban Forest Management Plan vs HTMP arboricultural standards) and the duplicated GIS tree databases (LDS 8.3.1.2.7 vs EMP inventory)." },
  { sev:"high", pillar:"6", title:"Walkability: still four owners, and two now write network plans",
    docs:["HTMP","LDS","EMP","SMP"],
    detail:"LDS 6.3.1.1 now prepares 'a citywide pedestrian network plan' with its own design standards; Transport Theme 2 (unchanged) still owns Pedestrian Priority Zones and the pedestrian network; Transport's new Theme 4 adds 'Climate Responsive Shaded Active Mobility Corridors' on top of LDS's Street Shade Strategy; EMP keeps the walkability indicator framework; Social keeps pedestrian safety (now 5.4.3). And with the LDS KPIs deleted ('90% within 300m', '5 km of corridors'), EMP's '5 corridors by year 5' is the only surviving target.",
    change:"One Priority Walking Network map (EMP already commits to mapping it), one design standard. Split: Transport owns network & crossings; Landscape owns shade/streetscape delivery; EMP owns indicators; Social cross-references. Merge LDS 6.3.1.1 and HTMP's pedestrian planning into the same instrument instead of two parallel plans." },
  { sev:"high", pillar:"5", title:"NEW — Green verges & stormwater: Transport's Theme 4 collides with Environment and Landscape",
    docs:["HTMP","EMP","LDS"],
    detail:"Transport's drafted Theme 4 recasts green verges as 'a linear infiltration system' and proposes a Green Verge Management Standard, bioswale networks and water-sensitive drainage design. EMP already audits green verges & passive drainage and maps water pooling hotspots; LDS plants landscaped road verges (6.3.3.3) and integrates bioswales/rain gardens (8.3.2.1.3). Three plans now design the same verges for three functions with no arbitration.",
    change:"Adopt Transport's proposed Green Verge Management Standard as the single joint instrument: EMP supplies the audit & pooling evidence, Transport rules on driveway/utility crossings, Landscape sets the planting & design standard. State the split in all three documents." },
  { sev:"med", pillar:"2", title:"Universal accessibility: LDS now authors the standard — nobody references it yet",
    docs:["LDS","SMP","HTMP","EMP"],
    detail:"Real progress: LDS 6.3.2.1.1 creates the 'Hulhumalé Universal Design Manual' — exactly the single citywide standard V1.0 recommended. But Social's retrofit action (5.2.5.1.1) is verbatim unchanged, Transport and EMP are unchanged, and none of them cite the Manual. LDS also lost its accountability: the '80% of public spaces upgraded by 2035' and '100% compliance' KPIs were deleted.",
    change:"Have SMP 5.2.5, Transport's accessible-hub standards and EMP's barrier mapping formally reference the LDS Universal Design Manual, and restore a dated retrofit target to it. Chain: SMP demand data → EMP barrier map → LDS/Transport retrofit pipeline." },
  { sev:"med", pillar:"7", title:"SME / market spaces: duplication unchanged, shared target now deleted",
    docs:["SMP","LDS"],
    detail:"Social's actions are verbatim (renumbered 5.4.x → 5.5.x): co-working hubs, resource-sharing hubs, rentable multi-purpose spaces, community markets — plus an internal near-duplicate (5.5.1.3.2 vs 5.5.2.1.2). LDS keeps landscape-integrated market spaces (9.3.1.1) but deleted its quantified KPIs ('one SME hub per neighbourhood', '100 SME spaces by 2035', '80% occupancy') — so the number that could have been the shared target no longer exists in either plan.",
    change:"Restore one quantified SME-space target (LDS's old numbers were sound) and split roles: Landscape designs & delivers the physical spaces; Social runs leasing, vendor regulation and programmes. Fix SMP's internal duplicate." },
  { sev:"med", pillar:"5", title:"Urban cooling / heat mitigation now appears in four plans",
    docs:["EMP","LDS","SMP","HTMP"],
    detail:"EMP keeps the annual urban heat map + cooling corridors; LDS keeps the Street Shade Strategy (6.3.3.1); Social's green-cover-for-cooling plan moved to the new Safety & Resilience theme (5.4.2.2.1, text unchanged, still standalone); and Transport's new Theme 4 adds heat-reflective surfaces, shaded corridors and softscape mandates. Four uncoordinated heat programmes.",
    change:"One Urban Cooling Programme: EMP owns the evidence (heat map), LDS owns greening/shade delivery, Transport owns surface materials & road reservations, Social cross-references instead of planning its own green-cover plan." },
  { sev:"med", pillar:"5", title:"Green/blue corridors & biodiversity: EMP now the only one with targets",
    docs:["EMP","LDS"],
    detail:"EMP unchanged (corridor gaps −50% by 2030, habitat sites, biodiversity monitoring). The new LDS reduced its standalone biodiversity objective to species-selection sub-actions (8.3.2.1.2) and dropped '70% native species' and annual monitoring. The corridors still appear in both, but the delivery half got thinner while the monitoring half kept its numbers.",
    change:"Keep the split (EMP monitors & sets targets; LDS designs & plants) but restore a delivery commitment in LDS 8.3.1.2 (corridor km or native-species share) so EMP's 2030 target has an implementing counterpart." },
  { sev:"med", pillar:"2", title:"NEW — Waterfront & tourism: dropped by Landscape, now nobody delivers it",
    docs:["LDS","SMP","UDMP"],
    detail:"The new LDS deleted Waterfront Activation (FA 4.2, '12 annual waterfront events', '100% public shoreline access') and Green Tourism (FA 4.3, '5 major destination landscapes') — while its own Theme 4 overview still promises 'waterfront destinations, green tourism'. Social keeps the beach-access policy (5.1.3.3.2 open-use beach frontage) and the UDMP's Boardwalk/waterfront Character Areas are empty headings. A policy with no delivery owner.",
    change:"Decide the owner: either reinstate the two LDS objectives, or move waterfront activation & tourism delivery into the UDMP Character Areas (10.1 Boardwalk etc.) when they are written. Keep Social's access policy as the governance layer, with the old '100% public shoreline access' KPI as its measure." },
  { sev:"low", pillar:"6", title:"Cycling: consolidation by attrition — but Garden Island's bike links died with no owner",
    docs:["HTMP","EMP","LDS"],
    detail:"Transport (unchanged) remains the only plan treating cycling as a transport mode; EMP still maps the network & conflict points. The new LDS dropped its recreational trails KPI ('10 km') and the Garden Island park-connector bike routes — only bicycle parking survives (6.3.3.2.2). Less duplication than V1.0, but the recreational-loop layer no longer exists anywhere.",
    change:"Transport stays network owner; EMP supplies conflict data. Decide whether recreational cycling loops return to LDS park planning (7.3.4) or fold into Transport's network as a leisure layer." }
];

/* Document integrity issues found in the August 2026 drafts. */
const INTEGRITY_V12 = [
  { sev:"high", doc:"UDMP booklet (revised)", title:"Three conflicting theme-title sets in one document",
    detail:"The TOC uses the old theme titles (including the typo 'Theme 01 – Balances Urban Growth'), the body uses new titles ('Balanced Spatial Growth and Urban Structure', 'Creating Inclusive and Livable Communities', …), and the 11.4 KPI table reverts to the old titles again. Also '3.1.3 Shaping a Balances Urban Structure'.",
    change:"Pick the body titles as canonical; regenerate the TOC and relabel the KPI table." },
  { sev:"high", doc:"Social Development Masterplan", title:"Chapter 7 implementation tables still use the old 4-theme numbering",
    detail:"Chapter 5 was renumbered to 5 pillars (housing now 5.2.8, safety 5.4.x, economy 5.5.x) but Chapter 7's tables still carry the old scheme (housing as 5.3.6.2.x, economy as 5.4.x) — every cross-reference between the two chapters is now wrong.",
    change:"Renumber Chapter 7's tables to the new 5-pillar scheme." },
  { sev:"high", doc:"Landscape Masterplan (new draft)", title:"Chapter 7 sub-action numbering broken; §9.4 missing",
    detail:"Sub-action IDs repeat instead of incrementing: 7.3.1.1.1 appears ×5, 7.3.2.2.1 ×6, 7.3.3.1.1 ×6. Section numbering jumps 9.3 → 9.5 (no 9.4).",
    change:"Renumber Chapter 7 sub-action sequences and fix the section numbering." },
  { sev:"med", doc:"Landscape Masterplan (new draft)", title:"Every KPI deleted; implementation matrices missing",
    detail:"All of the old draft's quantified KPIs are gone (25,000 trees, 30% canopy, 80%-by-2035 retrofit, 5 km corridors, 10 km trails, SME counts). Theme matrices say '[separate attachment]'; Chapter 2 promises an Implementation Framework chapter that doesn't exist; footer says 'Version: 01 Date: 29/03/2026' on an 11/07/2026 draft; Theme 3 is 'URBAN FOREST' in the chapter but 'Green Forest' in the executive summary.",
    change:"Reattach the implementation matrices with restored KPIs, add the promised implementation chapter, and fix the version footer & theme naming." },
  { sev:"med", doc:"Landscape Masterplan (new draft)", title:"Mislabeled heading and orphaned Theme 4 scope",
    detail:"Action 6.3.2.3 is headed 'Park Connector Network' but its content is accessible navigation (tactile paving, audible signals) — the actual park-connector content (jogging + bike interlinks from Garden Island 2024) was never written. Theme 4's overview and key issues still promise waterfront destinations and green tourism, but no such objectives exist.",
    change:"Rename 6.3.2.3 (or write the real Park Connector action) and either reinstate the waterfront/tourism objectives or edit Theme 4's overview." },
  { sev:"med", doc:"Social Development Masterplan", title:"Duplicate & stray action IDs persist",
    detail:"The V1.0 duplicate '5.2.1.1.2' is still in Chapter 5 under Objective 5.2.6 (the Chapter 7 table was fixed to 5.2.6.1.2, the text wasn't). New strays: '5.3.1.4.4' inside Objective 5.2.7's sequence and '5.4.2.1.4' inside Action 5.5.2.1. Theme 3 jumps 5.3.2 → 5.3.6.",
    change:"Renumber the stray IDs and close the 5.3.x objective gap." },
  { sev:"med", doc:"Social Development Masterplan", title:"Duplicated conclusions and inconsistent counts",
    detail:"'Chapter 8: Conclusion' + 'Chapter 9: Next Steps' appear twice — one copy says 'four key themes', the other five. Chapter 5 claims 22 objectives but the new structure has 24; Chapter 3's intro says 'four strategic themes' then lists five; the TOC still shows the old 4-theme Chapter 5.",
    change:"Delete the stale conclusion pair, recount the objectives, and regenerate the TOC." },
  { sev:"med", doc:"Urban Development Framework (Word draft)", title:"Objective 2.2's heading is a copy of 2.1's",
    detail:"Section 3.4.2.2 is titled 'Promote inclusive and equitable urban environments for all population groups' — identical to 3.4.2.1 — while its body text describes accessibility & universal design (the old Objective 2.2). Sections 4.3 and 4.4 are also both titled 'Institutional Coordination'.",
    change:"Retitle 3.4.2.2 to the universal-design objective and give 4.4 its correct heading (planning-hierarchy context)." },
  { sev:"med", doc:"UDMP booklet (revised)", title:"Empty sections and conflicting figures",
    detail:"Still empty: 9.1 Overall Land Use Plan, 9.6 Mobility Framework, 9.7 Green & Blue Network, 7.7 Urban Identity Principle, and all ten Character Areas (10.1–10.10). 'Open Space Ratio: 1.31 SQ' (2.4.1) conflicts with 'approximately 2.5 m² per person' (2.1, 9.2.6); land-use shares 6.1–6.16 sum to ~70.7% with roads unaccounted; housing is absent from the 11.2 priority-project list.",
    change:"Write the empty sections (9.6/9.7 are where the sector plans should plug in), reconcile the open-space figures, and add a housing priority project." },
  { sev:"med", doc:"Transport Masterplan", title:"Draft tail unchanged; export corrupted",
    detail:"'~ DRAFT IN PROGRESS BEYOND THIS POINT ~' still stands: objectives tables exist for Theme 1 only; implementation, cost and M&E chapters are outlines; 'TBC….' in Methodology; reviewer anchors [MMA3]/[MMA4] remain; the Public Awareness Campaign action repeats the electric-bus action list; and the .md export is mojibake-corrupted (ï¬ / â€™) and should be re-extracted.",
    change:"Extend the objectives tables to Themes 2–4, complete the tail chapters, and re-export the document cleanly." },
  { sev:"low", doc:"Environment Master Plan", title:"'Updated' file is the same draft, re-converted badly",
    detail:"Environment.md (converted 10 Aug 2026) is the identical V2 Draft 1.0 via a PDF conversion that corrupted the action tables (cells split mid-word) and imported 'Error! Bookmark not defined.' from the TOC.",
    change:"No re-analysis needed — treat the original June conversion as canonical and discard this export." },
  { sev:"low", doc:"Urban Development Framework (Word draft)", title:"Objective 3.4 numbering bug now unverifiable; minor typos",
    detail:"The Word export auto-numbers its lists, so the Excel's 3.3.1–3.3.4 mis-numbering under Objective 3.4 can't be confirmed fixed. Typos: 'Active mobility plays a vial role' (Pillar 6), 'essential t creating' (Pillar 7).",
    change:"Confirm the renumbering in the source Excel and fix the typos." }
];

/* V1.2 per-document worklists. */
const DOC_ALIGN_V12 = {
  UDF:{
    role:"The overarching policy layer, now re-issued as a Word draft. Structure unchanged: 8 pillars → 33 objectives → 133 policy directions.",
    owns:["1","2","3","4","5","6","7","8"],
    missing:[
      {sev:"med", text:"Still no downward crosswalk — policy directions don't record which master plan delivers them (and the revised UDMP still doesn't reference the sector plans either)."},
      {sev:"med", text:"Objective 2.2's heading was overwritten with a copy of 2.1's title; §4.3 and §4.4 are both 'Institutional Coordination'."},
      {sev:"low", text:"The Objective 3.4 SPD numbering bug can't be verified in the Word export (auto-numbered lists) — confirm in the Excel."}],
    add:[
      {sev:"med", what:"A 'Delivered by' column/annex mapping each objective to the owning master plan + action ID.", where:"Framework annex"},
      {sev:"med", what:"Retitle Objective 2.2 (universal design) and section 4.4 (planning hierarchy).", where:"§3.4.2.2 and §4.4"},
      {sev:"low", what:"Fix typos ('vial role', 'essential t creating').", where:"Pillar 6 & 7 narrative"}],
    realign:[
      {with:["UDMP"], text:"UDMP body themes were renamed — keep the 1:1 pillar↔theme mapping legible by matching titles once UDMP settles its canonical set."}]
  },
  UDMP:{
    role:"The structural spine — no longer narrative-only. Strategy, control framework, zoning/density/height and an Implementation Framework (priority projects, stakeholders, KPIs) are now drafted.",
    owns:["1","2","3","4","5","6","7","8"],
    missing:[
      {sev:"high", text:"Financial & asset management (8.2) — the Implementation Framework has no funding section."},
      {sev:"high", text:"Still zero references to the four sector plans; 9.6 Mobility Framework and 9.7 Green & Blue Network (the natural plug-in points) are empty."},
      {sev:"med", text:"Housing delivery: strategy + KPI exist, but no housing priority project or unit pipeline (3.1); tenure mix unstated (3.3 leans on Social 5.2.8)."},
      {sev:"med", text:"Phasing (11.1) is advisory — no phase map, timeline, or infrastructure triggers (1.4)."},
      {sev:"med", text:"All ten Character Areas are empty headings — including 10.6 Knowledge Park, the anchor for innovation gap 7.3."},
      {sev:"med", text:"Three conflicting theme-title sets (TOC / body / KPI table); open-space figures conflict (1.31 vs 2.5 m²/person); land-use shares sum to ~70.7%."}],
    add:[
      {sev:"high", what:"A financing & asset-management section (funding sources, PPP mechanisms, lifecycle asset management).", where:"11. Implementation Framework"},
      {sev:"high", what:"Write 9.6 / 9.7 as explicit crosswalks to the Transport, Environment and Landscape master plans.", where:"9.6 Mobility Framework · 9.7 Green & Blue Network"},
      {sev:"med", what:"A housing delivery priority project with unit targets by phase.", where:"11.2 Priority Projects"},
      {sev:"med", what:"A real phasing schedule: mapped phases + infrastructure triggers.", where:"11.1 Development Phasing"},
      {sev:"med", what:"Write the Character Areas — 10.1 Boardwalk can absorb the waterfront/tourism programme Landscape dropped; 10.6 Knowledge Park closes gap 7.3.", where:"10. Character Areas"},
      {sev:"med", what:"Normalize the theme titles across TOC, body and KPI table.", where:"TOC / 3.x / 11.4"}],
    realign:[
      {with:["SMP","HTMP","EMP","LDS"], text:"Name the delivering sector plan(s) under each theme — Social's new Chapter 1 already acknowledges the hierarchy; reciprocate it."}]
  },
  SMP:{
    role:"Sector plan, restructured to 5 pillars (Governance / Equity & Inclusion / Wellbeing / Safety & Resilience / Economy) with a strong new evidence base. Now also carries housing (5.2.8) and culture (5.2.7).",
    owns:["8","2","7"],
    missing:[
      {sev:"high", text:"Chapter 7's implementation tables still use the old 4-theme numbering — every cross-reference to the renumbered Chapter 5 is broken."},
      {sev:"med", text:"The V1.0 duplicate ID 5.2.1.1.2 survives in Chapter 5 (fixed only in the Chapter 7 table); new strays 5.3.1.4.4 and 5.4.2.1.4 appeared."},
      {sev:"low", text:"Innovation / creative economy (7.3) still has no action — 'innovation' appears only as issue 4.5.3.3."},
      {sev:"low", text:"Duplicated conclusion chapters; objective count says 22 but the structure has 24."}],
    add:[
      {sev:"high", what:"Renumber Chapter 7 to the new 5-pillar scheme.", where:"Chapter 7 tables"},
      {sev:"med", what:"Fix the duplicate/stray sub-action IDs.", where:"Objectives 5.2.6, 5.2.7, Action 5.5.2.1"},
      {sev:"low", what:"An innovation / creative-economy objective to help close framework gap 7.3.", where:"Theme 5 · Economic Sustainability"}],
    realign:[
      {with:["EMP","HTMP"], text:"The Urban Management System (5.1.4.1) is now linked to the internal data hub — take the next step and recast both as modules of the single shared city platform."},
      {with:["LDS"], text:"SME/market actions are verbatim from V1.0 and LDS deleted the shared numbers — restore one quantified target and split physical delivery (LDS) from programmes & leasing (SMP)."},
      {with:["LDS","HTMP","EMP"], text:"Reference the new Hulhumalé Universal Design Manual (LDS 6.3.2.1.1) from the retrofit action 5.2.5.1.1 instead of defining retrofits independently."},
      {with:["LDS","EMP","HTMP"], text:"Point the relocated green-cover/heat action (5.4.2.2.1) at the shared cooling programme rather than a standalone plan."}]
  },
  HTMP:{
    role:"Sector plan. Themes 1–3 unchanged; Theme 4 (Environmental Conservation & Resilience) now fully drafted — 17 strategic directions on verges, street trees, monitoring, lighting and heat.",
    owns:["6","5"],
    missing:[
      {sev:"high", text:"Everything after Chapter 5 is still 'DRAFT IN PROGRESS': objectives tables cover Theme 1 only; implementation, cost (8.2-relevant) and M&E chapters are outlines."},
      {sev:"med", text:"Theme 4's new 'unified data management platform' for environmental monitoring isn't wired to the plan's own Smart Mobility Management Platform — a fourth city-platform candidate."},
      {sev:"med", text:"The Street Tree Network Plan demands 'corridor-by-corridor canopy coverage targets' but states no numbers; reviewer anchors [MMA3]/[MMA4], 'TBC….' and a copy-paste bug (EV-bus actions under Public Awareness) remain; the export is mojibake-corrupted."}],
    add:[
      {sev:"high", what:"Objectives & action tables for Themes 2–4, plus the cost and M&E chapters.", where:"Objectives and Strategic Actions · tail chapters"},
      {sev:"med", what:"Wire Theme 4's environmental monitoring into the SMMP/TOC (and ultimately the shared city platform).", where:"Theme 4 · Focus 03"},
      {sev:"med", what:"A scope note: Green Verge Management Standard and Street Tree Network Plan are joint instruments with EMP (evidence) and LDS (planting/design).", where:"Theme 4 · Focus 01–02"}],
    realign:[
      {with:["EMP","SMP"], text:"Recast the SMMP as the mobility module of the shared city data platform; merge Theme 4's monitoring network with EMP's sensor network instead of building a parallel one."},
      {with:["LDS","EMP"], text:"Street trees & shaded corridors: adopt one canopy target with LDS (owner) and EMP (monitoring); Transport keeps road-reservation & arboricultural standards."},
      {with:["LDS","EMP","SMP"], text:"Walkability: Transport owns network & crossings — fold LDS's parallel pedestrian network plan (6.3.1.1) into one instrument."}]
  },
  EMP:{
    role:"Sector plan. Unchanged — the August file is the same V2 Draft 1.0 re-converted. Still the only plan with delivery machinery (Delivery Unit, Decision Gate, KPI tables) and now the only holder of numeric greening targets.",
    owns:["5","4","8"],
    missing:[
      {sev:"low", text:"Utility provisioning (4.1) is now owned by UDMP priority project 11.2.1 — EMP's role (data & monitoring) should say so explicitly."},
      {sev:"low", text:"Still no cross-references to the other plans' overlapping programmes (verges, walkability, cooling, sensors)."}],
    add:[
      {sev:"med", what:"Scope-boundary notes for the four Theme 4/6 overlap areas that Transport's new Theme 4 amplified (verges, monitoring network, cooling, walkability).", where:"Themes 2, 3, 4, 6"},
      {sev:"low", what:"Re-export the document — the August PDF conversion corrupted the action tables.", where:"Document control"}],
    realign:[
      {with:["SMP","HTMP"], text:"Offer the GIS Repository architecture as the shared city platform — it remains the only specified one; SMP's UMS and both Transport platforms become modules."},
      {with:["LDS","HTMP"], text:"Tree/canopy: EMP's inventory + survival + canopy KPIs are now the only numbers in the system — lend them to LDS's Urban Forest Master Plan and Transport's Street Tree Network Plan as the shared target."},
      {with:["HTMP"], text:"Green verges & stormwater: EMP audit/pooling evidence feeds Transport's proposed Green Verge Management Standard."}]
  },
  LDS:{
    role:"Sector plan, rewritten 11 Jul 2026. Stronger blueprint (Universal Design Manual, Urban Forest MP, park standards) — weaker accountability (all KPIs deleted, waterfront & tourism dropped, Garden Island 2024 silently half-merged).",
    owns:["2","5","6","7"],
    missing:[
      {sev:"high", text:"Every quantified KPI was deleted — no tree/canopy number, no retrofit deadline, no corridor km. Canopy targets deferred to a future Urban Forest Master Plan."},
      {sev:"high", text:"Waterfront activation & green tourism objectives removed while Theme 4's overview still promises them — and no other document picked them up."},
      {sev:"med", text:"Garden Island 2024 absorbed without attribution; its Adopt-a-Tree, 25,000-tree drive, bike routes, roadside irrigation, green-building incentive and re-vegetation plan were dropped silently."},
      {sev:"med", text:"Chapter 7 sub-action numbering broken (repeated IDs); §9.4 missing; 6.3.2.3 'Park Connector Network' heading sits on an accessible-navigation action."}],
    add:[
      {sev:"high", what:"Set the citywide canopy/tree target now (inside 8.3.1.1) instead of deferring it, and restore dated KPIs to each theme.", where:"Theme 3 · Urban Forest + implementation matrices"},
      {sev:"high", what:"Reinstate waterfront & tourism objectives, or formally hand them to the UDMP Character Areas.", where:"Theme 4 · Green Economic Activation"},
      {sev:"med", what:"A disposition table for Garden Island 2024: absorbed / carried forward / retired, so dropped actions are decisions, not accidents.", where:"Front matter"},
      {sev:"med", what:"Publish the Universal Design Manual as the citywide standard the other plans reference.", where:"Objective 6.3.2"}],
    realign:[
      {with:["HTMP","EMP"], text:"Urban forestry: one canopy target + one management instrument shared with Transport's Street Tree Network Plan; EMP keeps inventory & monitoring (merge the duplicate GIS tree databases)."},
      {with:["SMP"], text:"SME/market spaces: restore the quantified target and keep physical delivery here, programmes in Social."},
      {with:["HTMP","EMP","SMP"], text:"Fold the citywide pedestrian network plan (6.3.1.1) into Transport's network instrument; keep shade/streetscape delivery here."}]
  }
};

/* V1.2 mind-map plan taxonomy + tree. */
const MM_PLAN_V12 = {
  U:{name:"Hulhumalé Urban Development Masterplan (revised, Aug 2026)",color:"#6366f1"},
  S:{name:"Social Development Masterplan (draft, 28/07/2026 — 5 pillars)",color:"#ec4899"},
  T:{name:"Hulhumalé Transport Masterplan (draft — Theme 4 drafted, Aug 2026)",color:"#0ea5e9"},
  L:{name:"Garden Island — Landscape Masterplan (new draft, 11/07/2026)",color:"#f59e0b"},
  G:{name:"Garden Island 2024 (silently half-merged into the LDS draft)",color:"#b45309"},
  E:{name:"Environment Master Plan V2 (Draft 1.0, June 2026 — unchanged)",color:"#22c55e"}
};

const MINDMAP_V12 = {
name:"HDC · Hulhumalé Masterplan System (V1.2)", status:"root", detail:{
 summary:"Re-analysis of the August 2026 drafts: a substantially expanded Urban Development Masterplan (real strategy + implementation layer), a restructured 5-pillar Social plan, a Transport plan whose Theme 4 went from skeleton to ~19,000 words, a rewritten Landscape plan that deleted every KPI, and an unchanged Environment plan. This map shows where the documents now overlap, duplicate each other, and where the update fixed — or worsened — alignment.",
 quotes:[],
 insight:"The update closed three of V1.0's eight framework gaps (density, utilities, competitiveness — all via the revised UDMP) but the cross-plan duplication picture worsened: a fourth city-data-platform candidate appeared (Transport Theme 4), Landscape resolved the tree-target conflict by deleting every number, and waterfront/tourism now has no delivery owner. 10 red-flag duplications and 8 coordination overlaps are mapped below."
}, children:[
{name:"The Plans", status:"group", detail:{summary:"Reference branch — the umbrella plan, four sector plans, and the Garden Island 2024 source document (now silently half-absorbed by the Landscape draft).",quotes:[],insight:""}, children:[
 {name:"Urban Development MP (umbrella)", status:"plan", plans:["U"], detail:{
  summary:"No longer an outline. Now carries: Masterplan Strategy (Live–Work–Play, Urban Development Control Framework, urban systems incl. 5–10 Minute Neighborhoods), zoning/density/height strategies, and an Implementation Framework with priority projects, stakeholders and per-theme KPIs. Still empty: 9.1 Land Use Plan, 9.6 Mobility Framework, 9.7 Green & Blue Network, all ten Character Areas.",
  quotes:[
   {p:"U",r:"1.1 Vision",t:"Hulhumalé is envisioned as the Maldives' premier urban, economic, and innovation hub, providing an inclusive, climate-resilient, and sustainable city for current and future generations."},
   {p:"U",r:"8.5.2 Urban Systems",t:"Neighborhoods are planned so that residents can access most daily services within a comfortable 5 to 10 minute walk from their homes."},
   {p:"U",r:"2.1 · 2025 Masterplan Revision",t:"This revision represents a broader shift in Hulhumalé's planning philosophy—from sequential expansion towards an integrated metropolitan approach"},
   {p:"U",r:"11.2.1 Priority Projects",t:"Completion and upgrading of critical infrastructure networks, including roads, drainage, sewerage, water supply, power distribution, waste management, and telecommunications systems."}],
  insight:"The biggest single improvement of the update — it resolves framework gaps 1.3 (density/mixed-use), 4.1 (utilities) and 7.4 (competitiveness). But it still never references the four sector plans, carries three conflicting theme-title sets (TOC vs body vs KPI table), and has no financing section — so gap 8.2 (financial & asset management) is now the last pillar-level hole in the system."}},
 {name:"Social Development MP", status:"plan", plans:["S"], detail:{
  summary:"Restructured from 4 themes to 5 pillars: Governance · Social Equity & Inclusion (now incl. culture 5.2.7 and affordable housing 5.2.8) · Community Wellbeing · Safety & Resilience (new) · Economic Sustainability. Heavy new evidence base: HIES 2019, Census 2022, police crime statistics, childcare studies.",
  quotes:[
   {p:"S",r:"Ch.1 (new)",t:"…one of five sectoral master plans under the Urban Master Plan and the Urban Development Framework."},
   {p:"S",r:"5.2.8.1.2 (new)",t:"Provide affordable housing opportunities for low- and middle-income residents using suitable tenure and delivery models, such as rent-to-own housing schemes…"},
   {p:"S",r:"5.1.4.1.1",t:"Develop a centralized Urban Management System to integrate urban data, monitor service delivery, and support internal and external decision-making. The system is to be connected to the centralized data hub or GIS-based planning system"}],
  insight:"First plan to state the document hierarchy explicitly — its new Chapter 1 names the five sectoral plans under the UMP + Framework. The housing objective (5.2.8) helps close framework gap 3.3 (tenure). But the restructure broke its own implementation layer: Chapter 7's tables still use the old 4-theme numbering, the V1.0 duplicate ID 5.2.1.1.2 survives, and the conclusions chapter appears twice."}},
 {name:"Transport MP", status:"plan", plans:["T"], detail:{
  summary:"Single-purpose revision: Themes 1–3 are word-for-word unchanged; Theme 4 (Environmental Conservation & Resilience) grew from a 1,000-word skeleton to ~19,000 words — 17 strategic directions on green verges, street trees, environmental monitoring, lighting and heat.",
  quotes:[
   {p:"T",r:"Theme 4 · Focus 01",t:"A continuous, well-vegetated, and unobstructed green verge network is, in hydrological terms, a linear infiltration system distributed across the entire length of Hulhumalé's road network."},
   {p:"T",r:"Theme 2 · Focus 01",t:"Pedestrianisation — the designation of specific streets, precincts, or public spaces as vehicle-free or vehicle-restricted environments — is one of the most impactful tools available to a city seeking to reclaim its public realm for people."},
   {p:"T",r:"Theme 4 · Focus 02 (issue)",t:"No Street Tree Network Plan establishing corridor-by-corridor canopy coverage targets, priority planting locations, phased delivery programme, and long-term canopy coverage goals across Phase 1 and Phase 2."}],
  insight:"Theme 4 is genuinely strong environmental drafting — but it deepens the overlaps rather than resolving them: its Green Verge Management Standard and Street Tree Network Plan collide with Landscape's Urban Forest instruments, and its 'unified data management platform' for monitoring is a fourth city-platform candidate, unwired even to the plan's own Smart Mobility Management Platform. The tail chapters (costs, implementation, M&E) remain outlines behind the 'DRAFT IN PROGRESS' marker."}},
 {name:"Landscape MP (11/07/2026 draft) — primary", status:"plan", plans:["L"], detail:{
  summary:"Rewritten draft. Themes: Enhancing Pedestrian Experience · Green Development · Urban Forest (renamed from Green Forest) · Green Economic Activation (halved — waterfront activation and green tourism removed). Accessibility hugely expanded around a new Hulhumalé Universal Design Manual. Every quantified KPI deleted.",
  quotes:[
   {p:"L",r:"Ch.3 Vision",t:"Garden Island – A Resilient Blue-Green Hulhumalé for People, Nature, and Community"},
   {p:"L",r:"6.3.2.1.1",t:"Prepare a Hulhumalé Universal Design Manual for public realm projects."},
   {p:"L",r:"8.3.1.1.2",t:"Establish long-term urban tree canopy targets for the city."}],
  insight:"Stronger blueprint, weaker accountability. The Universal Design Manual answers V1.0's accessibility-standard overlap, and the Urban Forest chapter is more professional — but the 25,000-tree and 30% canopy targets were deleted rather than reconciled (canopy targets deferred to a future Urban Forest Master Plan), all retrofit deadlines are gone, and the implementation matrices are '[separate attachment]'. Chapter 7's sub-action numbering is broken (repeated IDs) and §9.4 is missing."},
  children:[
   {name:"Supporting: Garden Island 2024", status:"plan", plans:["G"], detail:{
    summary:"The June 2024 implementation deck. In V1.2 its fate is knowable: silently half-merged into the new Landscape draft — alleyway rejuvenation, shaded paths, creative crossings, murals and the park guideline were absorbed (unattributed); Adopt-a-Tree, the 25,000-trees-by-2025 drive, park-connector bike routes, the citywide roadside irrigation network, the Green Building Incentive, the reclaimed-land re-vegetation plan and the knowledge platform were dropped without mention.",
    quotes:[
     {p:"G",r:"Action 2.2.2 (2024)",t:"Plant 25,000 trees by 2025"},
     {p:"G",r:"Objectives",t:"Enhancing Pedestrian Experience Within the City … Quality of Urban Streetscape … Green Developments … Introducing Community Gathering Spots … Economic Drive"}],
    insight:"V1.0 recommended absorbing this deck as the LDS's delivered baseline with a formal disposition of each action. Half of that happened — the absorption — but without the disposition: nothing records what was planted against the 25,000 target, and the dropped actions (bike routes, irrigation, green-building incentive) are silent casualties. Add a one-page disposition table to the LDS front matter: absorbed / carried forward / retired."}}
  ]},
 {name:"Environment MP V2", status:"plan", plans:["E"], detail:{
  summary:"Unchanged. The August 'Environment.md' is the identical V2 Draft 1.0 re-converted from PDF (the conversion corrupted its action tables). Seven themes on an Open Environmental Governance + GIS spine; every action has GIS outputs, KPIs and review cycles.",
  quotes:[
   {p:"E",r:"3.2 Vision",t:"To develop Hulhumalé as a climate-ready, low-carbon, resource-efficient, nature-positive and liveable urban island, guided by Open Environmental Governance, GIS-based planning, public accountability and collaboration…"},
   {p:"E",r:"Theme 3 KPIs",t:"100% public tree inventory completed within 12 months. Tree survival rate above 85% annually."}],
  insight:"Standing still made it more central: with Landscape's numbers deleted, EMP now holds the only numeric greening targets in the system (inventory, survival, canopy trend, cooling corridors), and its GIS repository remains the only specified data architecture while the platform count rose to four. Its Delivery Unit and Decision Gate are still the only delivery machinery anywhere in the set."}}
]},
{name:"Shared Foundation", status:"green", plans:["S","T","L","E"], detail:{
 summary:"The four sector plans still share one joint consultation process and issue-grouping method — and the new Social draft now also states the document hierarchy explicitly.",
 quotes:[
  {p:"S",r:"Ch.1 (new)",t:"…one of five sectoral master plans under the Urban Master Plan and the Urban Development Framework."},
  {p:"T",r:"Ch.3 Methodology",t:"These consultation sessions were conducted in an integrated manner for all four master plans, namely the social, landscape, transport, and environmental master plans."}],
 insight:"The shared evidence base survived every revision — divergence still happens downstream at theme naming, targets and ownership. New in V1.2: Social's Chapter 1 is the first place any plan names the whole hierarchy. Replicate that paragraph in the other three sector plans and the UDMP, and the orientation problem is half-solved."}},
{name:"Overlap Map", status:"group", detail:{summary:"20 domains where two or more plans occupy the same territory, grouped in four clusters. Colour = severity, re-scored against the August 2026 drafts.",quotes:[],insight:""}, children:[
{name:"Environment & Climate", status:"group", detail:{summary:"Seven overlap domains. Transport's newly drafted Theme 4 landed squarely in this cluster — verges, monitoring and heat all got a new claimant.",quotes:[],insight:""}, children:[
 {name:"Urban heat, trees & canopy", status:"red", plans:["L","G","S","E","T","U"], detail:{
  summary:"V1.0's headline conflict (25,000 trees by 2025 vs 2040, 30% canopy) was 'resolved' by deletion: the new Landscape draft removed every number and deferred canopy targets to a future Urban Forest Master Plan. Transport's new Theme 4 now demands corridor canopy targets (unstated); EMP keeps the only numeric commitments.",
  quotes:[
   {p:"G",r:"Action 2.2.2 (2024)",t:"Plant 25,000 trees by 2025"},
   {p:"L",r:"8.3.1.1.2 (new draft)",t:"Establish long-term urban tree canopy targets for the city."},
   {p:"T",r:"Theme 4 · Focus 02 (new)",t:"No Street Tree Network Plan establishing corridor-by-corridor canopy coverage targets, priority planting locations, phased delivery programme, and long-term canopy coverage goals across Phase 1 and Phase 2."},
   {p:"E",r:"Theme 3 KPIs",t:"Annual canopy cover map published. Net canopy cover increases year on year."},
   {p:"S",r:"5.4.2.2.1 (was 5.3.4.2.1)",t:"Develop a city-level plan to increase green cover as a strategy for urban heat mitigation."}],
  insight:"Deleting the conflicting numbers removed the contradiction but also the commitment — no document now owns a tree or canopy target, while three management instruments compete (LDS Urban Forest Master Plan + Management Plan, Transport Street Tree Network Plan + arboricultural standards, EMP inventory + heat maps). Fix: set the citywide target inside LDS 8.3.1.1 now (not a future document), adopt EMP's inventory/survival KPIs as the measurement, and make Transport's corridor targets quote the same figure. Record the 2024 planting baseline so the target is 'net additional'."}},
 {name:"Green verges & passive drainage", status:"red", plans:["T","E","L","S"], detail:{
  summary:"Upgraded from amber: Transport's drafted Theme 4 turns verges into hydrological infrastructure with its own Green Verge Management Standard — the arbitration instrument V1.0 asked for, but written unilaterally while EMP still audits the same verges and LDS still plants them.",
  quotes:[
   {p:"T",r:"Theme 4 · Focus 01 (new)",t:"A continuous, well-vegetated, and unobstructed green verge network is, in hydrological terms, a linear infiltration system distributed across the entire length of Hulhumalé's road network."},
   {p:"E",r:"Theme 2 action",t:"Audit green verges and passive drainage — Assess compaction, blockage, surface gradient, soil condition and vegetation health. Prioritise rehabilitation."},
   {p:"L",r:"6.3.3.3.1 (new draft)",t:"Introduce landscaped road verges to provide a green buffer between pedestrians and vehicular traffic while enhancing the visual quality of streets."},
   {p:"S",r:"Ch.4 (photo caption)",t:"Planting by residents within green verge areas has been reported to create challenges for the passive drainage system."}],
  insight:"Transport's Green Verge Management Standard is the right idea and the wrong authorship model — three plans now propose verge treatments with no arbitration. Make the Standard a jointly-owned instrument: EMP supplies the audit & pooling evidence (already specified), Transport rules on driveways/utility crossings, LDS sets the planting & design palette (its community verge-planting programme 6.3.3.3.6 plugs in as the stewardship layer), and Social's sanctioned community-gardening question is settled inside it."}},
 {name:"Flooding, drainage & SuDS", status:"amber", plans:["T","E","L","S","U"], detail:{
  summary:"Transport's Theme 4 now carries the most developed SuDS content (bioswale networks, water-sensitive design, climate-adaptive drainage). The LDS's undeliverable '50% flood reduction' KPI from V1.0 disappeared with all its other KPIs; EMP keeps the pooling-hotspot evidence; the revised UDMP adds a green drainage network to its urban systems.",
  quotes:[
   {p:"T",r:"Theme 4 · Focus 01 (new)",t:"Sustainable Drainage Corridors and Bioswale Networks … Reduction of Network-Level Surface Impermeability … Climate-Adaptive Transport Drainage Design"},
   {p:"E",r:"Theme 2 action",t:"Map water pooling hotspots — Use public reports, field checks, rainfall events and drone observations to validate pooling locations and causes."},
   {p:"L",r:"8.3.2.1.3 (new draft)",t:"Integrate nature-based solutions such as bioswales, rain gardens, permeable landscapes, and other green infrastructure into public open spaces where appropriate."}],
  insight:"Healthier than V1.0 — the misplaced outcome KPI is gone and the strongest drafting now sits with the plan that owns the road reserve. Keep: Transport delivers road-corridor SuDS, LDS delivers park/open-space green infrastructure, EMP owns the evidence and the flood-reduction outcome measure. The UDMP's empty 9.7 Green & Blue Network section is where this division should be written down."}},
 {name:"Waste & source segregation", status:"red", plans:["S","E","L","U"], detail:{
  summary:"Unchanged duplication: Social and EMP still each commission neighbourhood segregation pilots (Social's action relocated intact into its new Safety & Resilience theme). The new LDS adds bins/recycling stations and smart waste tech to streetscapes (6.3.3.2.4–6).",
  quotes:[
   {p:"S",r:"Theme 4 (was 5.3.4.3.2)",t:"Conduct neighborhood-level segregation pilots and periodic waste collection campaigns."},
   {p:"E",r:"Theme 4 action + KPI",t:"Pilot source segregation — … Segregation pilots launched in at least 3 residential clusters and 5 institutions. Contamination rate below 20% in pilot areas within 12 months."},
   {p:"L",r:"6.3.3.2.4 (new draft)",t:"Increase the provision of waste bins and recycling stations along pedestrian corridors and public spaces."}],
  insight:"Verdict unchanged from V1.0: assign the pilot to EMP — it alone has the delivery mechanism (WAMCO MOU, contamination KPI, dashboards). Social keeps behaviour change and awareness; LDS keeps physical bin/point provision inside streetscape standards (its new smart-waste sub-action should defer to EMP's monitoring rather than introduce another system)."}},
 {name:"Air quality, dust & noise sensors", status:"red", plans:["S","E","T"], detail:{
  summary:"Worse than V1.0: Transport's Theme 4 Focus 03 is now a fully drafted Integrated Environmental Monitoring Network with 'a unified data management platform' — a complete parallel to EMP's specified sensor network, while Social keeps its air-quality sensors + public dashboards action.",
  quotes:[
   {p:"T",r:"Theme 4 · Focus 03 (new)",t:"a coherent, city-scale sensing architecture with common technical standards, a unified data management platform"},
   {p:"E",r:"Theme 4 action",t:"Deploy air quality, dust and noise sensors — Install sensors in construction zones, Industrial Zone, high-density areas, schools, major roads and coastal public spaces."},
   {p:"S",r:"5.1.1.3.x",t:"Install urban air quality sensors and public dashboards, particularly near construction zones and high-activity areas, to support public health awareness"}],
  insight:"Three sensor networks became two specified ones plus a dashboard — the wrong direction. EMP's Section 4.8 IoT Environmental Sensor Network remains the single network of record; Transport's Theme 4 should consume its construction-dust and roadside feeds (its enforcement use-case is legitimate), and Social gets the public-health dashboard. Transport's 'unified data management platform' should be struck and replaced with a reference to the shared city platform."}},
 {name:"Green buildings & solar", status:"amber", plans:["E","S","T","U"], detail:{
  summary:"EMP's mandatory Green Building Performance Standard is unchanged; Social still 'encourages' green building practices; the Garden Island 2024 incentive idea was dropped by the new LDS; Transport's Theme 4 now drafts solar street lighting and renewable energy for transport infrastructure in detail.",
  quotes:[
   {p:"E",r:"Theme 5 action + KPI",t:"Develop Hulhumalé Green Building Performance Standard — … 100% new major developments screened against green building criteria."},
   {p:"T",r:"Theme 4 · Focus 04 (new)",t:"Smart Adaptive Street Lighting Systems … Solar-Powered and Renewable Energy Street Lighting … 50–70% energy savings, smart controls a further 20–40%."},
   {p:"S",r:"Theme 4 (was 5.3.4.1.3)",t:"Encourage green building practices that enhance energy efficiency and environmental performance."}],
  insight:"The mandatory-vs-voluntary question is still open (EMP screens, Social encourages) and the 2024 incentive carrot vanished with the LDS rewrite — revive it inside EMP's standard as the compliance incentive. Solar division of labour is clean and should be stated: EMP maps potential and owns building energy; Transport delivers street-lighting energy transition from that map."}},
 {name:"Disaster preparedness", status:"green", plans:["S","E","U"], detail:{
  summary:"Still the cleanest split in the set: Social writes the plan and communications (now under its Safety & Resilience theme, 5.4.2.4), EMP maps the spatial layers, both build on shared DMP/HVCA work. The vulnerable-population registry moved to Social 5.1.1.3.3.",
  quotes:[
   {p:"S",r:"5.4.2.4.1 (was 5.3.4.4.1)",t:"Formulate, validate, and publish a comprehensive local disaster preparedness and response plan."},
   {p:"E",r:"Theme 2 action",t:"Map disaster preparedness layers — Integrate DMP and HVCA outputs. Publish assembly points, public shelter areas and relief management areas where appropriate."},
   {p:"S",r:"5.1.1.3.3",t:"Establish and regularly update a registry and spatial mapping of vulnerable populations… to support targeted planning, evacuation, and emergency planning."}],
  insight:"Keep the split, and keep V1.0's one stitch: the vulnerable-population registry should live as a single protected dataset inside the shared GIS platform under EMP's Class 4/5 data classification — Social's restructure didn't change the privacy question."}}
]},
{name:"Public Realm & Mobility", status:"group", detail:{summary:"Seven domains — still the densest cluster. The Landscape rewrite strengthened design content but deleted the targets; Transport's Theme 4 added shade and lighting claims.",quotes:[],insight:""}, children:[
 {name:"Walkability & pedestrian corridors", status:"red", plans:["L","T","S","E","U","G"], detail:{
  summary:"Two plans now write citywide pedestrian network plans: LDS 6.3.1.1 ('Prepare a citywide pedestrian network plan… design standards') and Transport Theme 2 (unchanged Pedestrian Priority Zones + network). Transport's Theme 4 adds shaded active-mobility corridors on top of LDS's Street Shade Strategy. With LDS's KPIs deleted, EMP's '5 corridors by year 5' is the only surviving target.",
  quotes:[
   {p:"L",r:"6.3.1.1.1 (new draft)",t:"Prepare a citywide pedestrian network plan identifying primary and secondary pedestrian corridors linking residential areas, parks, schools, commercial centers, transport hubs, beaches, and community facilities."},
   {p:"T",r:"Theme 2 · Focus 01",t:"…advances the identification, design, and progressive implementation of Pedestrian Priority Zones within Hulhumalé's highest-activity locations…"},
   {p:"T",r:"Theme 4 · Focus 02 (new)",t:"Climate Responsive Shaded Active Mobility Corridors"},
   {p:"E",r:"Theme 6 action + KPI",t:"Upgrade priority walking corridors — … At least 5 priority walking corridors upgraded by year 5."},
   {p:"S",r:"5.4.3.1.1 (was 5.3.5.1.1)",t:"Improve pedestrian infrastructure through planning, development and maintenance of uninterrupted sidewalks, raised and signalized crossings"}],
  insight:"V1.0's three-move fix still stands and is now more urgent: (1) one Priority Walking Network map (EMP already commits to it) that every plan's actions reference; (2) merge the two parallel network plans — Transport owns network & crossings, LDS owns shade/surface/streetscape delivery; (3) put a number back — LDS deleted '90% within 300m' and '5 km of corridors', so reconcile around EMP's corridor target or restore the LDS ones in its separate implementation matrix."}},
 {name:"Universal accessibility (PWD)", status:"amber", plans:["L","S","T","E"], detail:{
  summary:"Downgraded from red — the update's clearest win. LDS now authors a Hulhumalé Universal Design Manual (6.3.2.1.1) with 16 accessibility sub-actions (step-free entrances, inclusive playgrounds, audible signals, accessible boardwalks). But Social's retrofit action is verbatim unchanged and nobody cites the Manual yet — and LDS deleted its '80% by 2035' retrofit KPI.",
  quotes:[
   {p:"L",r:"6.3.2.1.1 (new draft)",t:"Prepare a Hulhumalé Universal Design Manual for public realm projects."},
   {p:"L",r:"6.3.2.1.3 (new draft)",t:"Integrate Universal Design requirements into all future HDC landscape design projects."},
   {p:"S",r:"5.2.5.1.1",t:"Retrofit public spaces and buildings with ramps, lifts, tactile paving, and inclusive signage."},
   {p:"E",r:"Theme 6 action",t:"Map accessibility barriers — Identify broken footpaths, missing ramps, unsafe crossings, poor lighting and obstruction points."}],
  insight:"The chaining opportunity from V1.0 is now buildable: Social holds the demand data (908 PWDs mapped by residence), EMP holds the barrier-mapping method, LDS now holds the standard, Transport holds transit accessibility. Two edits finish it: the other three plans cite the Manual by name, and a dated retrofit target returns to the LDS implementation matrix."}},
 {name:"Wayfinding & signage", status:"red", plans:["L","S","T","G"], detail:{
  summary:"Still duplicated: LDS expanded its citywide wayfinding system (now with digital wayfinding, QR codes, park identity 6.3.4) while Social's parallel signage action carried over verbatim into the new numbering. The 2024 wayfinding-board action was absorbed by LDS without an audit of what was installed.",
  quotes:[
   {p:"L",r:"6.3.4.1.1 (new draft)",t:"Prepare a Citywide Wayfinding Strategy covering all public spaces, parks, beaches, transport facilities, and community destinations."},
   {p:"L",r:"6.3.4.1.6 (new draft)",t:"Integrate digital wayfinding solutions, including QR codes, digital maps, mobile applications, and smart information platforms…"},
   {p:"S",r:"5.4.3.1.2 (was 5.3.5.1.2)",t:"Design and install clear, consistent road and public space signage to support wayfinding, and improve road usage and safety."}],
  insight:"LDS's expanded Wayfinding Strategy is now clearly the primary instrument — the remaining fix is unchanged from V1.0: Social narrows to the inclusivity requirement (tactile, multilingual), Transport supplies the road-safety signage layer, and the 2024 boards get audited before anything is re-scoped."}},
 {name:"Cycling networks", status:"amber", plans:["T","E","L","S","G"], detail:{
  summary:"Consolidation by attrition: Transport (unchanged) remains the only plan treating cycling as transport; EMP still maps conflicts. The new LDS dropped its 10 km recreational-trails KPI and the Garden Island park-connector bike routes — only bicycle parking survives (6.3.3.2.2). The recreational-loop layer now exists nowhere.",
  quotes:[
   {p:"T",r:"Theme 2 (unchanged)",t:"cycling infrastructure planned and partially delivered in earlier phases of development has subsequently been removed or compromised… Rebuilding that commitment… is the central task of this strategic direction."},
   {p:"E",r:"Theme 6 action",t:"Map cycling and micromobility network — Identify safe corridors, parking points, conflict areas and links to public facilities."},
   {p:"S",r:"5.3.2.3.1",t:"…development of fitness areas, walking and cycling loops."}],
  insight:"Less duplication than V1.0, but by deletion again: the Garden Island bike links died with no owner. Transport stays network owner with EMP's conflict data; decide deliberately whether recreational loops return to LDS park planning (7.3.4) or live in Transport's network as a leisure layer — and note the LDS 6.3.2.3 'Park Connector Network' heading is currently pasted on an unrelated accessibility action."}},
 {name:"Public transport & bus stops", status:"green", plans:["T","S","E","U"], detail:{
  summary:"Still complementary and untouched by the update: Transport plans the service (Themes 1–3 unchanged), Social keeps bus-stop access under its new Safety & Resilience numbering, EMP keeps the access/shade audit.",
  quotes:[
   {p:"T",r:"Theme 1",t:"This theme establishes public transportation as the primary and preferred mode of travel in Hulhumalé — not merely as an alternative to private vehicles, but as the backbone of daily urban mobility."},
   {p:"E",r:"Theme 6 KPI",t:"Public transport access map published. Bus stop accessibility and shade audit completed."}],
  insight:"Unchanged verdict: Transport is sole owner of routes, frequency, fares, BRT and hub design; Social's access actions and EMP's audits are inputs. Transport's demand chapter is still an outline — Social's commuting evidence (Sinamalé Bridge peak flows) belongs there when it's written."}},
 {name:"Street lighting & CCTV", status:"amber", plans:["S","T","E"], detail:{
  summary:"Both sides got more concrete without coordinating: Social's lighting audit + phased CCTV expansion moved into its Safety & Resilience theme (5.4.1); Transport's Theme 4 Focus 04 now fully drafts smart adaptive + solar street lighting with quantified energy savings.",
  quotes:[
   {p:"S",r:"5.4.1.1.1 (was 5.3.1.1.1)",t:"Conduct a city-wide lighting audit across streets, parks, and public spaces to assess coverage, functionality, and gaps."},
   {p:"T",r:"Theme 4 · Focus 04 (new)",t:"Smart Adaptive Street Lighting Systems … Risk-Based and Context-Sensitive Lighting Design Standards … LED lighting saves 50–70% energy, smart controls a further 20–40%."},
   {p:"E",r:"Theme 5",t:"Map solar potential — identify suitable rooftops and public sites."}],
  insight:"Same poles, still two programmes — merge into one Street Lighting Programme with two objectives: safety coverage (Social's audit defines the gap map) and energy transition (Transport's technology pathway, sited from EMP's solar potential map). CCTV stays with Social/Police but logs into the same GIS asset layer."}},
 {name:"Beach & waterfront access", status:"red", plans:["S","L","U","G"], detail:{
  summary:"Escalated: V1.0 flagged the same policy written twice; the new LDS then deleted its waterfront objectives entirely (FA 4.2 activation, '100% public shoreline access', beach parks, swimming zones) while its Theme 4 overview still promises them. Social keeps the open-use beach frontage policy; the UDMP's Boardwalk character area is an empty heading.",
  quotes:[
   {p:"S",r:"5.1.3.3.2",t:"Ensure free public access and uninterrupted pedestrian movement for citizens in public spaces. (eg. open-use beach frontage)"},
   {p:"L",r:"9.1 overview (new draft)",t:"…parks, waterfronts, streetscapes, and public spaces should support a broader range of economic activities…"},
   {p:"L",r:"7.3.1.2.4 (residue)",t:"Strengthen waterfront recreation by integrating beaches, promenades, and coastal public spaces with destination parks where appropriate."}],
  insight:"A policy without a delivery programme: Social can demand open access, but nobody now plans the waterfront itself. Either reinstate the two LDS objectives (activation + beach recreation) or assign the waterfront to the UDMP's Character Areas when they're written (10.1 Boardwalk, 10.10 Channel Park) — and restore '100% public shoreline access' as the shared KPI wherever it lands."}}
]},
{name:"Community & Economy", status:"group", detail:{summary:"Three domains between Social and Landscape. The Social restructure moved the furniture; the Landscape rewrite deleted the targets.",quotes:[],insight:""}, children:[
 {name:"Urban agriculture & food", status:"red", plans:["S","L","E","G"], detail:{
  summary:"Unchanged duplication: Social's urban-farming pilots (now 5.5.4.x) and LDS's community gardens / edible landscapes (9.3.2.1) both survive the revisions verbatim in substance — while Social still documents that a working allocation model (SEEDS/PDSAE: 28 lots, 84 farmers) already exists.",
  quotes:[
   {p:"S",r:"Theme 5 (was 5.4.4.1.3)",t:"Pilot urban farming and gardening programs in partnership with schools, NGOs, and households."},
   {p:"L",r:"9.3.2.1.1 (new draft)",t:"Establish community gardens within suitable parks and neighbourhood open spaces."},
   {p:"L",r:"9.3.2.1.2 (new draft)",t:"Introduce edible landscapes and edible streetscape planting where appropriate."}],
  insight:"Still piloting what already ran. Scale the SEEDS/PDSAE model: LDS allocates land through its park standards, Social runs the social programme (applicant categories it already defines), EMP monitors green-space condition. The LDS 'community gardens in all neighbourhoods' coverage KPI vanished with the KPI purge — it was the right target; restore it in the implementation matrix."}},
 {name:"SME spaces, markets & activation", status:"amber", plans:["S","L","U","G"], detail:{
  summary:"The duplication is unchanged (Social's co-working/SME/market actions renumbered verbatim to 5.5.x; LDS keeps landscape-integrated market spaces 9.3.1.1) — but the quantified shared target V1.0 recommended adopting ('100 SME spaces by 2035', '80% occupancy', 'one hub per neighbourhood') was deleted with the LDS KPIs.",
  quotes:[
   {p:"S",r:"5.5.2.1.1",t:"Promote the development of co-working hubs and shared workspaces targeting SMEs, startups, and freelancers."},
   {p:"L",r:"9.3.1.1.1 (new draft)",t:"Identify suitable locations within parks, plazas, and neighbourhood centers for community markets."},
   {p:"S",r:"5.5.4.1.4",t:"Community markets and mobile vendor spaces…"}],
  insight:"Two half-programmes, now with no number between them. Restore the old LDS targets as the shared figure, split roles by competence (LDS designs and delivers the spaces; Social runs leasing, vendor regulation and programming), and fix Social's internal near-duplicate (5.5.1.3.2 vs 5.5.2.1.2)."}},
 {name:"Public space programming & culture", status:"amber", plans:["S","L","G","U"], detail:{
  summary:"Social elevated culture into its own objective (5.2.7 Cultural Identity, Heritage & Connection — events, park integration, digital heritage platforms); LDS added placemaking & public art (6.3.4.2). The V1.0 question — who owns cultural elements in public-space design — is now shared across two strengthened programmes.",
  quotes:[
   {p:"S",r:"Objective 5.2.7 (new)",t:"Cultural Identity, Heritage and Connection — periodic cultural and intercultural events in public spaces… cultural identity in park developments, digital heritage platforms."},
   {p:"L",r:"6.3.4.2.4 (new draft)",t:"Integrate public art, sculptures, feature planting, and artistic landscape elements that strengthen local identity and enhance the visitor experience."},
   {p:"L",r:"6.3.4.2.5 (new draft)",t:"Design attractive gathering spaces and flexible public areas that support recreation, community events, markets, and cultural activities."}],
  insight:"Both moves are good individually; the seam still needs a sentence in each plan: Social owns programming, content and community leadership; LDS owns the physical stage and the art/identity design layer. LDS's old '5,000 residents participating annually' participation KPI should return, counted through Social's engagement indicators."}}
]},
{name:"Governance, Data & Systems", status:"group", detail:{summary:"Three domains. The biggest single alignment win is still here — and the update moved it backwards.",quotes:[],insight:""}, children:[
 {name:"GIS / central data platform", status:"red", plans:["S","E","T","U"], detail:{
  summary:"Escalated from amber: the count of platform candidates rose from three to four. Social keeps its Urban Management System + data hub (now at least connected to each other); EMP keeps its Environmental GIS Repository; Transport keeps the Smart Mobility Management Platform + Operations Centre AND its new Theme 4 proposes a separate 'unified data management platform' for environmental monitoring.",
  quotes:[
   {p:"S",r:"5.1.4.1.1",t:"Develop a centralized Urban Management System… The system is to be connected to the centralized data hub or GIS-based planning system"},
   {p:"E",r:"Theme 1 action",t:"Establish Hulhumalé Environmental GIS Repository — Create central GIS repository. Compile HDC, HVCA, DMP, SMP, survey and monitoring layers."},
   {p:"T",r:"Theme 1 · SMMP",t:"a centralised, technology-enabled operations and intelligence system that functions as the nerve centre of the island's transport network… will underpin the operation of a dedicated Transport Operations Centre (TOC)."},
   {p:"T",r:"Theme 4 · Focus 03 (new)",t:"a coherent, city-scale sensing architecture with common technical standards, a unified data management platform"}],
  insight:"Still the highest-value alignment in the set, now more urgent. EMP Theme 1 remains the only specified architecture (owners, metadata, update cycles, five-class classification, service-provider MOUs) and already names SMP layers as inputs. Declare it the corporate platform; SMP's UMS, Transport's SMMP and Transport's environmental monitoring platform become modules. Social's new hierarchy paragraph (Ch.1) shows the plans can acknowledge shared structure — extend it to the data layer."}},
 {name:"Complaints & grievance", status:"amber", plans:["S","E","T"], detail:{
  summary:"Unchanged: Social's multi-channel grievance system (5.1.2.2.1 — portal, hotline, QR location tagging), EMP's GIS complaint log with six-month public summaries, Transport's feedback kiosks. Three intakes for one resident.",
  quotes:[
   {p:"S",r:"5.1.2.2.1",t:"Maintain an accessible grievance redress system with direct routing to relevant teams. Enable residents to report issues through multiple channels (online portal, hotline, QR-code location tagging)"},
   {p:"E",r:"Theme 7 action",t:"Log public complaints in GIS — Record complaint type, broad location, status, response time and resolution. … Six-month public summaries published."},
   {p:"T",r:"Public Engagement actions",t:"Crowdsourced Feedback on Routes and Schedules … Establish Feedback Kiosks … Feedback Analytics Dashboard"}],
  insight:"V1.0's pipeline design still applies untouched: Social owns the front door (channels, routing, SLAs), EMP owns the GIS log and public transparency layer, Transport subscribes to the transport-tagged stream instead of building kiosks. Social's QR location tagging and EMP's GIS complaint layer were still written for each other."}},
 {name:"Monitoring, KPIs & delivery units", status:"red", plans:["S","E","T","L","U"], detail:{
  summary:"Escalated from amber — the system's measurability went backwards. LDS deleted every KPI and detached its matrices ('[separate attachment]'); Social's Chapter 7 implementation tables contradict its own renumbered Chapter 5; Transport's M&E chapter is still an outline. The revised UDMP adds per-theme KPIs, and EMP's machinery remains the only working model.",
  quotes:[
   {p:"E",r:"Theme 7 actions",t:"Establish EMP Delivery Unit — … Introduce GIS-Based Environmental Decision Gate — Screen major approvals, land use changes, infrastructure projects, public realm works, utility works and major planning deviations against EMP layers."},
   {p:"U",r:"11.4 KPIs (new)",t:"Housing delivery — Number of housing units completed against projected population growth requirements."},
   {p:"L",r:"6.4 (new draft)",t:"[separate attachment]"}],
  insight:"Broaden the EMP Delivery Unit into a Masterplan Delivery Unit and extend the Decision Gate across all four sector layers — unchanged advice, but the case strengthened: two plans regressed on measurability in this revision cycle. The UDMP's new KPI table is the natural master list; reconcile each sector plan's indicators to it (once the UDMP fixes its own three conflicting theme-title sets)."}}
]}
]},
{name:"Alignment Recommendations", status:"group", detail:{summary:"Cross-cutting moves for the next revision cycle, re-prioritised against the August 2026 drafts. All blue nodes are insight, not original text.",quotes:[],insight:""}, children:[
 {name:"1 · Put the numbers back", status:"blue", detail:{summary:"",quotes:[],
  insight:"The update resolved V1.0's KPI conflicts mostly by deletion: LDS removed every target (25,000 trees, 30% canopy, 80% accessibility retrofit by 2035, 5 km corridors, 100 SME spaces, shoreline access); Transport demands canopy targets without stating any. Restore one number per programme — canopy/trees in LDS 8.3.1.1 (measured by EMP's inventory), the retrofit deadline in the Universal Design Manual, the SME target shared with Social, corridor targets on the shared walking-network map. A plan without numbers can't be monitored, and only EMP still has them."}},
 {name:"2 · One GIS backbone (EMP architecture) — now 4 candidates", status:"blue", detail:{summary:"",quotes:[],
  insight:"Unchanged recommendation, raised urgency: adopt EMP Theme 1 (repository, classification register, publication pathway, MOUs) as the corporate platform. SMP's Urban Management System, Transport's SMMP/TOC and Transport's new Theme 4 environmental monitoring platform become modules. The update added a platform instead of removing two — this single decision still collapses more duplicated actions than any other."}},
 {name:"3 · Finish the UDMP as the arbiter", status:"blue", detail:{summary:"",quotes:[],
  insight:"The revised UDMP finally has the authority structure to arbitrate between sector plans (control framework, priority projects, KPIs) — but its plug-in points are empty: 9.6 Mobility Framework, 9.7 Green & Blue Network, and all ten Character Areas. Write those as explicit crosswalks to the sector plans (10.1 Boardwalk can absorb the orphaned waterfront programme; 10.6 Knowledge Park closes innovation gap 7.3), normalize the three conflicting theme-title sets, and add the missing financing section — the last pillar-level framework gap (8.2)."}},
 {name:"4 · Document the Garden Island 2024 disposition", status:"blue", detail:{summary:"",quotes:[],
  insight:"The merge V1.0 asked for happened silently and partially: alleyways, shaded paths, crossings, murals and park guidelines were absorbed into the new LDS without attribution, while Adopt-a-Tree, the 25,000-tree drive, park-connector bike routes, the roadside irrigation network, the Green Building Incentive and the re-vegetation plan were dropped without record. Add a one-page disposition table (absorbed / carried forward / retired, with the planting baseline achieved against the 2025 target) so the dropped actions are decisions, not accidents."}},
 {name:"5 · Fix the revision-cycle drafting debt", status:"blue", detail:{summary:"",quotes:[],
  insight:"Each revision fixed old artifacts and minted new ones. Priority list: SMP Chapter 7 still numbered against the old 4-theme scheme (every cross-reference broken) + duplicate conclusion chapters; UDMP's three conflicting theme-title sets and empty sections; LDS Chapter 7's repeated sub-action IDs and missing §9.4; Transport's 'DRAFT IN PROGRESS' tail and corrupted (mojibake) export; the Framework Word draft's duplicated headings (Objective 2.2, §4.4). The V1.0 duplicate 5.2.1.1.2 survived a full revision cycle — a shared pre-publication QA checklist would have caught all of these."}},
 {name:"6 · One Masterplan Delivery Unit + shared decision gate", status:"blue", detail:{summary:"",quotes:[],
  insight:"Unchanged, strengthened: EMP's Delivery Unit, master action tracker and GIS Decision Gate are still the only delivery machinery in the set, and this cycle showed why one is needed — two plans regressed on measurability without anything catching it. One unit inside Planning Division tracks all sector-plan actions against the UDMP's new KPI table; one gate screens approvals against social, transport, landscape and environmental layers simultaneously."}},
 {name:"7 · Reinstate the waterfront & tourism programme", status:"blue", detail:{summary:"",quotes:[],
  insight:"New in V1.2: the LDS rewrite dropped waterfront activation and green tourism while its own overview still promises them, leaving Social's beach-access policy with no delivery programme and framework direction 7.4.3 (tourism) resting on a single UDMP priority-project line. Decide the owner deliberately — reinstate the two LDS objectives, or hand the waterfront to the UDMP Character Areas (Boardwalk, Channel Park) when they are written — and restore '100% public shoreline access' as the shared KPI."}}
]}
]};

/* ---- V1.2 FULL ACTION INVENTORY --------------------------------------------
   Every action (action level, not sub-actions) extracted from the August 2026
   drafts, keyed by plan; `p` = the framework pillar the action delivers.
   Feeds the Coverage Matrix's expandable per-pillar action lists.
   IDs are each document's own numbering (HTMP/EMP use theme+focus ordinals
   because those documents don't number their strategy layer). */
const ACTIONS_V12 = {
UDMP:[
 {id:"5.2",t:"Balanced housing strategy: social, medium-density, high-density & mixed-use",p:"3"},
 {id:"6.0",t:"Land use allocation framework: 16 uses across 4.43M sqm (22% residential)",p:"1"},
 {id:"6.4",t:"Knowledge Park allocation for education/research/tech (33,525 sqm, 0.76%)",p:"7"},
 {id:"6.12",t:"Open green space allocation citywide (680,700 sqm, 15.36% of land)",p:"2"},
 {id:"8.2",t:"Live–Work–Play core values: integrate housing, jobs & recreation citywide",p:"1"},
 {id:"8.3",t:"Urban structure: Phase 3 integrated into Phase 2, centers & corridors",p:"1"},
 {id:"8.4",t:"Development control framework: zoning, heights, density, setbacks, parking",p:"1"},
 {id:"8.5.1",t:"Walkable city: pedestrian-priority streets, footpaths, alleyway links",p:"6"},
 {id:"8.5.2",t:"5–10 minute neighborhoods: daily services within walking distance",p:"2"},
 {id:"8.5.3",t:"Continuous pedestrian & cycling network with generous shaded routes",p:"6"},
 {id:"8.5.4",t:"Road hierarchy: primary, secondary & tertiary streets citywide",p:"6"},
 {id:"8.5.5",t:"Green drainage network: bioswales, planted verges & open channels",p:"5"},
 {id:"8.5.7",t:"Green & wind corridors for ventilation, cooling & biodiversity",p:"5"},
 {id:"8.5.8",t:"Bridge connections linking Phase 1, Phase 2 & future expansion areas",p:"6"},
 {id:"8.5.9",t:"Integrated utility infrastructure: water, sewerage, power, telecom, ICT",p:"4"},
 {id:"9.2",t:"Zoning framework: residential, mixed-use, employment, waterfront & utility",p:"1"},
 {id:"9.3",t:"Activity nodes network: commercial centers plus civic spaces & event venues",p:"7"},
 {id:"9.4",t:"Graduated density strategy: higher intensity in Phase 2 & along corridors",p:"1"},
 {id:"9.5",t:"Building height strategy: taller in Phase 2 within aviation limits",p:"1"},
 {id:"11.1",t:"Development phasing: infrastructure & amenities delivered with housing",p:"1"},
 {id:"11.2.1",t:"Priority: critical infrastructure — roads, drainage, sewerage, power, waste",p:"4"},
 {id:"11.2.2",t:"Priority: transport & connectivity — roads, active travel, transit, parking",p:"6"},
 {id:"11.2.3",t:"Priority: social infrastructure — schools, healthcare, mosques, childcare",p:"2"},
 {id:"11.2.4",t:"Priority: open space & recreation — parks, waterfronts, sports, playgrounds",p:"2"},
 {id:"11.2.5",t:"Priority: economic nodes — commercial, offices, innovation hubs, tourism",p:"7"},
 {id:"11.2.6",t:"Priority: coastal resilience — protection, drainage, blue-green, greening",p:"5"},
 {id:"11.2.7",t:"Priority: smart city — digital services, urban management, smart mobility",p:"4"},
 {id:"11.3",t:"Stakeholder framework: HDC-led coordination of ministries, utilities, public",p:"8"},
 {id:"11.4",t:"KPI monitoring framework: indicators & targets across all eight themes",p:"8"}],
SMP:[
 {id:"5.1.1.1",t:"Institutionalize structured review process for policies, guidelines, plans",p:"8"},
 {id:"5.1.1.2",t:"Strengthen social, accessibility, livability standards in urban planning",p:"8"},
 {id:"5.1.1.3",t:"Strengthen data-driven planning via centralized GIS data hub",p:"8"},
 {id:"5.1.2.1",t:"Develop platform for project information sharing",p:"8"},
 {id:"5.1.2.2",t:"Strengthen grievance redress mechanisms",p:"8"},
 {id:"5.1.2.3",t:"Enhance public awareness and access to city information",p:"8"},
 {id:"5.1.3.1",t:"Strengthen regulatory guidelines",p:"8"},
 {id:"5.1.3.2",t:"Strengthen monitoring and enforcement mechanisms",p:"8"},
 {id:"5.1.3.3",t:"Regulate commercial vendors in public spaces",p:"8"},
 {id:"5.1.4.1",t:"Develop integrated Urban Management System for service delivery",p:"4"},
 {id:"5.1.4.2",t:"Establish coordinated project management and inter-agency platform",p:"8"},
 {id:"5.2.1.1",t:"Enhance equitable access to services and jobs via plot allocation, incentives",p:"1"},
 {id:"5.2.2.1",t:"Reduce spatial and socioeconomic inequalities in infrastructure and services",p:"2"},
 {id:"5.2.3.1",t:"Strengthen spatial planning of employment opportunity areas",p:"7"},
 {id:"5.2.3.2",t:"Support business development and decentralized employment opportunities",p:"7"},
 {id:"5.2.4.1",t:"Ensure accessible and inclusive digital service delivery",p:"4"},
 {id:"5.2.4.2",t:"Enhance digital literacy and inclusive access for vulnerable groups",p:"2"},
 {id:"5.2.5.1",t:"Retrofit public spaces and buildings with ramps, tactile paving, signage",p:"2"},
 {id:"5.2.5.2",t:"Enhance walkability and pedestrian comfort",p:"6"},
 {id:"5.2.6.1",t:"Provide safe spaces, shelters, and social support services",p:"2"},
 {id:"5.2.6.2",t:"Promote awareness and capacity building incl. GBV sensitivity training",p:"2"},
 {id:"5.2.6.3",t:"Integrate family-friendly and inclusive facilities in public spaces",p:"2"},
 {id:"5.2.6.4",t:"Design public spaces for diverse users incl. elderly, PWDs, children",p:"2"},
 {id:"5.2.7.1",t:"Promote intercultural integration and shared community identity",p:"2"},
 {id:"5.2.8.1",t:"Develop and promote affordable housing options (incl. rent-to-own)",p:"3"},
 {id:"5.3.1.1",t:"Strengthen community engagement, leadership, and local participation",p:"2"},
 {id:"5.3.1.2",t:"Provide community services and improve public amenities and spaces",p:"2"},
 {id:"5.3.1.3",t:"Strengthen community information and communication systems",p:"2"},
 {id:"5.3.1.4",t:"Promote community-oriented business engagement and CSR reinvestment",p:"2"},
 {id:"5.3.2.1",t:"Improve access to healthcare services and wellness programs",p:"2"},
 {id:"5.3.2.2",t:"Promote mental wellbeing and digital wellbeing awareness",p:"2"},
 {id:"5.3.2.3",t:"Promote active and healthy lifestyles via parks, sports, fitness areas",p:"2"},
 {id:"5.3.2.4",t:"Strengthen public health sanitation and pest control measures",p:"2"},
 {id:"5.3.2.5",t:"Promote healthy lifestyles through food and workplace initiatives",p:"2"},
 {id:"5.3.6.1",t:"Strengthen residential development standards and pre-occupancy livability",p:"3"},
 {id:"5.4.1.1",t:"Improve public lighting and monitoring across neighborhoods",p:"2"},
 {id:"5.4.1.2",t:"Strengthen CCTV coverage and surveillance systems",p:"2"},
 {id:"5.4.1.3",t:"Activate underused and vacant spaces with temporary community uses",p:"2"},
 {id:"5.4.1.4",t:"Promote community-led safety initiatives and awareness campaigns",p:"2"},
 {id:"5.4.1.5",t:"Strengthen policing presence and coordinated safety enforcement",p:"2"},
 {id:"5.4.2.1",t:"Integrate environmental resilience into urban design and planning",p:"5"},
 {id:"5.4.2.2",t:"Mitigate urban heat through green cover and cooling design",p:"5"},
 {id:"5.4.2.3",t:"Improve waste management systems and practices",p:"5"},
 {id:"5.4.2.4",t:"Strengthen disaster preparedness, response, and emergency housing",p:"5"},
 {id:"5.4.3.1",t:"Enhance road safety and walkability via sidewalks, crossings, signage",p:"6"},
 {id:"5.4.3.2",t:"Enhance traffic management, calming, and congestion monitoring",p:"6"},
 {id:"5.4.3.3",t:"Improve public transport to reduce reliance on private vehicles",p:"6"},
 {id:"5.5.1.1",t:"Strengthen skills development and workforce readiness",p:"7"},
 {id:"5.5.1.2",t:"Support employment pathways: apprenticeships, mentorship, integration",p:"7"},
 {id:"5.5.1.3",t:"Allocate commercial/SME spaces for marginalized groups and PWDs",p:"7"},
 {id:"5.5.2.1",t:"Support entrepreneurship via co-working hubs and shared workspaces",p:"7"},
 {id:"5.5.2.2",t:"Strengthen business support systems, networks, and mentorship",p:"7"},
 {id:"5.5.3.1",t:"Facilitate expansion of commercial and employment activities",p:"7"},
 {id:"5.5.4.1",t:"Promote urban agriculture, local production, and community markets",p:"7"},
 {id:"5.5.4.2",t:"Strengthen food supply chains, affordability, and security",p:"7"},
 {id:"5.5.5.1",t:"Promote blue economy: fishing infrastructure and marine businesses",p:"7"},
 {id:"5.5.5.2",t:"Promote sustainable tourism and local economic integration",p:"7"},
 {id:"5.5.6.1",t:"Integrate social impact indicators and assessments in economic planning",p:"8"}],
HTMP:[
 {id:"T1.F01.1",t:"Integrated multimodal transport system",p:"6"},
 {id:"T1.F01.2",t:"Feeder services for last-mile connectivity",p:"6"},
 {id:"T1.F01.3",t:"Universal transit payment system (unified fares)",p:"6"},
 {id:"T1.F01.4",t:"Bus Rapid Transit (BRT) system",p:"6"},
 {id:"T1.F02.1",t:"Accessible transit hubs",p:"2"},
 {id:"T1.F02.2",t:"Dedicated lanes for public transport",p:"6"},
 {id:"T1.F02.3",t:"Cycling integration facilities at transit stops",p:"6"},
 {id:"T1.F03.1",t:"Real-time passenger information systems",p:"4"},
 {id:"T1.F03.2",t:"Transit demand prediction models",p:"4"},
 {id:"T1.F03.3",t:"Mobile app for trip planning",p:"4"},
 {id:"T1.F03.4",t:"Smart Mobility Management Platform + Transport Operations Centre",p:"4"},
 {id:"T1.F04.1",t:"Subsidised fares for vulnerable groups",p:"2"},
 {id:"T1.F04.2",t:"Transit incentives and modal shift programmes",p:"6"},
 {id:"T1.F04.3",t:"Universal Accessibility Programme for the transit network",p:"2"},
 {id:"T1.F05.1",t:"Demand-responsive transit scheduling",p:"6"},
 {id:"T1.F05.2",t:"Transit signal priority and intersection management",p:"6"},
 {id:"T1.F05.3",t:"Transit operations performance management",p:"8"},
 {id:"T1.F06.1",t:"Electric or low-emission transit vehicles",p:"5"},
 {id:"T1.F06.2",t:"Renewable energy integration in transit infrastructure",p:"4"},
 {id:"T1.F06.3",t:"Climate-responsive and green transit infrastructure",p:"5"},
 {id:"T1.F07.1",t:"Continuous community feedback and participatory planning",p:"8"},
 {id:"T1.F07.2",t:"Targeted public awareness and sustainable mobility campaigns",p:"6"},
 {id:"T1.F07.3",t:"Community mobility partnerships",p:"8"},
 {id:"T1.F08.1",t:"Road safety integration at the transit–street interface",p:"2"},
 {id:"T1.F08.2",t:"Removal of operational barriers to bus service delivery",p:"6"},
 {id:"T1.F08.3",t:"Operational and service-level inclusivity",p:"2"},
 {id:"T1.F08.4",t:"Proactive Phase 2 transport infrastructure provision",p:"6"},
 {id:"T2.F01.1",t:"Pedestrian priority zones and street pedestrianisation",p:"6"},
 {id:"T2.F01.2",t:"Integrated cycling network",p:"6"},
 {id:"T2.F01.3",t:"Shared cycling and micro-mobility services",p:"6"},
 {id:"T2.F01.4",t:"Citywide pedestrian network quality and universal accessibility",p:"6"},
 {id:"T2.F01.5",t:"Safe active mobility routes for schools and community facilities",p:"2"},
 {id:"T2.F02.1",t:"Public EV charging infrastructure network",p:"4"},
 {id:"T2.F02.2",t:"Financial incentives and demand-side EV promotion",p:"5"},
 {id:"T2.F02.3",t:"Public sector and institutional fleet transition to EVs",p:"5"},
 {id:"T2.F02.4",t:"Electric micro-mobility integration and regulation",p:"6"},
 {id:"T2.F03.1",t:"Sustainable transportation education and awareness",p:"6"},
 {id:"T2.F03.2",t:"Community-led sustainable mobility initiatives",p:"8"},
 {id:"T2.F03.3",t:"Sustainable mobility culture development",p:"6"},
 {id:"T2.F04.1",t:"Green verge management and enhancement",p:"5"},
 {id:"T2.F04.2",t:"Street tree networks and canopy coverage",p:"5"},
 {id:"T2.F04.3",t:"Eco-friendly transportation hubs",p:"5"},
 {id:"T2.F04.4",t:"Blue-green mobility corridors",p:"5"},
 {id:"T2.F05.1",t:"Vehicle-based shared mobility services",p:"6"},
 {id:"T2.F05.2",t:"Mobility as a Service (MaaS) ecosystem development",p:"4"},
 {id:"T2.F06.1",t:"Economic pricing instruments for demand management",p:"6"},
 {id:"T2.F06.2",t:"Travel demand management programme",p:"6"},
 {id:"T2.F06.3",t:"Parking management strategy",p:"6"},
 {id:"T2.F07.1",t:"Smart multi-functional street infrastructure",p:"4"},
 {id:"T2.F07.2",t:"Permeable pavement engineering and surface performance standards",p:"5"},
 {id:"T2.F07.3",t:"Sustainable materials and low-carbon infrastructure design",p:"5"},
 {id:"T2.F08.1",t:"Street lighting for personal security and safe active travel",p:"2"},
 {id:"T2.F08.2",t:"Traffic calming and vehicle speed management",p:"2"},
 {id:"T2.F08.3",t:"Infrastructure obstruction enforcement and management",p:"6"},
 {id:"T2.F08.4",t:"Protected environments for vulnerable road users",p:"2"},
 {id:"T3.F01.1",t:"Citywide signalised intersection network",p:"6"},
 {id:"T3.F01.2",t:"Multimodal signal priority architecture",p:"6"},
 {id:"T3.F01.3",t:"Signalised pedestrian crossing management",p:"6"},
 {id:"T3.F01.4",t:"Adaptive and network-coordinated signal control",p:"6"},
 {id:"T3.F02.1",t:"Automated traffic surveillance infrastructure",p:"4"},
 {id:"T3.F02.2",t:"Traffic data collection, management and governance framework",p:"4"},
 {id:"T3.F02.3",t:"Traffic Management and Operations Centre (TMOC) network",p:"4"},
 {id:"T3.F03.1",t:"Road network traveller information systems",p:"4"},
 {id:"T3.F03.2",t:"Transport performance monitoring and data-driven decisions",p:"4"},
 {id:"T3.F03.3",t:"Predictive mobility analytics and network intelligence",p:"4"},
 {id:"T3.F04.1",t:"Smart parking information and guidance systems",p:"6"},
 {id:"T3.F04.2",t:"Carriageway obstruction management and enforcement",p:"6"},
 {id:"T3.F04.3",t:"Structured parking infrastructure and parking management",p:"6"},
 {id:"T3.F04.4",t:"Dynamic curbside management",p:"6"},
 {id:"T3.F05.1",t:"Operational congestion management and network control",p:"6"},
 {id:"T3.F05.2",t:"Integrated land use and transport planning",p:"6"},
 {id:"T3.F05.3",t:"TDM policy coordination and governance architecture",p:"8"},
 {id:"T3.F06.1",t:"Smart road condition monitoring and asset management",p:"4"},
 {id:"T3.F06.2",t:"IoT and connected mobility infrastructure",p:"4"},
 {id:"T3.F06.3",t:"Digital infrastructure resilience and cybersecurity",p:"4"},
 {id:"T3.F07.1",t:"Automated incident detection and emergency response integration",p:"2"},
 {id:"T3.F07.2",t:"Technology-enabled pedestrian safety systems",p:"2"},
 {id:"T3.F07.3",t:"Road safety intelligence and evidence-based intervention",p:"2"},
 {id:"T3.F08.1",t:"Resilient, renewable-powered traffic management infrastructure",p:"4"},
 {id:"T3.F08.2",t:"ITMS-enabled environmental monitoring and reporting",p:"5"},
 {id:"T3.F08.3",t:"Carbon-efficient traffic network operations (LEZ, eco-routing)",p:"5"},
 {id:"T4.F01.1",t:"Protection and hydrological enhancement of green verges",p:"5"},
 {id:"T4.F01.2",t:"Sustainable drainage corridors and bioswale networks",p:"5"},
 {id:"T4.F01.3",t:"Reduction of network-level surface impermeability",p:"5"},
 {id:"T4.F01.4",t:"Integrated stormwater retention and water-sensitive design",p:"5"},
 {id:"T4.F01.5",t:"Climate-adaptive transport drainage design",p:"5"},
 {id:"T4.F02.1",t:"Street tree network: environmental value and ecological function",p:"5"},
 {id:"T4.F02.2",t:"Professional urban tree management and arboricultural standards",p:"5"},
 {id:"T4.F02.3",t:"Climate-responsive shaded active mobility corridors",p:"5"},
 {id:"T4.F02.4",t:"Green transit corridors and ecological connectivity",p:"5"},
 {id:"T4.F03.1",t:"Integrated environmental monitoring network",p:"5"},
 {id:"T4.F03.2",t:"Transport environmental health communication and awareness",p:"2"},
 {id:"T4.F03.3",t:"Environmentally responsible construction management",p:"5"},
 {id:"T4.F03.4",t:"Transport emissions assessment and climate accountability",p:"5"},
 {id:"T4.F04.1",t:"Smart adaptive street lighting systems",p:"4"},
 {id:"T4.F04.2",t:"Solar-powered and renewable energy street lighting",p:"4"},
 {id:"T4.F04.3",t:"Risk-based and context-sensitive lighting design standards",p:"4"},
 {id:"T4.F04.4",t:"Integrated energy performance management for transport infrastructure",p:"4"},
 {id:"T4.F05.1",t:"Heat-resilient and thermally reflective transport surfaces",p:"5"},
 {id:"T4.F05.2",t:"Softscape integration and urban cooling via development regulation",p:"5"},
 {id:"T4.F05.3",t:"Abandoned and unutilised vehicle management",p:"5"},
 {id:"T4.F05.4",t:"Climate-durable and thermally resilient urban materials",p:"5"}],
EMP:[
 {id:"T1.1",t:"Establish Hulhumalé Environmental GIS Repository",p:"4"},
 {id:"T1.2",t:"Publish public environmental data inventory",p:"8"},
 {id:"T1.3",t:"Launch downloadable public datasets",p:"8"},
 {id:"T1.4",t:"Prepare ArcGIS and CKAN-ready data structures",p:"4"},
 {id:"T1.5",t:"Create Data Classification Disclosure Register",p:"8"},
 {id:"T1.6",t:"Create service provider data MOUs",p:"8"},
 {id:"T1.7",t:"Create CSO and research data partnership pathway",p:"8"},
 {id:"T1.8",t:"Publish six-month complaint summaries",p:"8"},
 {id:"T2.1",t:"Map shoreline trends",p:"5"},
 {id:"T2.2",t:"Maintain beach profile monitoring",p:"5"},
 {id:"T2.3",t:"Publish bathymetry data where available",p:"5"},
 {id:"T2.4",t:"Create coastal asset register",p:"5"},
 {id:"T2.5",t:"Map water pooling hotspots",p:"5"},
 {id:"T2.6",t:"Audit green verges and passive drainage",p:"5"},
 {id:"T2.7",t:"Map disaster preparedness layers",p:"5"},
 {id:"T2.8",t:"Integrate climate and disaster risk into approvals",p:"5"},
 {id:"T3.1",t:"Create public tree and vegetation inventory",p:"5"},
 {id:"T3.2",t:"Publish canopy and shade maps",p:"5"},
 {id:"T3.3",t:"Produce annual urban heat map",p:"5"},
 {id:"T3.4",t:"Identify and upgrade cooling corridors",p:"5"},
 {id:"T3.5",t:"Map and improve blue-green corridors",p:"5"},
 {id:"T3.6",t:"Create biodiversity monitoring pathway",p:"5"},
 {id:"T3.7",t:"Install microclimate sensors in priority areas",p:"5"},
 {id:"T3.8",t:"Publish green space condition audits",p:"2"},
 {id:"T4.1",t:"Map waste collection and public bin network",p:"4"},
 {id:"T4.2",t:"Create waste service performance data flow (WAMCO)",p:"4"},
 {id:"T4.3",t:"Pilot source segregation in residential clusters & institutions",p:"5"},
 {id:"T4.4",t:"Establish hazardous waste pathway",p:"5"},
 {id:"T4.5",t:"Map marine litter leakage hotspots",p:"5"},
 {id:"T4.6",t:"Enforce construction dust control",p:"5"},
 {id:"T4.7",t:"Deploy air quality, dust and noise sensors",p:"5"},
 {id:"T4.8",t:"Publish six-month pollution and complaint summaries",p:"8"},
 {id:"T5.1",t:"Develop Hulhumalé Green Building Performance Standard",p:"5"},
 {id:"T5.2",t:"Map existing solar installations",p:"4"},
 {id:"T5.3",t:"Map solar potential",p:"4"},
 {id:"T5.4",t:"Promote shared solar models",p:"4"},
 {id:"T5.5",t:"Audit HDC-managed building energy use",p:"4"},
 {id:"T5.6",t:"Publish public utility data where appropriate",p:"4"},
 {id:"T5.7",t:"Create utility resilience layers",p:"5"},
 {id:"T5.8",t:"Create utility data sharing MOUs (STELCO/MWSC)",p:"8"},
 {id:"T6.1",t:"Create walkability indicator framework",p:"6"},
 {id:"T6.2",t:"Map priority walking network",p:"6"},
 {id:"T6.3",t:"Map shade and public realm comfort",p:"6"},
 {id:"T6.4",t:"Map accessibility barriers",p:"6"},
 {id:"T6.5",t:"Map public transport access",p:"6"},
 {id:"T6.6",t:"Map cycling and micromobility network",p:"6"},
 {id:"T6.7",t:"Map parking and road space conflict",p:"6"},
 {id:"T6.8",t:"Upgrade priority walking corridors",p:"6"},
 {id:"T7.1",t:"Establish EMP Delivery Unit",p:"8"},
 {id:"T7.2",t:"Create EMP master action tracker",p:"8"},
 {id:"T7.3",t:"Introduce GIS-Based Environmental Decision Gate",p:"8"},
 {id:"T7.4",t:"Attach environmental performance conditions to approvals",p:"8"},
 {id:"T7.5",t:"Log public complaints in GIS",p:"8"},
 {id:"T7.6",t:"Produce annual State of the Hulhumalé Environment Report",p:"8"},
 {id:"T7.7",t:"Create public dashboard",p:"8"},
 {id:"T7.8",t:"Complete five-year EMP reviews",p:"8"}],
LDS:[
 {id:"6.3.1.1",t:"Develop a Citywide Pedestrian Connectivity Network",p:"6"},
 {id:"6.3.1.2",t:"Establish Green Pedestrian Links through Secondary Streets and Alleyways",p:"6"},
 {id:"6.3.2.1",t:"Establish Universal Design Standards (Hulhumalé Universal Design Manual)",p:"2"},
 {id:"6.3.2.2",t:"Improve Accessible Public Facilities",p:"2"},
 {id:"6.3.2.3",t:"Park Connector Network (accessible navigation systems)",p:"2"},
 {id:"6.3.3.1",t:"Develop a Street Shade Strategy",p:"5"},
 {id:"6.3.3.2",t:"Improve Pedestrian Comfort and Public Amenities",p:"2"},
 {id:"6.3.3.3",t:"Enhance Streetscape Landscaping",p:"5"},
 {id:"6.3.4.1",t:"Develop a Citywide Wayfinding System",p:"6"},
 {id:"6.3.4.2",t:"Strengthen Placemaking and Identity of Parks and Public Spaces",p:"2"},
 {id:"7.3.1.1",t:"Develop Planned City Parks",p:"2"},
 {id:"7.3.1.2",t:"Enhance Recreational Facilities and Community Spaces",p:"2"},
 {id:"7.3.2.1",t:"Develop Neighborhood Parks in Underserved Areas",p:"2"},
 {id:"7.3.2.2",t:"Establish Pocket Parks and Community Green Spaces",p:"2"},
 {id:"7.3.3.1",t:"Develop Inclusive and Family-Friendly Park Facilities",p:"2"},
 {id:"7.3.4.1",t:"Develop Park Planning and Design Standards",p:"2"},
 {id:"8.3.1.1",t:"Prepare an Urban Forest Master Plan",p:"5"},
 {id:"8.3.1.2",t:"Expand the Urban Forest Network",p:"5"},
 {id:"8.3.2.1",t:"Integrate Climate-Responsive Urban Forestry",p:"5"},
 {id:"8.3.2.2",t:"Strengthen Urban Forest Protection and Management",p:"5"},
 {id:"9.3.1.1",t:"Develop Landscape-Integrated Community Market Spaces",p:"7"},
 {id:"9.3.2.1",t:"Develop Urban Agriculture and Productive Landscapes",p:"7"}]
};

/* ---- VERSION REGISTRY + ACTIVE BINDINGS ------------------------------------
   The app reads PLANS/GAPS/OVERLAPS/INTEGRITY/DOC_ALIGN/MINDMAP/MM_PLAN via
   these mutable bindings; applyDataVersion() points them at a dataset. */
const DATA_VERSIONS = {
  "1.0":{ label:"V1.0", date:"8 Jul 2026",
    desc:"Baseline analysis of the July 2026 drafts (Framework Excel + first plan drafts).",
    PLANS:PLANS_V10, GAPS:GAPS_V10, OVERLAPS:OVERLAPS_V10, INTEGRITY:INTEGRITY_V10,
    DOC_ALIGN:DOC_ALIGN_V10, MINDMAP:MINDMAP_V10, MM_PLAN:MM_PLAN_V10, ACTIONS:null },
  "1.2":{ label:"V1.2", date:"10 Aug 2026",
    desc:"Re-analysis of the August 2026 updated drafts (revised UDMP, Social, Transport, Landscape; Framework now a Word draft; Environment unchanged).",
    PLANS:PLANS_V12, GAPS:GAPS_V12, OVERLAPS:OVERLAPS_V12, INTEGRITY:INTEGRITY_V12,
    DOC_ALIGN:DOC_ALIGN_V12, MINDMAP:MINDMAP_V12, MM_PLAN:MM_PLAN_V12, ACTIONS:ACTIONS_V12 }
};
let DATA_VER, PLANS, GAPS, OVERLAPS, INTEGRITY, DOC_ALIGN, MINDMAP, MM_PLAN, ACTIONS;
function applyDataVersion(v){
  const d = DATA_VERSIONS[v] || DATA_VERSIONS["1.2"];
  DATA_VER = DATA_VERSIONS[v] ? v : "1.2";
  ({PLANS,GAPS,OVERLAPS,INTEGRITY,DOC_ALIGN,MINDMAP,MM_PLAN,ACTIONS} = d);
}
applyDataVersion((typeof localStorage!=="undefined" && localStorage.getItem('mp_data_ver')) || "1.2");

if (typeof module!=="undefined") module.exports={FRAMEWORK,PLANS,GAPS,OVERLAPS,INTEGRITY,DOC_ALIGN,SPD_INDEX,MINDMAP,MM_PLAN,MM_SC,DATA_VERSIONS,applyDataVersion};
