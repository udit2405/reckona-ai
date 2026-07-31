/* Reckona AI — site-wide FAQ chatbot.
   Self-contained: injects its own CSS + DOM, no dependencies, no network calls.
   Answers are keyword-matched against a fixed knowledge base built from this
   site's own real content (services, pricing, process, contact) — it never
   invents facts, and falls back to a human-contact prompt when unsure. */
(function(){
'use strict';

var WA_LINK = 'https://wa.me/919588859960';
var WA_DISPLAY = '+91 95888 59960';

/* ---------- Knowledge base ---------- */
/* Each entry: trigger keywords (matched as substrings of the lowercased
   question) and an HTML answer. Order matters only for tie-breaking. */
var KB = [
  { id:'greeting', kw:['hi','hello','hey','namaste','yo '],
    a:"Hi! I'm the Reckona AI assistant. Ask me about our services, pricing, process, industries we work with, or how to get in touch — I'll do my best to answer directly." },

  { id:'services-overview', kw:['what services','what do you do','what do you offer','offerings','practices','what can you help'],
    a:"We run eight practices under one accountable pod: <b>GEO</b> (AI visibility — our flagship), SEO, Web design &amp; engineering, Social, Performance Marketing, Branding, AI Automation, and Consulting. See the full breakdown at <a href=\"/services/\">/services/</a>." },

  { id:'geo', kw:['geo','generative engine optimization','ai visibility','chatgpt','cited by ai','ai overview','ai search'],
    a:"GEO (Generative Engine Optimization) is our flagship practice — getting your brand cited, recommended and correctly described inside ChatGPT, Gemini, Claude, Perplexity and AI Overviews, measured with a monthly AI-visibility score across 4 engines. Details at <a href=\"/services/geo/\">/services/geo/</a>, or try our free <a href=\"/tools/ai-rank-tracker/\">AI Rank Tracker</a>." },

  { id:'seo', kw:['seo','search engine optimization','ranking','google ranking','organic traffic'],
    a:"Our SEO practice covers technical health, content that matches intent, and authority-building link work — compounding organic growth. See <a href=\"/services/seo/\">/services/seo/</a> for the full scope." },

  { id:'web', kw:['website','web design','web development','landing page','new site','build a site'],
    a:"We design and build sites meant to convert, not just exist — analytics, SEO foundations and a CMS your team can run, from landing pages to full ecommerce builds. See <a href=\"/services/web/\">/services/web/</a>." },

  { id:'social', kw:['social media','instagram','linkedin','youtube','content calendar','social content'],
    a:"Our Social practice runs authority-building content engines on LinkedIn, Instagram, YouTube and more — on a calendar your team approves once a month. See <a href=\"/services/social/\">/services/social/</a>." },

  { id:'performance', kw:['performance marketing','google ads','meta ads','paid ads','ppc','facebook ads','ad spend'],
    a:"Our Performance Marketing practice runs full-funnel Google, Meta and LinkedIn ads with creative included and every rupee tracked to revenue — you always own the ad accounts. See <a href=\"/services/performance/\">/services/performance/</a>." },

  { id:'branding', kw:['branding','logo','brand identity','pitch deck','company profile'],
    a:"Our Branding practice covers identity systems and sales assets — logo &amp; brand guide, pitch decks, company profiles — built to make the next conversation easier to win. See <a href=\"/services/branding/\">/services/branding/</a>." },

  { id:'ai-automation', kw:['ai automation','automate','chatbot','ai agent','whatsapp automation','automation'],
    a:"Our AI Automation practice deploys assistants and agents to your own cloud — knowledge assistants, WhatsApp automation, document processing, executive dashboards — documented and handed over, with your team trained to run them. See <a href=\"/services/ai-automation/\">/services/ai-automation/</a>." },

  { id:'consulting', kw:['consulting','fractional ai officer','advisory','roadmap','ai strategy','training'],
    a:"Our Consulting practice covers digital transformation roadmaps, a fractional AI officer retainer, and team training — priced as projects, not open-ended consulting. See <a href=\"/services/consulting/\">/services/consulting/</a>." },

  { id:'pricing', kw:['price','pricing','cost','how much','rate card','budget','fee','quote'],
    a:"We don't publish a fixed rate card — every engagement is scoped and quoted after a free audit, so you're never paying for more than you need. There are five tiers, from Launch (solopreneurs &amp; small business) through Enterprise (AI-native transformation) — see what's included at each at <a href=\"/pricing/\">/pricing/</a>." },

  { id:'process', kw:['how does it work','process','how do you work','timeline','how long','kickoff'],
    a:"Four steps: <b>Diagnose</b> (a free audit with a number attached) → <b>Design</b> (three fixed-scope options, written quote) → <b>Deploy</b> (working software or live campaigns within 14 days of kickoff) → <b>Drive</b> (we operate and report against your day-0 baseline). Weekly Friday demos throughout. More at <a href=\"/about/\">/about/</a>." },

  { id:'audit', kw:['free audit','get started','start','begin','audit'],
    a:"The fastest way to start is a free audit — pick Website, SEO, GEO, or an AI Readiness snapshot, and our team presents findings live in 20 minutes with no pitch unless you ask. <a href=\"/#audit\">Request your free audit →</a>" },

  { id:'guarantee', kw:['guarantee','promise results','no results','risk','what if it doesnt work',"what if it doesn't work"],
    a:"No honest firm guarantees specific rankings or results — anyone who does is lying to you. What we guarantee is process, transparency, and measurable movement on agreed leading indicators by day 90, or we work free until there is (terms in the MSA)." },

  { id:'ip-ownership', kw:['who owns','ownership','my code','my accounts','ip transfer','vendor lock'],
    a:"You do. Full IP transfer on final payment, and ad/analytics accounts are always created in your name from day one — never locked to our tooling." },

  { id:'minimum-engagement', kw:['minimum engagement','contract length','notice period','how long is the contract','commitment'],
    a:"Standard engagements carry a 90-day minimum term with 30-day notice to end after that — long enough to see real movement, short enough that you're never trapped. Small, focused projects can fit outside that too — ask us." },

  { id:'industries', kw:['industry','industries','sector','do you work with','vertical'],
    a:"We work across Restaurant/QSR, Hospital/Clinic, Manufacturing/B2B, Education/Coaching, Real Estate, Retail/D2C, Finance/BFSI, Startups (Series A–C), SME Digital Starter, and Enterprise AI Kickstart. See <a href=\"/industries/\">/industries/</a> for what we do in each." },

  { id:'tools', kw:['free tool','ai readiness','rank tracker','calculator','free report'],
    a:"Two free, no-signup tools: the <a href=\"/tools/ai-readiness/\">AI Readiness Assessment</a> (5-question quiz, instant report) and the <a href=\"/tools/ai-rank-tracker/\">AI Rank Tracker</a> (generates test prompts to check if ChatGPT/Gemini/Claude/Perplexity recommend you)." },

  { id:'contact', kw:['contact','talk to someone','reach you','phone number','call you','speak to','human'],
    a:"Easiest way: WhatsApp us directly at <a href=\""+WA_LINK+"\" target=\"_blank\" rel=\"noopener\">"+WA_DISPLAY+"</a>. Or email reckonaai@gmail.com, or <a href=\"/#book\">book a 30-minute strategy call</a>." },

  { id:'whatsapp', kw:['whatsapp','whats app','wa.me'],
    a:"You can WhatsApp us anytime at <a href=\""+WA_LINK+"\" target=\"_blank\" rel=\"noopener\">"+WA_DISPLAY+"</a> — 4-hour response SLA, Mon–Sat 9:30–19:00 IST." },

  { id:'book-call', kw:['book a call','schedule a call','strategy call','meeting','book a meeting','consultation'],
    a:"You can book a free 30-minute strategy call with a partner (not a salesperson) here: <a href=\"/#book\">/#book</a>." },

  { id:'location', kw:['location','where are you','office','based in','address'],
    a:"We're based in Mumbai — Andheri East — and work with clients across India." },

  { id:'about', kw:['about reckona','who are you','company','who is behind','your team'],
    a:"Reckona AI is an AI-first growth &amp; automation partner for India's mid-market — working AI systems plus the growth engine to feed them, at mid-market prices with enterprise discipline. More at <a href=\"/about/\">/about/</a>." },

  { id:'careers', kw:['career','job','hiring','vacancy','work at reckona','join the team'],
    a:"We hire T-shaped operators who use AI like a power tool — remote-first, with a Mumbai hub and quarterly offsites. Write to reckonaai@gmail.com with something you've shipped (no cover letters needed). Open roles at <a href=\"/about/\">/about/</a>." },

  { id:'privacy', kw:['privacy','my data','data policy','dpdp','gdpr'],
    a:"We're DPDP Act 2023 aligned — your data is never sold or spammed. Full details at <a href=\"/privacy/\">/privacy/</a>." },

  { id:'terms', kw:['terms','terms of service','legal'],
    a:"You can read our full Terms of Service at <a href=\"/terms/\">/terms/</a>." },

  { id:'resources', kw:['blog','resources','articles','read more','guides'],
    a:"We publish practical, numbers-first guides on GEO, SEO, AI automation and growth at <a href=\"/resources/\">/resources/</a>." },

  { id:'thanks', kw:['thank','thanks','thank you','cheers','appreciate'],
    a:"You're welcome! Anything else you'd like to know — or if you'd rather talk to a person, WhatsApp us at <a href=\""+WA_LINK+"\" target=\"_blank\" rel=\"noopener\">"+WA_DISPLAY+"</a> anytime." }
];

var FALLBACK = "I don't have a confident answer for that one. You can ask me about our services, pricing, process, industries, or free tools — or go straight to a human: WhatsApp <a href=\""+WA_LINK+"\" target=\"_blank\" rel=\"noopener\">"+WA_DISPLAY+"</a>, email reckonaai@gmail.com, or <a href=\"/#audit\">request a free audit</a>.";

var SUGGESTED = ["What services do you offer?","How much does this cost?","How do I get started?","How can I contact you?"];

function matchKB(input){
  var q = input.toLowerCase();
  var best = null, bestScore = 0;
  for (var i=0;i<KB.length;i++){
    var entry = KB[i], score = 0;
    for (var j=0;j<entry.kw.length;j++){
      if (q.indexOf(entry.kw[j]) !== -1) score += entry.kw[j].length; // longer/more specific phrase wins ties
    }
    if (score > bestScore){ bestScore = score; best = entry; }
  }
  return best ? best.a : FALLBACK;
}

/* ---------- CSS ---------- */
var css = ""
+"#rkChatBtn{position:fixed;left:22px;bottom:22px;z-index:220;width:58px;height:58px;border-radius:999px;background:var(--brand);border:none;cursor:pointer;box-shadow:var(--shadow,0 8px 24px rgba(0,0,0,.18));display:flex;align-items:center;justify-content:center;transition:transform .2s}"
+"#rkChatBtn:hover{transform:scale(1.06)}"
+"#rkChatBtn svg{width:26px;height:26px}"
+"#rkChatBtn .dot{position:absolute;top:6px;right:6px;width:11px;height:11px;border-radius:999px;background:#0F766E;border:2px solid var(--bg)}"
+"#rkChatPanel{position:fixed;left:22px;bottom:92px;z-index:221;width:360px;max-width:calc(100vw - 32px);height:min(520px,calc(100vh - 140px));background:var(--surface);border:1px solid var(--border);border-radius:20px;box-shadow:var(--shadow,0 12px 40px rgba(0,0,0,.2));display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .2s,transform .2s}"
+"#rkChatPanel.open{opacity:1;transform:none;pointer-events:auto}"
+"#rkChatHead{padding:16px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:var(--surface)}"
+"#rkChatHead b{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:1.02rem;color:var(--ink)}"
+"#rkChatHead span{display:block;font-size:.74rem;color:var(--ink2)}"
+"#rkChatClose{margin-left:auto;background:none;border:none;color:var(--ink2);cursor:pointer;font-size:1.1rem;line-height:1;padding:4px 6px;border-radius:8px}"
+"#rkChatClose:hover{background:var(--surface2,rgba(0,0,0,.05));color:var(--ink)}"
+"#rkChatBody{flex:1;overflow-y:auto;padding:16px 14px;display:flex;flex-direction:column;gap:10px}"
+".rkMsg{max-width:86%;padding:10px 13px;border-radius:14px;font-size:.88rem;line-height:1.5}"
+".rkMsg a{color:inherit;text-decoration:underline}"
+".rkMsg.bot{align-self:flex-start;background:var(--surface2,#F3F1EB);color:var(--ink);border-bottom-left-radius:4px}"
+".rkMsg.user{align-self:flex-end;background:var(--brand);color:#fff;border-bottom-right-radius:4px}"
+"#rkChips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 12px}"
+".rkChip{font-size:.76rem;padding:6px 11px;border-radius:999px;border:1px solid var(--border);background:var(--surface);color:var(--ink2);cursor:pointer}"
+".rkChip:hover{color:var(--ink);border-color:var(--ink2)}"
+"#rkChatForm{display:flex;gap:8px;padding:12px;border-top:1px solid var(--border)}"
+"#rkChatInput{flex:1;padding:10px 13px;border-radius:999px;border:1px solid var(--border);background:var(--bg);color:var(--ink);font:inherit;font-size:.88rem;outline:none}"
+"#rkChatInput:focus{border-color:var(--brand)}"
+"#rkChatSend{width:38px;height:38px;border-radius:999px;background:var(--ink);color:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}"
+"#rkChatSend:hover{opacity:.88}"
+"@media(max-width:480px){#rkChatBtn{left:16px;bottom:16px;width:52px;height:52px}#rkChatPanel{left:12px;bottom:80px;width:calc(100vw - 24px);height:min(70vh,520px)}}";

/* ---------- Build ---------- */
function build(){
  var style = document.createElement('style');
  style.id = 'rkChatStyle';
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.id = 'rkChatBtn';
  btn.setAttribute('aria-label','Open chat assistant');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg><span class="dot"></span>';

  var panel = document.createElement('div');
  panel.id = 'rkChatPanel';
  panel.innerHTML =
    '<div id="rkChatHead"><div><b>Reckona AI Assistant</b><span>Usually replies instantly</span></div><button id="rkChatClose" aria-label="Close chat">✕</button></div>'
    +'<div id="rkChatBody"></div>'
    +'<div id="rkChips"></div>'
    +'<form id="rkChatForm"><input id="rkChatInput" autocomplete="off" placeholder="Ask about services, pricing, process…" aria-label="Type your question"><button id="rkChatSend" type="submit" aria-label="Send"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button></form>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector('#rkChatBody');
  var chips = panel.querySelector('#rkChips');
  var form = panel.querySelector('#rkChatForm');
  var input = panel.querySelector('#rkChatInput');
  var opened = false;

  function addMsg(text, who){
    var m = document.createElement('div');
    m.className = 'rkMsg ' + who;
    m.innerHTML = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }

  function renderChips(){
    chips.innerHTML = '';
    SUGGESTED.forEach(function(q){
      var c = document.createElement('button');
      c.className = 'rkChip';
      c.type = 'button';
      c.textContent = q;
      c.onclick = function(){ ask(q); };
      chips.appendChild(c);
    });
  }

  function ask(text){
    addMsg(text.replace(/</g,'&lt;'), 'user');
    chips.style.display = 'none';
    setTimeout(function(){
      addMsg(matchKB(text), 'bot');
    }, 280);
  }

  function toggle(open){
    opened = open===undefined ? !panel.classList.contains('open') : open;
    panel.classList.toggle('open', opened);
    if (opened){
      if (!body.childElementCount){
        addMsg("Hi! I'm the Reckona AI assistant — ask me about services, pricing, process, or how to reach a human. Try a question below, or type your own.", 'bot');
        renderChips();
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
