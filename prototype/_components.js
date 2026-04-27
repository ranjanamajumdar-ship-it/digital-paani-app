/* ============================================================
   Digital Paani — shared component injectors
   Drop a placeholder, this script populates it.
   <div data-component="status-bar"></div>
   <div data-component="alarm-bar" data-state="active"></div>
   <div data-component="bottom-nav" data-active="plant"></div>
   <div data-component="launcher" data-active="plant"></div>
   ============================================================ */
(function(){
  const STATUSBAR = `
    <div class="ds-statusbar">
      <span>9:41</span>
      <span class="ds-statusbar-icons">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="1"/><rect x="4.5" y="4" width="3" height="6" rx="1"/><rect x="9" y="2" width="3" height="8" rx="1"/><rect x="13.5" y="0" width="3" height="10" rx="1"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 9.5C8.1 9.5 9 8.6 9 7.5S8.1 5.5 7 5.5 5 6.4 5 7.5 5.9 9.5 7 9.5Z" fill="currentColor"/><path d="M11.5 5.5C10.3 4.3 8.7 3.5 7 3.5S3.7 4.3 2.5 5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M13.5 3.5C11.7 1.7 9.4 .5 7 .5S2.3 1.7 .5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x=".5" y=".5" width="18" height="9" rx="2" stroke="currentColor"/><rect x="2" y="2" width="15" height="6" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="3" rx=".5" fill="currentColor"/></svg>
      </span>
    </div>`;

  const ALARM_PRESETS = {
    active:   { kicker:'Naya Issue · Active',     title:'Aeration Blower #2 — High vibration', time:'2 min', href:'plant.html' },
    progress: { kicker:'In Progress · Diagnosing', title:'Aeration Blower #2 — Step 3 of 5',     time:'5 min', href:'plant.html' },
    resolved: { kicker:'Resolved · Just now',     title:'Aeration Blower #2 — Action plan logged', time:'',  href:'plant.html' },
    idle:     { kicker:'No active alarms',        title:'All systems normal',                    time:'',     href:'plant.html' }
  };

  const ALARM_ICON = {
    active:  `<svg class="w-3.5 h-3.5" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 16H3l9-16Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>`,
    progress:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    resolved:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    idle:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/></svg>`
  };

  function alarmBar(state, opts){
    const s = ALARM_PRESETS[state] || ALARM_PRESETS.active;
    const merged = Object.assign({}, s, opts || {});
    const ring = state === 'active' ? '<span class="absolute inset-0 rounded-full bg-white/30" style="animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite"></span>' : '';
    const time = merged.time ? `<span class="ds-alarm-time">${merged.time}</span>` : '';
    return `
      <a href="${merged.href}" class="ds-alarm ds-alarm--${state} tap">
        <div class="ds-alarm-inner">
          <span class="ds-alarm-icon">${ring}<span style="position:relative">${ALARM_ICON[state]}</span></span>
          <div class="ds-alarm-body">
            <div class="ds-alarm-kicker">${merged.kicker}</div>
            <div class="ds-alarm-title">${merged.title}</div>
          </div>
          ${time}
          <svg class="ds-alarm-chev" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </a>`;
  }

  const NAV_TABS = [
    { id:'issues', href:'issues.html', label:'Issues',
      svg:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10l9-7Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>' },
    { id:'tasks', href:'tasks.html', label:'Tasks',
      svg:'<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M9 14l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { id:'plant', href:'plant.html', label:'Plant',
      svg:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 12c2 0 2-3 5-3s3 3 5 3 2-3 5-3 3 3 3 3v8H3v-8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="6" r="2.2" stroke="currentColor" stroke-width="1.7"/></svg>' },
    { id:'report', href:'report.html', label:'Report',
      svg:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>' },
  ];

  function bottomNav(active){
    return `
      <nav class="ds-nav">
        <div class="ds-nav-bar">
          ${NAV_TABS.map(t => `
            <a href="${t.href}" class="ds-nav-item${t.id===active?' active':''}">
              ${t.svg}
              <span class="label">${t.label}</span>
            </a>`).join('')}
        </div>
        <div class="ds-nav-handle"></div>
      </nav>`;
  }

  const LAUNCHER_LINKS = [
    { id:'plant',     href:'plant.html',     label:'Plant',     meta:'SCADA' },
    { id:'tasks',     href:'tasks.html',     label:'Tasks',     meta:'Kanban' },
    { id:'issues',    href:'issues.html',    label:'Issues',    meta:'List' },
    { id:'logbook',   href:'logbook.html',   label:'Logbook',   meta:'Bulk' },
    { id:'equipment', href:'equipment.html', label:'Equipment', meta:'Card' },
    { id:'report',    href:'report.html',    label:'Report',    meta:'New' },
    { id:'styleguide',href:'styleguide.html',label:'Styleguide',meta:'DS' },
  ];

  function launcher(active){
    return `
      <aside class="ds-launcher">
        <div class="ds-launcher-eyebrow">Digital Paani · Prototype</div>
        ${LAUNCHER_LINKS.map(l => `
          <a href="${l.href}" class="ds-launcher-link${l.id===active?' active':''}">
            <span>${l.label}</span><span class="meta">${l.meta}</span>
          </a>`).join('')}
      </aside>`;
  }

  // ===== View Mode Toggle =====
  function injectViewToggle(){
    if (document.querySelector('.vm-toggle')) return;
    const isDesktop = /desktop\.html/i.test(location.pathname);
    const wrap = document.createElement('div');
    wrap.className = 'vm-toggle';
    wrap.innerHTML = `
      <a href="plant.html" class="${isDesktop ? '' : 'active'}" data-vm="mobile">
        <svg viewBox="0 0 16 16" fill="none"><rect x="4" y="1.5" width="8" height="13" rx="1.5" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="12.5" r=".7" fill="currentColor"/></svg>
        Mobile
      </a>
      <a href="desktop.html" class="${isDesktop ? 'active' : ''}" data-vm="desktop">
        <svg viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="9" rx="1.2" stroke="currentColor" stroke-width="1.4"/><path d="M5 13.5h6M8 11.5v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        Desktop
      </a>`;
    const host = document.querySelector('.device') || document.body;
    host.appendChild(wrap);
    wrap.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      try { localStorage.setItem('dp.viewmode', a.dataset.vm); } catch(e) {}
    }));
  }

  // ===== Mount =====
  function mount(){
    document.querySelectorAll('[data-component]').forEach(el => {
      const c = el.dataset.component;
      if (c === 'status-bar') el.outerHTML = STATUSBAR;
      else if (c === 'alarm-bar') el.outerHTML = alarmBar(el.dataset.state || 'active', { href: el.dataset.href, title: el.dataset.title, kicker: el.dataset.kicker, time: el.dataset.time });
      else if (c === 'bottom-nav') el.outerHTML = bottomNav(el.dataset.active || '');
      else if (c === 'launcher') el.outerHTML = launcher(el.dataset.active || '');
    });
    injectViewToggle();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  // expose for ad-hoc rendering
  window.DS = { alarmBar, bottomNav, launcher, statusBar: STATUSBAR };
})();
