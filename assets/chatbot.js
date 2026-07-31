/* Reckona AI — site-wide guided FAQ chatbot.
   Self-contained: injects its own CSS + DOM, no dependencies, no network calls.
   Two ways in: a browsable topic menu ("What are you looking for?") that walks
   the visitor to the exact answer, and free-text keyword search over the same
   knowledge base — which is built only from this site's real content, so it
   never invents facts. Unsure matches show "did you mean" topic chips; no
   match falls back to human contact (WhatsApp / email / free audit). */
(function(){
'use strict';

var WA_LINK = 'https://wa.me/919588859960';
var WA_DISPLAY = '+91 95888 59960';
var WA_A = "<a href=\""+WA_LINK+"\" target=\"_blank\" rel=\"noopener\">"+WA_DISPLAY+"</a>";

/* ---------- Knowledge base ----------
   T[id] = {label (chip text), kw (search keywords), a (answer HTML),
            menu (child ids — renders as a chooser), follow (related ids)} */
var T = {};
function t(id, label, kw, a, extra){
  T[id] = {id:id, label:label, kw:kw||[], a:a||"", menu:(extra&&extra.menu)||null, follow:(extra&&extra.follow)||[]};
}

/* ----- Root ----- */
t('root', "⌂ All topics", [],
  "What exactly are you looking for? Pick a topic and I'll walk you to the answer — or just type your question.",
  {menu:['m-services','m-pricing','m-industries','m-tools','m-process','m-policies','m-contact']});

/* ----- Services ----- */
t('m-services', "Services & offerings",
  ['service','services','offering','offerings','what do you do','what do you offer','practices','what can you help'],
  "We run <b>eight practices under one accountable pod</b> — GEO (our flagship), SEO, Web, Social, Performance Ads, Branding, AI Automation and Consulting. Which one do you want to dig into?",
  {menu:['svc-geo','svc-seo','svc-web','svc-social','svc-perf','svc-brand','svc-auto','svc-consult']});

t('svc-geo', "GEO — AI visibility",
  ['geo','generative engine','ai visibility','get cited','cited by ai','chatgpt recommend','ai overviews','ai search','perplexity','gemini','recommended by ai'],
  "<b>GEO (Generative Engine Optimization)</b> is our flagship: getting your brand cited, recommended and correctly described inside ChatGPT, Gemini, Claude, Perplexity and AI Overviews.<br><br>The engagement: a <b>GEO Audit &amp; AI Visibility Score</b> (40-prompt matrix × 4 engines, 1–2 wks), entity &amp; knowledge-graph work (4–6 wks), an AI citation strategy, retrieval-optimized content, and monthly re-scoring so you see share-of-voice actually move.<br><br>Full detail: <a href=\"/services/geo/\">/services/geo/</a> · Try the free <a href=\"/tools/ai-rank-tracker/\">AI Rank Tracker</a>",
  {follow:['tool-tracker','pricing-how','start-audit']});

t('svc-seo', "SEO",
  ['seo','search engine optimization','rank on google','google ranking','organic traffic','link building','local seo','technical seo','content seo','backlink'],
  "Our <b>SEO practice</b> covers the whole stack: a 120-point audit with a prioritized 90-day roadmap (credited against a retainer), technical SEO (crawl/index/schema/Core Web Vitals), content SEO (8–16 expert-reviewed articles/mo), local SEO (map-pack: GBP, citations, review engine), enterprise programs (10K+ pages), and link building / digital PR (6–15 DR-40+ placements/mo).<br><br>Full detail: <a href=\"/services/seo/\">/services/seo/</a>",
  {follow:['svc-geo','pricing-how','start-audit']});

t('svc-web', "Website design & build",
  ['website','web design','web development','landing page','new site','build a site','ecommerce','shopify','site speed','redesign'],
  "Our <b>Web practice</b> builds sites meant to convert, not just exist: conversion-focused builds on Next.js/Framer with CMS, analytics and 90+ PageSpeed (4–6 wks); campaign landing pages with A/B variants (1 wk); ecommerce on Shopify/headless with Razorpay and GST invoicing (6–8 wks); enterprise corporate sites; plus maintenance (8 change-hrs/mo, 99.9% uptime) and zero-SEO-loss migrations / speed / WCAG 2.2 AA accessibility work.<br><br>Full detail: <a href=\"/services/web/\">/services/web/</a>",
  {follow:['svc-seo','pricing-how','start-audit']});

t('svc-social', "Social media",
  ['social media','instagram','linkedin','youtube','reels','content calendar','posts per month','ghostwriting','social content'],
  "Our <b>Social practice</b> runs authority-building content engines on a calendar your team approves once a month: LinkedIn Engine (12–16 posts/mo with founder ghostwriting and carousels), Instagram Engine (12 posts + 8 reels/mo with community management), YouTube Engine (2–4 edited videos/mo with thumbnails, SEO and shorts repurposing), or Full-stack Social across IG + LinkedIn + X/Threads + FB with 30+ assets/mo.<br><br>Full detail: <a href=\"/services/social/\">/services/social/</a>",
  {follow:['svc-brand','pricing-how','start-audit']});

t('svc-perf', "Performance ads",
  ['performance marketing','google ads','meta ads','facebook ads','paid ads','ppc','ad spend','linkedin ads','roas','lead generation ads','cro'],
  "Our <b>Performance Marketing practice</b> runs full-funnel paid media tracked to revenue, never vanity clicks: Google Ads (Search/PMax/YouTube, weekly optimization, call tracking), Meta Ads (full-funnel with 8+ creatives/mo included and CAPI), LinkedIn Ads (ABM lists, lead-gen forms), complete Lead-Gen Systems (ads + landing + WhatsApp/CRM routing + nurture), and a CRO program (heatmaps, 2–4 A/B tests/mo).<br><br><b>You always own the ad accounts</b> — they're created in your name. Full detail: <a href=\"/services/performance/\">/services/performance/</a>",
  {follow:['policy-ip','pricing-how','start-audit']});

t('svc-brand', "Branding & sales assets",
  ['branding','logo','brand identity','pitch deck','sales deck','company profile','brand guide'],
  "Our <b>Branding practice</b> builds identity systems and sales assets that make the next conversation easier to win: Logo &amp; Identity (3 concepts, final marks, usage rules), a Full Brand Guide (identity + voice + templates, 60+ pages), Pitch / Sales / Corporate decks (narrative + design + objection handling), and Company Profiles (8–12 pages, print + digital).<br><br>Full detail: <a href=\"/services/branding/\">/services/branding/</a>",
  {follow:['svc-web','svc-social','start-audit']});

t('svc-auto', "AI automation",
  ['ai automation','automate','automation','ai agent','ai assistant','whatsapp automation','document processing','knowledge assistant','ai employee','dashboard','rag','invoice automation'],
  "Our <b>AI Automation practice</b> deploys working systems to your own cloud, documented and handed over: AI Readiness Audit (2–3 wks, quantified savings + 12-mo roadmap), Knowledge Assistants (internal ChatGPT on your docs, RAG, 4–6 wks), Sales/Support/HR/Finance assistants integrated with your CRM/HRMS/Tally, WhatsApp automation on the verified Business API, Document Processing (invoices/KYC/contracts, 95%+ accuracy target), Executive Dashboards with AI commentary, and the AI Employees bundle (3+ assistants, shared memory, SSO, 8–12 wks).<br><br>Your team is trained to run everything — dependency is a bug, not a business model. Full detail: <a href=\"/services/ai-automation/\">/services/ai-automation/</a>",
  {follow:['tool-readiness','svc-consult','start-audit']});

t('svc-consult', "Consulting & AI leadership",
  ['consulting','fractional ai officer','advisory','roadmap','ai strategy','training','workshop','transformation','cto','ai officer'],
  "Our <b>Consulting practice</b> covers Digital Transformation Roadmaps (current-state audit, 18-month roadmap, business case), an AI Consulting Retainer (a fractional AI officer: strategy, vendor evaluation, governance — without a full-time executive salary), Innovation Workshops &amp; role-based AI training, and Market &amp; Competitive Intelligence briefs.<br><br>Priced as projects, not open-ended consulting. Full detail: <a href=\"/services/consulting/\">/services/consulting/</a>",
  {follow:['svc-auto','pricing-how','contact-book']});

/* ----- Pricing ----- */
t('m-pricing', "Pricing & plans",
  ['price','pricing','cost','how much','rate card','budget','fee','quote','plans','tiers','package'],
  "Every engagement is <b>scoped and quoted for your business after a free audit</b> — no rate card, no surprises. There are five tiers. Which would you like to see?",
  {menu:['tier-launch','tier-starter','tier-growth','tier-pro','tier-ent','pricing-how','policy-term']});

t('pricing-how', "How pricing works",
  ['how pricing works','custom quote','why no prices','no price','how do you charge'],
  "We don't publish fixed prices because scope varies hugely between businesses — instead, every engagement starts with a <b>free audit</b>, after which you get <b>three options at fixed scope with a written quote</b>. You know what ships, when, and what it costs before any work begins. See all tiers at <a href=\"/pricing/\">/pricing/</a>.",
  {follow:['start-audit','policy-term','m-pricing']});

t('tier-launch', "Launch tier",
  ['launch tier','solopreneur','very small business','first digital hire','smallest plan','cheapest'],
  "<b>Launch</b> — for solopreneurs &amp; small businesses making their first digital hire. Includes: 1 core channel (SEO or social), Google Business Profile + local SEO, WhatsApp Business setup, a quarterly AI-visibility snapshot, and a monthly report. Quoted after a free audit — <a href=\"/pricing/\">/pricing/</a>.",
  {follow:['tier-starter','pricing-how','start-audit']});

t('tier-starter', "Starter tier",
  ['starter tier','sme plan','small business plan','core digital engine'],
  "<b>Starter</b> — for SMEs building their core digital engine. Includes: website care + local SEO, 1 social platform, AI-visibility tracking, 1 automation per quarter, and a monthly report + strategy call. Quoted after a free audit — <a href=\"/pricing/\">/pricing/</a>.",
  {follow:['tier-growth','pricing-how','start-audit']});

t('tier-growth', "Growth tier",
  ['growth tier','scaling leads','scale lead flow','mid plan'],
  "<b>Growth</b> — for companies scaling lead flow. Includes: full SEO + GEO audit &amp; entity work, 2 social platforms + 1 ad channel, CRO testing, 1 automation per month, and a live dashboard with monthly strategy. Quoted after a free audit — <a href=\"/pricing/\">/pricing/</a>.",
  {follow:['tier-pro','pricing-how','start-audit']});

t('tier-pro', "Professional tier",
  ['professional tier','multi-channel','dedicated pod','bigger plan'],
  "<b>Professional</b> — multi-channel growth plus your first AI systems. Includes: enterprise SEO + the full GEO program, 3 platforms + 2 ad channels + video, 1 AI assistant per quarter, weekly reporting from a dedicated pod of 5, and fortnightly strategy. Quoted after a free audit — <a href=\"/pricing/\">/pricing/</a>.",
  {follow:['tier-ent','pricing-how','start-audit']});

t('tier-ent', "Enterprise tier",
  ['enterprise tier','ai-native','biggest plan','board reporting','transformation plan'],
  "<b>Enterprise</b> — AI-native transformation. Everything in Professional, plus the AI Employees program, founder brand + the full channel stack, a fractional AI officer with weekly strategy, and executive QBRs with board reporting. Quoted after a free audit — <a href=\"/pricing/\">/pricing/</a>.",
  {follow:['svc-consult','pricing-how','contact-book']});

/* ----- Industries ----- */
t('m-industries', "Industries",
  ['industry','industries','sector','vertical','do you work with','my business type'],
  "We run playbooks for ten industries. Which is yours?",
  {menu:['ind-restaurant','ind-hospital','ind-mfg','ind-edu','ind-realestate','ind-retail','ind-bfsi','ind-startup','ind-sme','ind-entkick']});

t('ind-restaurant', "Restaurant / QSR",
  ['restaurant','qsr','cafe','food business','zomato','swiggy','delivery margins'],
  "<b>Restaurant / QSR</b> — \"Fill tables and take back your delivery margins.\" Local SEO and map-pack visibility, a reels engine, WhatsApp ordering and review automation, so you stop losing margin to aggregators. Full playbook: <a href=\"/industries/restaurant-qsr/\">/industries/restaurant-qsr/</a>",
  {follow:['m-industries','start-audit']});
t('ind-hospital', "Hospital / Clinic",
  ['hospital','clinic','doctor','healthcare','patients','opd','medical'],
  "<b>Hospital / Clinic</b> — \"Fill OPD slots without buying every click.\" Doctor-profile SEO, WhatsApp appointment automation, reputation management and a medical-grade website. Full playbook: <a href=\"/industries/hospital-clinic/\">/industries/hospital-clinic/</a>",
  {follow:['m-industries','start-audit']});
t('ind-mfg', "Manufacturing / B2B",
  ['manufacturing','manufacturer','b2b','industrial','factory','rfq','catalog'],
  "<b>Manufacturing / B2B</b> — \"Turn a catalog PDF into an inbound RFQ engine.\" Product-page SEO, RFQ capture, document automation and AI visibility for spec-hunting buyers. Full playbook: <a href=\"/industries/manufacturing-b2b/\">/industries/manufacturing-b2b/</a>",
  {follow:['m-industries','svc-auto','start-audit']});
t('ind-edu', "Education / Coaching",
  ['education','coaching','school','college','institute','admissions','edtech','students'],
  "<b>Education / Coaching</b> — \"Lower your cost per admission, not your standards.\" Admissions-funnel ads, counsellor CRM automation, course-page SEO and nurture sequences reported by cost-per-admission. Full playbook: <a href=\"/industries/education-coaching/\">/industries/education-coaching/</a>",
  {follow:['m-industries','start-audit']});
t('ind-realestate', "Real Estate",
  ['real estate','property','builder','site visits','realty','housing'],
  "<b>Real Estate</b> — \"More site visits from the same ad spend.\" Project microsites, WhatsApp scheduling, CRM lead scoring/routing and stale-lead revival, tracked from click to site visit to sale. Full playbook: <a href=\"/industries/real-estate/\">/industries/real-estate/</a>",
  {follow:['m-industries','start-audit']});
t('ind-retail', "Retail / D2C",
  ['retail','d2c','ecommerce brand','online store','roas plateau','cart abandonment'],
  "<b>Retail / D2C</b> — \"Profitable growth after the ROAS plateau.\" Store CRO, a repeat-purchase engine on WhatsApp and email, creative volume that keeps Meta performing, and margin visibility — not just revenue. Full playbook: <a href=\"/industries/retail-d2c/\">/industries/retail-d2c/</a>",
  {follow:['m-industries','svc-perf','start-audit']});
t('ind-bfsi', "Finance / BFSI",
  ['finance','bfsi','bank','nbfc','insurance','fintech','compliance'],
  "<b>Finance / BFSI</b> — \"Grow the book without a compliance headache.\" Compliant content engines, lead capture with audit trails, and automation that respects regulatory constraints. Full playbook: <a href=\"/industries/finance-bfsi/\">/industries/finance-bfsi/</a>",
  {follow:['m-industries','policy-privacy','start-audit']});
t('ind-startup', "Startup (Series A–C)",
  ['startup','series a','series b','funded','fundraise','venture'],
  "<b>Startup (Series A–C)</b> — \"Look fundable. Grow measurable.\" A fundraise-ready brand and site, measurable growth engines, and AI visibility before your competitors get there. Full playbook: <a href=\"/industries/startup/\">/industries/startup/</a>",
  {follow:['m-industries','svc-brand','start-audit']});
t('ind-sme', "SME Digital Starter",
  ['sme','small business','first website','digital presence','getting online'],
  "<b>SME Digital Starter</b> — \"Your first serious digital presence — done right.\" Website, Google Business Profile, WhatsApp auto-replies and local SEO, then ads only once conversion is proven. Full playbook: <a href=\"/industries/sme-digital-starter/\">/industries/sme-digital-starter/</a>",
  {follow:['m-industries','tier-launch','start-audit']});
t('ind-entkick', "Enterprise AI Kickstart",
  ['enterprise ai','ai kickstart','ai pilot','board mandate','large company ai'],
  "<b>Enterprise AI Kickstart</b> — \"From board-level AI intent to two working pilots.\" Readiness audit, prioritized use-cases, and two production pilots with governance — proof, not decks. Full playbook: <a href=\"/industries/enterprise-ai-kickstart/\">/industries/enterprise-ai-kickstart/</a>",
  {follow:['m-industries','svc-consult','contact-book']});

/* ----- Free tools ----- */
t('m-tools', "Free tools",
  ['free tool','free tools','tools','calculator','free report','try free','no signup'],
  "Two free, no-signup tools — which do you want?",
  {menu:['tool-readiness','tool-tracker']});

t('tool-readiness', "AI Readiness check",
  ['ai readiness','readiness assessment','am i ready for ai','readiness quiz','readiness report'],
  "The <b>AI Readiness Assessment</b> is a 5-question quiz that scores your business across data, process and team readiness, and gives you an instant category-by-category report — no email required. Try it: <a href=\"/tools/ai-readiness/\">/tools/ai-readiness/</a>",
  {follow:['svc-auto','tool-tracker','start-audit']});

t('tool-tracker', "AI Rank Tracker",
  ['rank tracker','ai rank','track ai','ai visibility check','am i cited','check chatgpt','test prompts'],
  "The <b>AI Rank Tracker</b> generates a personalized panel of ~12 test prompts for your brand, category and competitors — you run them in ChatGPT, Gemini, Claude and Perplexity and score yourself Invisible / Mentioned / Recommended. Free, runs entirely in your browser: <a href=\"/tools/ai-rank-tracker/\">/tools/ai-rank-tracker/</a>",
  {follow:['svc-geo','tool-readiness','start-audit']});

/* ----- Process ----- */
t('m-process', "How we work",
  ['how does it work','process','how do you work','methodology','engagement model','what happens after'],
  "Our process and what to expect — pick one:",
  {menu:['proc-steps','proc-speed','proc-demos','start-audit']});

t('proc-steps', "The 4-step process",
  ['4 step','four step','diagnose','deploy','drive','steps'],
  "Four steps: <b>Diagnose</b> — every engagement starts with an audit and a number (revenue to gain or cost to remove; no number, no proposal). <b>Design</b> — the smallest system that moves that number: three options, fixed scope, written quote. <b>Deploy</b> — working software or live campaigns within 14 days of kickoff. <b>Drive</b> — we operate the system, report against your day-0 baseline, and hand your team the keys. More at <a href=\"/about/\">/about/</a>.",
  {follow:['proc-speed','proc-demos','start-audit']});

t('proc-speed', "How fast do you ship?",
  ['how fast','how long','timeline','14 days','when do we see results','kickoff','speed'],
  "<b>Working software or live campaigns within 14 days of kickoff</b> — that's the standard, not the exception. Results timelines vary by channel (paid ads move in weeks; SEO/GEO compound over months), which is why every proposal names the leading indicators you should expect to move by day 90.",
  {follow:['proc-demos','policy-guarantee','start-audit']});

t('proc-demos', "Weekly demos & reporting",
  ['demo','weekly demo','friday','reporting','updates','status','communication'],
  "<b>Friday demos, every week, no exceptions</b> — working output you can see, not status decks. Depending on tier, reporting runs monthly to weekly, up to live dashboards and executive QBRs.",
  {follow:['m-pricing','proc-steps','contact-book']});

t('start-audit', "Get started (free audit)",
  ['get started','start','begin','free audit','audit','first step','onboard','sign up'],
  "The fastest way to start is a <b>free audit</b> — pick Website, SEO, GEO, or an AI Readiness snapshot, and our team presents findings live in 20 minutes with a number attached and no pitch unless you ask. <a href=\"/#audit\">Request your free audit →</a><br><br>Prefer to talk first? WhatsApp us at "+WA_A+".",
  {follow:['contact-book','contact-wa','m-process']});

/* ----- Policies ----- */
t('m-policies', "Policies & guarantees",
  ['policy','policies','guarantee','terms','legal','contract','ownership','privacy'],
  "The fine print, in plain language — pick one:",
  {menu:['policy-guarantee','policy-ip','policy-term','policy-privacy']});

t('policy-guarantee', "Do you guarantee results?",
  ['guarantee','promise results','no results','risk','what if it doesnt work',"what if it doesn't work",'refund'],
  "No honest firm guarantees specific rankings or engine outputs — anyone who does is lying to you. What we guarantee is <b>process, transparency, and measurable movement on agreed leading indicators by day 90 — or we work free until there is</b> (retainers; conditions in the MSA).",
  {follow:['proc-steps','policy-term','start-audit']});

t('policy-ip', "Who owns the work?",
  ['who owns','ownership','my code','my accounts','ip transfer','vendor lock','lock-in','locked in','do i own','own the ad account','ad accounts','own my account','keep the account','keep my data'],
  "<b>You do.</b> Full IP transfer on final payment, and ad/analytics accounts are always created in your name from day one — never locked to our tooling. If we part ways, you keep the data, the history and the systems.",
  {follow:['policy-term','policy-guarantee','m-policies']});

t('policy-term', "Contract & notice period",
  ['minimum engagement','contract length','notice period','how long is the contract','commitment','cancel','exit'],
  "Standard engagements carry a <b>90-day minimum term with 30-day notice</b> to end after that — long enough to see real movement, short enough that you're never trapped. Small, focused projects can fit outside that too. Full terms: <a href=\"/terms/\">/terms/</a>",
  {follow:['policy-ip','pricing-how','m-policies']});

t('policy-privacy', "Privacy & your data",
  ['privacy','my data','data policy','dpdp','gdpr','data protection','spam'],
  "We're <b>DPDP Act 2023 aligned</b> — form data goes to a private sheet we control, is never sold, and you can ask for access, correction or deletion anytime at reckonaai@gmail.com. Full policy: <a href=\"/privacy/\">/privacy/</a>",
  {follow:['m-policies','contact-email']});

/* ----- Contact ----- */
t('m-contact', "Contact us",
  ['contact','talk to someone','reach you','phone number','call you','speak to','human','sales'],
  "Happy to connect you. How do you want to reach us?",
  {menu:['contact-wa','contact-email','contact-book','contact-loc','contact-careers']});

t('contact-wa', "WhatsApp",
  ['whatsapp','whats app','wa.me','message you','text you'],
  "WhatsApp us anytime at "+WA_A+" — 4-hour response SLA, Mon–Sat 9:30–19:00 IST. It's the fastest way to reach a human.",
  {follow:['contact-book','start-audit']});

t('contact-email', "Email",
  ['email','mail you','write to you'],
  "Email us at <b>reckonaai@gmail.com</b> — we reply within 4 working hours (Mon–Sat). For data/privacy requests, use the subject line \"Data request\".",
  {follow:['contact-wa','contact-book']});

t('contact-book', "Book a strategy call",
  ['book a call','schedule a call','strategy call','meeting','book a meeting','consultation','demo call'],
  "Book a free <b>30-minute strategy call</b> with a partner (not a salesperson) — you'll leave with three specific recommendations whether or not we ever work together. <a href=\"/#book\">Pick a slot →</a>",
  {follow:['start-audit','contact-wa']});

t('contact-loc', "Location",
  ['location','where are you','office','based in','address','mumbai'],
  "We're based in <b>Mumbai — Andheri East</b>, and work with clients across India (remote-first).",
  {follow:['contact-wa','contact-book']});

t('contact-careers', "Careers",
  ['career','job','hiring','vacancy','work at reckona','join the team','internship'],
  "We hire T-shaped operators who use AI like a power tool — remote-first, Mumbai hub, quarterly offsites, ₹50K/yr learning budget. Open roles: GEO Analyst, Automation Engineer (n8n/LangChain), Growth Strategist, Content Editor. Write to <b>reckonaai@gmail.com</b> with something you've shipped — no cover letters. Details: <a href=\"/about/\">/about/</a>",
  {follow:['m-contact']});

/* ----- Small talk ----- */
t('smalltalk-hi', "", ['hi','hello','hey','namaste','good morning','good evening'],
  "Hi! I'm the Reckona AI assistant. Tell me what you're looking for, or pick a topic below.",
  {follow:['m-services','m-pricing','m-contact']});
t('smalltalk-thanks', "", ['thank','thanks','thank you','cheers','appreciate','great','awesome','perfect'],
  "You're welcome! Anything else — or if you'd rather talk to a person, WhatsApp us at "+WA_A+" anytime.",
  {follow:['root','contact-wa']});
t('smalltalk-about', "About Reckona AI",
  ['about reckona','who are you','your company','who is behind','your team','what is reckona'],
  "<b>Reckona AI</b> is an AI-first growth &amp; automation partner for India's mid-market — working AI systems plus the growth engine to feed them, at mid-market prices with enterprise discipline. Senior pods, weekly shipping, everything founder-reviewed. More: <a href=\"/about/\">/about/</a>",
  {follow:['m-services','m-process','contact-book']});
t('res-blog', "Guides & articles",
  ['blog','resources','articles','read more','guides','learn'],
  "We publish practical, numbers-first guides on GEO, SEO, AI automation and growth — 120+ of them, searchable and filterable — at <a href=\"/resources/\">/resources/</a>.",
  {follow:['m-tools','m-services']});

var FALLBACK = "I couldn't match that to anything I know. Try a topic below — or go straight to a human: WhatsApp "+WA_A+", email reckonaai@gmail.com, or <a href=\"/#audit\">request a free audit</a>.";

/* ---------- Search ---------- */
function scoreAll(input){
  var q = ' '+input.toLowerCase().replace(/[^\w\s']/g,' ').replace(/\s+/g,' ')+' ';
  var scored = [];
  for (var id in T){
    var e = T[id], s = 0;
    for (var j=0;j<e.kw.length;j++){
      if (q.indexOf(e.kw[j]) !== -1) s += e.kw[j].length;
    }
    if (s>0) scored.push({id:id, s:s});
  }
  scored.sort(function(a,b){return b.s-a.s});
  return scored;
}

/* ---------- CSS ---------- */
var css = ""
+"#rkChatBtn{position:fixed;left:22px;bottom:22px;z-index:220;width:58px;height:58px;border-radius:999px;background:linear-gradient(135deg,var(--brand),var(--signal));border:none;cursor:pointer;box-shadow:0 10px 26px color-mix(in srgb,var(--brand) 38%,transparent),0 2px 8px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s}"
+"#rkChatBtn:hover{transform:scale(1.07) translateY(-2px);box-shadow:0 16px 34px color-mix(in srgb,var(--brand) 45%,transparent),0 4px 10px rgba(0,0,0,.2)}"
+"#rkChatBtn svg{width:27px;height:27px;position:relative}"
+"#rkChatBtn .dot{position:absolute;top:5px;right:5px;width:12px;height:12px;border-radius:999px;background:var(--signal);border:2.5px solid var(--bg);box-shadow:0 0 0 1px color-mix(in srgb,var(--signal) 50%,transparent)}"
+"#rkChatPanel{position:fixed;left:22px;bottom:92px;z-index:221;width:372px;max-width:calc(100vw - 32px);height:min(540px,calc(100vh - 140px));background:var(--surface);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow,0 12px 40px rgba(0,0,0,.2));display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .2s,transform .2s}"
+"#rkChatPanel.open{opacity:1;transform:none;pointer-events:auto}"
+"#rkChatHead{padding:16px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:var(--surface)}"
+"#rkChatHead b{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:1.02rem;color:var(--ink)}"
+"#rkChatHead span{display:block;font-size:.74rem;color:var(--ink2)}"
+"#rkChatClose{margin-left:auto;background:none;border:none;color:var(--ink2);cursor:pointer;font-size:1.1rem;line-height:1;padding:4px 6px;border-radius:8px}"
+"#rkChatClose:hover{background:var(--surface2,rgba(0,0,0,.05));color:var(--ink)}"
+"#rkChatBody{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px}"
+".rkMsg{max-width:88%;padding:10px 13px;border-radius:14px;font-size:.88rem;line-height:1.55}"
+".rkMsg a{color:inherit;text-decoration:underline}"
+".rkMsg b{color:inherit}"
+".rkMsg.bot{align-self:flex-start;background:var(--surface2,#F3F1EB);color:var(--ink);border-bottom-left-radius:4px}"
+".rkMsg.user{align-self:flex-end;background:var(--brand);color:#fff;border-bottom-right-radius:4px}"
+".rkChipRow{align-self:flex-start;display:flex;flex-wrap:wrap;gap:6px;max-width:95%}"
+".rkChip{font-size:.76rem;padding:6px 11px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--ink2);cursor:pointer;font-family:inherit}"
+".rkChip:hover{color:var(--ink);border-color:var(--ink2)}"
+"#rkChatForm{display:flex;gap:8px;padding:12px;border-top:1px solid var(--border)}"
+"#rkChatInput{flex:1;padding:10px 13px;border-radius:999px;border:1px solid var(--border);background:var(--bg);color:var(--ink);font:inherit;font-size:.88rem;outline:none}"
+"#rkChatInput:focus{border-color:var(--brand)}"
+"#rkChatSend{width:38px;height:38px;border-radius:999px;background:var(--ink);color:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}"
+"#rkChatSend:hover{opacity:.88}"
+"@media(max-width:480px){#rkChatBtn{left:16px;bottom:16px;width:52px;height:52px}#rkChatPanel{left:12px;bottom:80px;width:calc(100vw - 24px);height:min(72vh,540px)}}";

/* ---------- Build ---------- */
function build(){
  var style = document.createElement('style');
  style.id = 'rkChatStyle';
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.id = 'rkChatBtn';
  btn.setAttribute('aria-label','Open chat assistant');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="8.4" cy="11.4" r="1.15" fill="#fff"></circle><circle cx="12" cy="11.4" r="1.15" fill="#fff"></circle><circle cx="15.6" cy="11.4" r="1.15" fill="#fff"></circle></svg><span class="dot"></span>';

  var panel = document.createElement('div');
  panel.id = 'rkChatPanel';
  panel.innerHTML =
    '<div id="rkChatHead"><div><b>Reckona AI Assistant</b><span>Usually replies instantly</span></div><button id="rkChatClose" aria-label="Close chat">✕</button></div>'
    +'<div id="rkChatBody"></div>'
    +'<form id="rkChatForm"><input id="rkChatInput" autocomplete="off" placeholder="Type a question, or tap a topic…" aria-label="Type your question"><button id="rkChatSend" type="submit" aria-label="Send"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button></form>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector('#rkChatBody');
  var form = panel.querySelector('#rkChatForm');
  var input = panel.querySelector('#rkChatInput');
  var opened = false;

  function addMsg(text, who){
    var m = document.createElement('div');
    m.className = 'rkMsg ' + who;
    m.innerHTML = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }

  function clearChips(){
    var rows = body.querySelectorAll('.rkChipRow');
    for (var i=0;i<rows.length;i++) rows[i].parentNode.removeChild(rows[i]);
  }

  function addChips(ids){
    clearChips();
    var row = document.createElement('div');
    row.className = 'rkChipRow';
    var seen = {};
    ids.forEach(function(id){
      var e = T[id];
      if (!e || !e.label || seen[id]) return;
      seen[id] = 1;
      var c = document.createElement('button');
      c.className = 'rkChip';
      c.type = 'button';
      c.textContent = e.label;
      c.onclick = function(){ openTopic(id, true); };
      row.appendChild(c);
    });
    if (!seen['root'] && ids.indexOf('root')===-1){
      var home = document.createElement('button');
      home.className = 'rkChip';
      home.type = 'button';
      home.textContent = T['root'].label;
      home.onclick = function(){ openTopic('root', true); };
      row.appendChild(home);
    }
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  }

  function openTopic(id, echo){
    var e = T[id];
    if (!e) return;
    if (echo && e.label) addMsg(e.label.replace(/</g,'&lt;'), 'user');
    clearChips();
    setTimeout(function(){
      addMsg(e.a, 'bot');
      addChips(e.menu ? e.menu : e.follow);
    }, 240);
  }

  function ask(text){
    addMsg(text.replace(/</g,'&lt;'), 'user');
    clearChips();
    setTimeout(function(){
      var scored = scoreAll(text);
      if (!scored.length){
        addMsg(FALLBACK, 'bot');
        addChips(T['root'].menu);
        return;
      }
      var top = scored[0], second = scored[1];
      // Confident: clear winner (or only one match) -> answer directly
      if (!second || top.s >= second.s*2 || (T[top.id].menu && top.s>second.s)){
        var e = T[top.id];
        addMsg(e.a, 'bot');
        addChips(e.menu ? e.menu : e.follow);
      } else {
        // Ambiguous: offer the closest topics to choose from
        addMsg("I found a few things that might be what you're looking for — pick the closest:", 'bot');
        addChips(scored.slice(0,4).map(function(x){return x.id}));
      }
    }, 280);
  }

  function toggle(open){
    opened = open===undefined ? !panel.classList.contains('open') : open;
    panel.classList.toggle('open', opened);
    if (opened){
      if (!body.childElementCount){
        addMsg(T['root'].a, 'bot');
        addChips(T['root'].menu);
      }
      setTimeout(function(){ input.focus(); }, 150);
    }
  }

  btn.onclick = function(){ toggle(); };
  panel.querySelector('#rkChatClose').onclick = function(){ toggle(false); };
  form.onsubmit = function(e){
    e.preventDefault();
    var v = input.value.trim();
    if (!v) return false;
    input.value = '';
    ask(v);
    return false;
  };
  document.addEventListener('keydown', function(e){
    if (e.key==='Escape' && opened) toggle(false);
  });
}

if (document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', build);
} else {
  build();
}
})();
