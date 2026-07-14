// ---------- mobile nav toggle ----------
(function(){
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if(!toggle || !mobileNav) return;

  function setOpen(open){
    toggle.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setOpen(!mobileNav.classList.contains('open')));
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && mobileNav.classList.contains('open')) setOpen(false);
  });
})();

// ---------- scroll reveal ----------
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(i => i.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(i => obs.observe(i));
})();

// ---------- routine finder quiz ----------
(function(){
  const quiz = document.getElementById('skinQuiz');
  if(!quiz) return;

  const answers = { skin: '', concern: '' };
  const panels = quiz.querySelectorAll('.quiz-panel');
  const pips = quiz.querySelectorAll('.quiz-pip');
  const lead = document.getElementById('quizResultLead');
  const note = document.getElementById('quizResultNote');
  const wa = document.getElementById('quizWhatsApp');

  function showPanel(n){
    panels.forEach(p => {
      const on = Number(p.dataset.panel) === n;
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
    pips.forEach(pip => {
      const i = Number(pip.dataset.pip);
      pip.classList.toggle('is-active', i === n);
      pip.classList.toggle('is-done', i < n);
    });
    quiz.dataset.step = String(n);
  }

  function buildResult(){
    const skin = answers.skin;
    const concern = answers.concern;
    let focus = 'the full three-step edit — cleanse, treat, and protect.';
    if(concern === 'Hydration') focus = 'hydration first: serum at the centre, with cleanser + SPF around it.';
    if(concern === 'Brightness') focus = 'brightness: Vitamin C cleanser + serum, locked in with SPF.';
    if(concern === 'Sun protection') focus = 'daily protection: SPF every morning, plus cleanse + hydrate.';
    if(concern === 'A simple start') focus = 'a calm starter routine — all three steps, nothing extra.';

    if(lead) lead.textContent = `For ${skin.toLowerCase()} skin focused on ${concern.toLowerCase()}: ${focus}`;
    if(note) note.textContent = 'Message us on WhatsApp — your answers are already in the note so we can help faster.';

    const msg = `Hi Floree! I used the routine finder.\nSkin type: ${skin}\nMain concern: ${concern}\nI'd like help with the Floree 3-step edit.`;
    if(wa) wa.href = 'https://wa.me/923168558658?text=' + encodeURIComponent(msg);
  }

  quiz.addEventListener('click', (e) => {
    const opt = e.target.closest('.quiz-opt');
    const back = e.target.closest('[data-back]');
    const restart = e.target.closest('[data-restart]');

    if(opt){
      const key = opt.dataset.key;
      const value = opt.dataset.value;
      answers[key] = value;
      const panel = opt.closest('.quiz-panel');
      panel.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('is-selected'));
      opt.classList.add('is-selected');

      if(key === 'skin'){
        setTimeout(() => showPanel(2), 160);
      } else if(key === 'concern'){
        buildResult();
        setTimeout(() => showPanel(3), 160);
      }
    }

    if(back) showPanel(1);
    if(restart){
      answers.skin = '';
      answers.concern = '';
      quiz.querySelectorAll('.quiz-opt').forEach(b => b.classList.remove('is-selected'));
      showPanel(1);
    }
  });
})();
