/* Haitham Abdalhay — digital business card
   Share, copy link and save-contact feedback. No dependencies, no network calls. */
(function () {
  'use strict';

  // Always share the page the visitor is actually on (works on github.io and on a custom domain).
  var pageUrl = location.href.split('#')[0].split('?')[0];
  var shareData = {
    title: document.title,
    text: 'Haitham Abdalhay — Marketing Campaigns Manager at Above The Line',
    url: pageUrl
  };

  var toast = document.getElementById('toast');
  var toastText = toast ? toast.querySelector('span') : null;
  var timer;

  function say(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 2400);
  }

  function legacyCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(field);
    return ok;
  }

  function copyLink() {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(pageUrl).then(
        function () { say('Link copied'); },
        function () { fallbackCopy(); }
      );
    }
    fallbackCopy();
    return Promise.resolve();
  }

  function fallbackCopy() {
    if (legacyCopy(pageUrl)) { say('Link copied'); }
    else { window.prompt('Copy this link', pageUrl); }
  }

  function shareCard() {
    if (navigator.share) {
      return navigator.share(shareData).catch(function (err) {
        // AbortError = the visitor closed the share sheet; anything else falls back to copy.
        if (!err || err.name !== 'AbortError') { copyLink(); }
      });
    }
    return copyLink();
  }

  document.querySelectorAll('[data-share]').forEach(function (el) {
    el.addEventListener('click', shareCard);
  });
  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', copyLink);
  });

  // Save contact: downloads silently on Android, so confirm it started.
  var save = document.getElementById('save');
  if (save) {
    save.addEventListener('click', function () { say('Opening contact card…'); });
  }

  // In-app browsers (Instagram, Facebook, TikTok…) often block file downloads.
  var hint = document.getElementById('iab-hint');
  if (hint && /Instagram|FBAN|FBAV|FB_IAB|TikTok|Snapchat|MicroMessenger|Line\//i.test(navigator.userAgent)) {
    hint.hidden = false;
  }
})();
