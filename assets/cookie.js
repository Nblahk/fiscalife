(function () {
  var consentKey = 'fiscalife_cookie_consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(consentKey)); }
    catch (e) { return null; }
  }

  function setConsent(value) {
    localStorage.setItem(consentKey, JSON.stringify(value));
    document.getElementById('fiscalife-cookie-banner').style.display = 'none';
  }

  var bannerHTML = '<div id="fiscalife-cookie-banner" style="display:none;position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;background:#111827;color:#fff;border-radius:16px;padding:20px 24px;box-shadow:0 10px 30px rgba(0,0,0,.32);max-width:720px;margin:0 auto;">'
    + '<h3 style="margin:0 0 8px;font-size:15px;font-weight:800;color:#fff;">Gestion des cookies</h3>'
    + '<p style="margin:0;color:rgba(255,255,255,.82);font-size:13.5px;line-height:1.55;">Nous utilisons des cookies strictement n\u00e9cessaires au fonctionnement du site. Avec votre accord, nous pouvons \u00e9galement activer des contenus externes comme Google Maps.</p>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">'
    + '<button id="fc-accept" style="padding:9px 16px;border:none;border-radius:10px;cursor:pointer;font-weight:700;font-size:13.5px;background:linear-gradient(180deg,#38bdf8,#1ea7d7);color:#fff;">Tout accepter</button>'
    + '<button id="fc-reject" style="padding:9px 16px;border:1px solid rgba(255,255,255,.22);border-radius:10px;cursor:pointer;font-weight:700;font-size:13.5px;background:rgba(255,255,255,.10);color:#fff;">Tout refuser</button>'
    + '<button id="fc-customize" style="padding:9px 16px;border:1px solid rgba(255,255,255,.14);border-radius:10px;cursor:pointer;font-weight:700;font-size:13.5px;background:rgba(255,255,255,.06);color:rgba(255,255,255,.82);">Personnaliser</button>'
    + '</div>'
    + '<div id="fc-panel" style="display:none;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.14);">'
    + '<label style="display:block;margin-bottom:10px;color:rgba(255,255,255,.88);font-size:13.5px;cursor:default;">'
    + '<input type="checkbox" checked disabled style="margin-right:8px;accent-color:#1ea7d7;"> Cookies n\u00e9cessaires (toujours actifs)</label>'
    + '<label style="display:block;margin-bottom:12px;color:rgba(255,255,255,.88);font-size:13.5px;cursor:pointer;">'
    + '<input type="checkbox" id="fc-maps" style="margin-right:8px;accent-color:#1ea7d7;"> Google Maps / contenus externes</label>'
    + '<button id="fc-save" style="padding:9px 16px;border:none;border-radius:10px;cursor:pointer;font-weight:700;font-size:13.5px;background:linear-gradient(180deg,#38bdf8,#1ea7d7);color:#fff;">Enregistrer mes choix</button>'
    + '</div>'
    + '</div>';

  document.body.insertAdjacentHTML('beforeend', bannerHTML);

  document.getElementById('fc-accept').addEventListener('click', function () {
    setConsent({ necessary: true, maps: true, date: new Date().toISOString() });
  });

  document.getElementById('fc-reject').addEventListener('click', function () {
    setConsent({ necessary: true, maps: false, date: new Date().toISOString() });
  });

  document.getElementById('fc-customize').addEventListener('click', function () {
    var p = document.getElementById('fc-panel');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
  });

  document.getElementById('fc-save').addEventListener('click', function () {
    setConsent({
      necessary: true,
      maps: document.getElementById('fc-maps').checked,
      date: new Date().toISOString()
    });
  });

  // Lien "Gérer mes cookies" dans legal.html
  var openLink = document.getElementById('open-cookie-settings');
  if (openLink) {
    openLink.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('fiscalife-cookie-banner').style.display = 'block';
      document.getElementById('fc-panel').style.display = 'block';
    });
  }

  if (!getConsent()) {
    document.getElementById('fiscalife-cookie-banner').style.display = 'block';
  }
})();
