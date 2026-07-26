/* Built with Elements — showcase interactions */
(function () {
  'use strict';

  var SURF = { email: 'email.html', web: 'page.html', print: 'document.html' };
  var SURF_LABEL = { email: 'Email', web: 'Web', print: 'Print' };

  var SHOWCASE = [
    { slug: 'cadence', cw: 560, name: 'Cadence', kicker: 'Your Year in Motion', accent: '#FF5A1F',
      star: 'web', domain: 'cadence.run', from: 'Cadence <recap@cadence.run>',
      subject: 'Alex, your 2026 is in — 1,284 km and counting',
      blurb: 'A Wrapped-style running recap. The email is a teaser; the web is a bold scroll-story — a 12-month bar chart, an elevation profile, an orange persona payoff; the PDF is a frame-it poster of the year.' },
    { slug: 'spore', cw: 680, name: 'SPORE', kicker: 'A Field Guide Deck', accent: '#B4623A',
      star: 'print', domain: 'spore.field', from: 'SPORE <deck@spore.field>',
      subject: 'You unlocked 3 new specimens — one of them is dangerous',
      blurb: 'Collectible fungi cards, each anchored by a hand-generated botanical plate. The email is a “+3 unlocked” reveal; the web is the collection gallery; the PDF is a print-and-cut sheet with card backs.' },
    { slug: 'nocturne', cw: 820, name: 'Nocturne', kicker: 'A Dark-Academia Exhibition', accent: '#A8894F',
      star: 'print', domain: 'aldous.institute', from: 'The Aldous Institute <invites@aldous.art>',
      subject: "You're invited — Nocturne: Elias Vaughn, opening 12 September",
      blurb: 'An identity for the painter Elias Vaughn — serif-led, gilt the only light, six real generated paintings. An opening invite, an exhibition page, and a bi-fold gallery guide with floor plan and checklist.' },
    { slug: 'mise', cw: 400, name: 'Mise', kicker: 'Recipe of the Week', accent: '#B95E2E',
      star: 'print', domain: 'mise.kitchen', from: 'Mise <weekly@mise.kitchen>',
      subject: 'Recipe of the week — Cast-Iron Rosemary Focaccia',
      blurb: 'The email teases the dish; the web is the full recipe page; the PDF is a printable 4×6 index card — front and back — that you clip for the recipe box.' }
  ];

  var TXN = [
    { slug: 'rate-confirmation', cw: 600, name: 'Rate Confirmation', brand: 'Northwind Freight', accent: '#C6412A',
      star: 'print', domain: 'northwind.co', from: 'Northwind Freight <ops@northwind.co>',
      subject: 'Rate Confirmation NW-RC-48217 — signature required',
      blurb: 'A carrier rate confirmation — lane, stops, accessorials and a signature line. Email for the inbox, PDF for the file.' },
    { slug: 'event-ticket', cw: 688, name: 'Event Ticket', brand: 'Nightshift', accent: '#FF2D78',
      star: 'email', domain: 'nightshift.live', from: 'Nightshift <tickets@nightshift.live>',
      subject: "You're in — Nightshift · Sat Aug 15. Your QR ticket is inside.",
      blurb: 'A club-night ticket with a scannable code, set details and door times — a bold email and a wallet-ready print stub.' },
    { slug: 'invoice-receipt', cw: 600, name: 'Invoice + Receipt', brand: 'Loomly Studio', accent: '#3E6DA8',
      star: 'print', domain: 'loomly.studio', from: 'Loomly Studio <billing@loomly.studio>',
      subject: 'Receipt — Studio plan · $128.00 paid',
      blurb: 'A subscription invoice and paid receipt — line items, totals, payment method. Clean in the inbox, tidy on paper.' },
    { slug: 'order-confirmation', cw: 640, name: 'Order + Packing Slip', brand: 'Trailhead Goods', accent: '#3E7E6C',
      star: 'print', domain: 'trailhead.co', from: 'Trailhead Goods <orders@trailhead.co>',
      subject: 'Your Trailhead order is confirmed — TH-100482',
      blurb: 'An order confirmation email plus a printable packing slip — items, quantities, shipping address and totals.' }
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  var ICON = {
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    open: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'
  };

  /* fit an iframe to its (same-origin) content so the frame scrolls the full page */
  function fit(iframe) {
    try {
      var d = iframe.contentDocument || iframe.contentWindow.document;
      var h = Math.max(d.documentElement.scrollHeight, d.body ? d.body.scrollHeight : 0);
      if (h > 40) iframe.style.height = h + 'px';
    } catch (e) { /* keep default height */ }
  }

  function buildCard(cfg, num, section) {
    var card = el('article', 'tpl-card');
    card.style.setProperty('--a', cfg.accent);

    /* header */
    var top = el('div', 'tpl-top');
    var idWrap = el('div', 'tpl-id');
    var meta = el('div');
    meta.appendChild(el('p', 'tpl-kick', cfg.kicker || cfg.brand));
    var nameRow = el('div', null,
      '<span class="tpl-num">' + num + '</span> <span class="tpl-name">' + cfg.name + '</span>');
    nameRow.style.display = 'flex';
    nameRow.style.alignItems = 'baseline';
    nameRow.style.gap = '12px';
    meta.insertBefore(nameRow, meta.firstChild);
    meta.appendChild(el('p', 'tpl-blurb', cfg.blurb));
    idWrap.appendChild(meta);
    top.appendChild(idWrap);
    if (cfg.brand) top.appendChild(el('div', 'tpl-brand', cfg.brand));
    card.appendChild(top);

    /* viewer */
    var viewer = el('div', 'viewer');
    var tabs = el('div', 'tabs');
    var stage = el('div', 'stage');
    var bar = el('div', 'stage-bar');
    bar.appendChild(el('span', 'dots', '<i></i><i></i><i></i>'));
    var url = el('span', 'stage-url');
    bar.appendChild(url);
    var openLink = el('a', 'stage-open', 'Open ↗');
    openLink.target = '_blank'; openLink.rel = 'noopener';
    bar.appendChild(openLink);
    var frameWrap = el('div', 'stage-frame');
    var iframe = el('iframe');
    iframe.loading = 'lazy';
    iframe.title = cfg.name + ' preview';
    iframe.addEventListener('load', function () { fit(iframe); });
    frameWrap.appendChild(iframe);
    stage.appendChild(bar);
    stage.appendChild(frameWrap);

    var order = ['email', 'web', 'print'];
    function select(surf) {
      order.forEach(function (s) {
        tabs.querySelector('[data-s="' + s + '"]').setAttribute('aria-selected', s === surf);
      });
      iframe.style.height = '1200px';
      iframe.src = 'dist/' + cfg.slug + '/' + SURF[surf];
      openLink.href = 'dist/' + cfg.slug + '/' + SURF[surf];
      var fw = surf === 'web' ? '' : (surf === 'email' ? '600px' : (cfg.cw + 'px'));
      iframe.style.width = fw || '100%';
      iframe.style.minWidth = fw ? '0' : '640px';
      iframe.style.margin = fw ? '0 auto' : '0';
      var label = surf === 'email' ? '✉  ' + cfg.from
        : surf === 'web' ? '🌐  ' + cfg.domain
        : '🖨  ' + cfg.slug + ' — document.pdf';
      url.textContent = label;
    }
    order.forEach(function (s) {
      var t = el('button', 'tab',
        SURF_LABEL[s] + (s === cfg.star ? ' <span class="star">★</span>' : ''));
      t.setAttribute('data-s', s);
      t.setAttribute('aria-selected', 'false');
      t.addEventListener('click', function () { select(s); });
      tabs.appendChild(t);
    });
    viewer.appendChild(tabs);
    viewer.appendChild(stage);
    card.appendChild(viewer);

    /* actions */
    var actions = el('div', 'actions');
    var pdf = el('a', 'btn btn-primary', ICON.pdf + ' Export PDF');
    pdf.href = 'dist/' + cfg.slug + '/document.pdf';
    pdf.setAttribute('download', cfg.slug + '.pdf');
    var send = el('button', 'btn', ICON.mail + ' Send email');
    send.addEventListener('click', function () { openModal(cfg); });
    var web = el('a', 'btn btn-ghost', ICON.open + ' Open web page');
    web.href = 'dist/' + cfg.slug + '/page.html';
    web.target = '_blank'; web.rel = 'noopener';
    actions.appendChild(pdf);
    actions.appendChild(send);
    actions.appendChild(web);
    actions.appendChild(el('span', 'act-note', 'PDF is the real generated artifact · email send is a demo'));
    card.appendChild(actions);

    document.getElementById(section).appendChild(card);
    select(cfg.star === 'email' ? 'email' : cfg.star === 'print' ? 'web' : cfg.star);
  }

  SHOWCASE.forEach(function (c, i) { buildCard(c, '0' + (i + 1), 'showcase-grid'); });
  TXN.forEach(function (c, i) { buildCard(c, '0' + (i + 1), 'txn-grid'); });

  /* ---------------- send-email modal ---------------- */
  var modal = document.getElementById('modal');
  var body = document.getElementById('modal-body');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function closeModal() { modal.hidden = true; body.innerHTML = ''; }
  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  function openModal(cfg) {
    body.innerHTML =
      '<p class="m-kick">Send test email</p>' +
      '<h2 class="m-title">' + cfg.name + '</h2>' +
      '<div class="m-field"><label>To</label><input id="m-to" type="email" placeholder="you@example.com" autocomplete="email" /></div>' +
      '<div class="m-err" id="m-err"></div>' +
      '<div class="m-field"><label>From</label><input value="' + esc(cfg.from) + '" readonly /></div>' +
      '<div class="m-field"><label>Subject</label><input value="' + esc(cfg.subject) + '" readonly /></div>' +
      '<div class="m-prev"><div class="m-prev-bar">Rendered email — dist/' + cfg.slug + '/email.html</div>' +
        '<iframe src="dist/' + cfg.slug + '/email.html" title="email preview"></iframe></div>' +
      '<div class="m-actions">' +
        '<button class="btn btn-primary" id="m-send">' + ICON.mail + ' Send test email</button>' +
        '<button class="btn btn-ghost" id="m-copy">Copy HTML</button>' +
        '<button class="btn btn-ghost" id="m-eml">Download .eml</button>' +
      '</div>' +
      '<p class="m-note">Demo delivery — no message actually leaves your browser. In production the same rendered HTML is dispatched through your ESP (SendGrid · Amazon SES · Postmark). “Copy HTML” and “Download .eml” are live.</p>';

    var card = modal.querySelector('.modal-card');
    card.style.setProperty('--a', cfg.accent);
    modal.hidden = false;
    document.getElementById('m-to').focus();

    document.getElementById('m-send').addEventListener('click', function () { doSend(cfg); });
    document.getElementById('m-to').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') doSend(cfg);
    });
    document.getElementById('m-copy').addEventListener('click', function () { copyHtml(cfg); });
    document.getElementById('m-eml').addEventListener('click', function () { downloadEml(cfg); });
  }

  function doSend(cfg) {
    var to = (document.getElementById('m-to').value || '').trim();
    var err = document.getElementById('m-err');
    if (!EMAIL_RE.test(to)) {
      err.textContent = 'Enter a valid email address to preview the send.';
      document.getElementById('m-to').focus();
      return;
    }
    err.textContent = '';
    var btn = document.getElementById('m-send');
    btn.disabled = true;
    btn.innerHTML = '<span class="spin"></span> Sending…';
    setTimeout(function () {
      body.innerHTML =
        '<div class="m-success">' +
          '<div class="m-check">✓</div>' +
          '<h3>Delivered to ' + esc(to) + '</h3>' +
          '<p>The <b>' + esc(cfg.name) + '</b> email would now be in the inbox. This is a front-end demo — wire the rendered HTML to your ESP to make it live.</p>' +
          '<div class="m-actions" style="justify-content:center;margin-top:22px">' +
            '<button class="btn btn-primary" id="m-again">Send another</button>' +
            '<button class="btn btn-ghost" data-close>Done</button>' +
          '</div>' +
        '</div>';
      modal.querySelector('[data-close]').addEventListener('click', closeModal);
      document.getElementById('m-again').addEventListener('click', function () { openModal(cfg); });
    }, 1150);
  }

  function fetchEmail(cfg) {
    return fetch('dist/' + cfg.slug + '/email.html').then(function (r) { return r.text(); });
  }

  function copyHtml(cfg) {
    fetchEmail(cfg).then(function (html) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(html).then(function () { toast('Email HTML copied to clipboard'); });
      }
      var ta = document.createElement('textarea');
      ta.value = html; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Email HTML copied to clipboard'); }
      finally { document.body.removeChild(ta); }
    }).catch(function () { toast('Could not read the email HTML'); });
  }

  function downloadEml(cfg) {
    fetchEmail(cfg).then(function (html) {
      var to = (document.getElementById('m-to') || {}).value || 'you@example.com';
      var eml = 'From: ' + cfg.from + '\r\nTo: ' + to + '\r\nSubject: ' + cfg.subject +
        '\r\nMIME-Version: 1.0\r\nContent-Type: text/html; charset=utf-8\r\n\r\n' + html;
      var blob = new Blob([eml], { type: 'message/rfc822' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = cfg.slug + '.eml';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      toast('Downloaded ' + cfg.slug + '.eml');
    }).catch(function () { toast('Could not build the .eml'); });
  }

  /* ---------------- toast ---------------- */
  var toastEl = document.getElementById('toast');
  var toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastT);
    toastT = setTimeout(function () {
      toastEl.classList.remove('show');
      setTimeout(function () { toastEl.hidden = true; }, 220);
    }, 2400);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
