// ==UserScript==
// @name         Kick.com Username Spoofer + Verified Badge + All Fields
// @namespace    http://tampermonkey.net/
// @version      2.0.0
// @description  Spoof only your configured Kick.com username, verified badge, About section, description, and username input (outerHTML spoof)
// @match        *://kick.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const get = k => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } };
  const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const KEYS = {
    enabled: 'kick_enabled',
    realUser: 'kick_real_user',
    fakeUser: 'kick_fake_user',
    enFakeUser: 'kick_en_fake_user',
    enBadge: 'kick_en_badge'
  };

  const state = {
    enabled: get(KEYS.enabled) || false,
    realUser: get(KEYS.realUser) || '',
    fakeUser: get(KEYS.fakeUser) || '',
    enFakeUser: get(KEYS.enFakeUser) || false,
    enBadge: get(KEYS.enBadge) || false
  };

  // ✅ Full Kick verified badge SVG (intact)
  const VERIFIED_SVG_HTML = `
<svg class="kick-badge shrink-0" width="20" height="20" viewBox="0 0 32 32" fill="none"
     xmlns="http://www.w3.org/2000/svg" style="margin-left:0px; vertical-align:middle;">
  <g clip-path="url(#clip0_614_6275)">
    <path d="M30.8598 19.2368C30.1977 18.2069 29.5356 17.2138 28.8736 16.1839C28.7264 15.9632 28.7264 15.8161 28.8736 15.5954C29.5356 14.6023 30.1609 13.6092 30.823 12.6161C31.5954 11.4391 31.1908 10.2989 29.8667 9.82069C28.7632 9.41609 27.6598 8.97471 26.5563 8.57012C26.3356 8.49656 26.2253 8.34943 26.2253 8.09196C26.1885 6.87816 26.1149 5.66437 26.0414 4.48736C25.9678 3.2 24.9747 2.46437 23.7241 2.7954C22.5471 3.08966 21.3701 3.42069 20.2299 3.75173C19.9724 3.82529 19.8253 3.75173 19.6414 3.56782C18.9057 2.61149 18.1333 1.69195 17.3977 0.772414C16.5885 -0.257472 15.3379 -0.257472 14.492 0.772414C13.7563 1.69195 12.9839 2.61149 12.2851 3.53103C12.1012 3.7885 11.9172 3.82529 11.623 3.75173C10.4828 3.42069 9.34253 3.12644 8.53334 2.90575C6.95173 2.53793 5.99541 3.16322 5.92184 4.48736C5.84828 5.70115 5.77472 6.91495 5.73794 8.16552C5.73794 8.42299 5.62759 8.53333 5.4069 8.64368C4.26667 9.08506 3.12644 9.52644 1.98621 9.96782C0.809203 10.446 0.441387 11.5862 1.14023 12.6529C1.8023 13.6828 2.46437 14.6759 3.12644 15.7057C3.27356 15.9264 3.27356 16.0736 3.12644 16.331C2.42759 17.3609 1.76552 18.3908 1.10345 19.4575C0.478165 20.4506 0.882759 21.6276 1.98621 22.069C3.12644 22.5104 4.30345 22.9517 5.44368 23.3931C5.70115 23.4667 5.77471 23.6138 5.77471 23.8713C5.81149 25.0483 5.95862 26.1885 5.95862 27.3655C5.95862 28.5425 6.9885 29.6092 8.42298 29.1678C9.56321 28.8 10.7034 28.5425 11.8437 28.2115C12.0644 28.1379 12.2115 28.1747 12.3586 28.3954C13.131 29.3517 13.8667 30.2713 14.6391 31.2276C15.485 32.2575 16.6988 32.2575 17.508 31.2276C18.2805 30.2713 19.0161 29.3517 19.7885 28.3954C19.9356 28.2115 20.046 28.1379 20.3034 28.2115C21.4804 28.5425 22.6575 28.8368 23.8345 29.1678C25.0483 29.4988 26.0781 28.7632 26.1149 27.5126C26.1885 26.2989 26.2621 25.0851 26.2988 23.8345C26.2988 23.5402 26.446 23.4299 26.6667 23.3563C27.7701 22.9517 28.9103 22.5104 30.0138 22.069C31.1908 21.4805 31.5586 20.3034 30.8598 19.2368ZM22.069 13.2046L14.7127 20.5609C14.5287 20.7448 14.2713 20.892 14.0138 20.9287C13.9402 20.9287 13.8299 20.9655 13.7563 20.9655C13.4253 20.9655 13.0575 20.8184 12.8 20.5609L9.78392 17.5448C9.26898 17.0299 9.26898 16.1839 9.78392 15.669C10.2989 15.154 11.1448 15.154 11.6598 15.669L13.7196 17.7287L20.1196 11.3287C20.6345 10.8138 21.4805 10.8138 21.9954 11.3287C22.5839 11.8437 22.5839 12.6897 22.069 13.2046Z"
          fill="url(#paint0_linear_614_6275)"></path>
  </g>
  <defs>
    <linearGradient id="paint0_linear_614_6275" x1="8.14138" y1="32.3591" x2="24.4968" y2="0.904884" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1EFF00"></stop>
      <stop offset="0.99" stop-color="#00FF8C"></stop>
    </linearGradient>
    <clipPath id="clip0_614_6275"><rect width="32" height="32" fill="white"></rect></clipPath>
  </defs>
</svg>`;

  function createNodeFromHTML(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  // --- Core spoof logic ---
  function spoofUsername() {
    if (!state.realUser) return;
    const targetName = (state.enFakeUser && state.fakeUser) ? state.fakeUser : state.realUser;

    // Profile card
    document.querySelectorAll('div.text-base.font-semibold').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (state.enabled && txt.toLowerCase() === state.realUser.toLowerCase()) {
        if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
        el.textContent = targetName;
      } else if (!state.enabled && el.dataset.originalText) {
        el.textContent = el.dataset.originalText;
      }
    });

    // Status header
    document.querySelectorAll('h2.text-white.text-base.lg\\:text-2xl.font-bold').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt.toLowerCase().startsWith(state.realUser.toLowerCase())) {
        if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
        if (state.enabled) {
          const suffix = txt.substring(state.realUser.length);
          el.textContent = targetName + suffix;
        } else {
          el.textContent = el.dataset.originalText;
        }
      }
    });

    // Channel username button
    document.querySelectorAll('button > h1#channel-username').forEach(h1 => {
      const btn = h1.closest('button'); if (!btn) return;
      const txt = (h1.textContent || '').trim();
      if (txt.toLowerCase() !== state.realUser.toLowerCase() && txt.toLowerCase() !== state.fakeUser.toLowerCase()) return;

      if (!state.enabled) {
        if (h1.dataset.originalText) h1.textContent = h1.dataset.originalText;
        const old = btn.querySelector('svg.kick-badge'); if (old) old.remove();
        return;
      }
      if (!h1.dataset.originalText) h1.dataset.originalText = h1.textContent;
      h1.textContent = targetName;

      const existing = btn.querySelector('svg.kick-badge');
      if (state.enBadge) {
        if (!existing) h1.insertAdjacentElement('afterend', createNodeFromHTML(VERIFIED_SVG_HTML));
      } else if (existing) {
        existing.remove();
      }
    });

    // About section: "About <user>"
    document.querySelectorAll('div.flex.items-center.gap-1.font-bold.leading-\\[1\\.2\\].text-white').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt.toLowerCase() === `about ${state.realUser.toLowerCase()}`) {
        if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
        el.textContent = `About ${targetName}`;
      } else if (!state.enabled && el.dataset.originalText) {
        el.textContent = el.dataset.originalText;
      }
    });

    // Channel description: "<user>'s Kick Channel"
    document.querySelectorAll('p.hyphens-auto.text-sm.font-normal.text-white').forEach(el => {
      const txt = (el.textContent || '').trim();
      if (txt.toLowerCase() === `${state.realUser.toLowerCase()}'s kick channel`) {
        if (!el.dataset.originalText) el.dataset.originalText = el.textContent;
        el.textContent = `${targetName}'s Kick Channel`;
      } else if (!state.enabled && el.dataset.originalText) {
        el.textContent = el.dataset.originalText;
      }
    });

    // Username input field (outerHTML spoof)
    document.querySelectorAll('input[name="username"]').forEach(el => {
      const val = (el.value || '').trim();
      if (val.toLowerCase() === state.realUser.toLowerCase()) {
        if (!el.dataset.originalOuterHTML) el.dataset.originalOuterHTML = el.outerHTML;
        if (state.enabled) {
          const spoofed = el.cloneNode(true);
          spoofed.value = targetName;
          spoofed.setAttribute('value', targetName);
          el.replaceWith(spoofed);
        } else if (el.dataset.originalOuterHTML) {
          el.outerHTML = el.dataset.originalOuterHTML;
        }
      }
    });
  }

  // Observer
  let scheduled = false;
  const mo = new MutationObserver(() => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; spoofUsername(); });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Hotkeys
  window.addEventListener('keydown', e => {
    if (e.shiftKey && e.key.toLowerCase() === 's') { e.preventDefault(); openGUI(); }
    if (e.shiftKey && e.key.toLowerCase() === 'u') {
      e.preventDefault(); state.enabled = !state.enabled; set(KEYS.enabled, state.enabled); spoofUsername();
    }
  });

  // GUI
  function closeGUI() { const b = document.getElementById('kick-backdrop'); if (b) b.remove(); }
  function openGUI() {
    closeGUI();
    const backdrop = document.createElement('div');
    backdrop.id = 'kick-backdrop';
    Object.assign(backdrop.style, {position:'fixed',inset:'0',background:'rgba(0,0,0,.5)',zIndex:2147483647,display:'flex',alignItems:'center',justifyContent:'center'});
    const modal = document.createElement('div');
    Object.assign(modal.style, {background:'#0f0f0f',color:'#eaeaea',width:'min(420px,90vw)',borderRadius:'12px',boxShadow:'0 12px 32px rgba(0,0,0,.45)',padding:'16px',fontFamily:'system-ui'});
    modal.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div style="font-weight:700;font-size:18px;">Kick Spoofer</div>
        <button id="kick-close" style="background:transparent;border:none;color:#eaeaea;font-size:18px;cursor:pointer;">✕</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <label><input id="kick-enabled" type="checkbox"> Enabled (Shift+U)</label>
        <div><div style="font-size:12px;margin-bottom:6px;opacity:.8;">Real username</div>
          <input id="kick-real-user" type="text" placeholder="yourusername"
            style="width:100%;background:#1a1a1a;color:#eaeaea;border:1px solid #2a2a2a;border-radius:8px;padding:10px;">
        </div>
        <div>
          <label><input id="kick-en-fake" type="checkbox"> Fake username</label>
          <input id="kick-fake-user" type="text" placeholder="fakeusername"
            style="width:100%;background:#1a1a1a;color:#eaeaea;border:1px solid #2a2a2a;border-radius:8px;padding:10px;margin-top:6px;">
        </div>
        <div><label><input id="kick-en-badge" type="checkbox"> Verified badge</label></div>
        <div id="kick-error" style="color:#ff6b6b;font-size:12px;height:16px;"></div>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:6px;">
          <button id="kick-cancel" style="background:#1f1f1f;border:1px solid #2a2a2a;color:#eaeaea;border-radius:8px;padding:10px 14px;cursor:pointer;">Cancel</button>
          <button id="kick-save" style="background:#2b8a3e;border:0;color:white;border-radius:8px;padding:10px 14px;cursor:pointer;">Save</button>
        </div>
      </div>`;
    backdrop.appendChild(modal); document.body.appendChild(backdrop);

    const $ = sel => modal.querySelector(sel);
    $('#kick-enabled').checked = !!state.enabled;
    $('#kick-real-user').value = state.realUser || '';
    $('#kick-fake-user').value = state.fakeUser || '';
    $('#kick-en-fake').checked = !!state.enFakeUser;
    $('#kick-en-badge').checked = !!state.enBadge;

    $('#kick-close').onclick = closeGUI;
    $('#kick-cancel').onclick = closeGUI;
    $('#kick-save').onclick = () => {
      try {
        state.enabled = $('#kick-enabled').checked; set(KEYS.enabled, state.enabled);
        state.realUser = $('#kick-real-user').value.trim(); set(KEYS.realUser, state.realUser);
        state.fakeUser = $('#kick-fake-user').value.trim(); set(KEYS.fakeUser, state.fakeUser);
        state.enFakeUser = $('#kick-en-fake').checked; set(KEYS.enFakeUser, state.enFakeUser);
        state.enBadge = $('#kick-en-badge').checked; set(KEYS.enBadge, state.enBadge);
        closeGUI(); spoofUsername();
      } catch (err) {
        $('#kick-error').textContent = 'Error saving settings';
      }
    };
  }

  spoofUsername();
})();
