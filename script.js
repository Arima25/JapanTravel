function saveThemeLocalStorage(themeHref) {
  if (!themeHref) return;
  localStorage.setItem('themeSocial', themeHref);
}

function chargeThemeLocalStorage() {
  if (!theme) return;
  const themeLS = localStorage.getItem('themeSocial');
  if (themeLS) {
    theme.href = themeLS;
    if (themeLS.includes('light') && modeSelector) {
      themeDark = false;
      modeSelector.classList.add('mode--right');
    }
  }
}

// --- Simple search for featured destinations on the index page ---
function initFeaturedSearch() {
  const input = document.querySelector('#search-input');
  const btn = document.querySelector('#search-btn');
  if (!input) return; // nothing to do on pages without search

  const featureEls = Array.from(document.querySelectorAll('[data-city]'));

  function runSearch() {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      // show all if empty
      featureEls.forEach(el => el.classList.remove('hide'));
      return;
    }
    featureEls.forEach(el => {
      const city = (el.getAttribute('data-city') || '').toLowerCase();
      const matches = city.includes(q);
      el.classList.toggle('hide', !matches);
    });
  }

  // button click
  if (btn) btn.addEventListener('click', runSearch);
  // Enter key in input
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  });
}

// Initialize featured search on DOM ready
document.addEventListener('DOMContentLoaded', initFeaturedSearch);

// Robust Leaflet map initializer
(function initLeafletMap() {
  function createMap() {
    var mapDiv = document.getElementById('japanLeafletMap');
    if (!mapDiv) {
      console.log('[map] #japanLeafletMap not found in DOM.');
      return;
    }

    if (typeof L === 'undefined') {
      console.error('[map] Leaflet (L) is not loaded. Ensure the Leaflet script is included before this script or that scripts load correctly.');
      return;
    }

    try {
      var map = L.map('japanLeafletMap').setView([36, 138], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 8,
        minZoom: 4,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const regions = [
        ["Hokkaido", 43.2203, 142.8635, "https://www.youtube.com/watch?v=1zFy0MDIwB4"],
        ["Tohoku", 39.7197, 140.1025, "https://www.youtube.com/watch?v=bRimtN3sfzU"],
        ["Kanto", 36.2048, 138.2529, "https://www.youtube.com/watch?v=mu-0CoEPWqA"],
        ["Chubu", 37.4275, 137.1860, "https://www.youtube.com/watch?v=VKDmuUdUvzs"],
        ["Kansai", 34.9867, 135.7580, "https://www.youtube.com/watch?v=fyD1mwasLkA"],
        ["Chugoku", 34.6851, 133.8461, "https://www.youtube.com/watch?v=O4IvOmbXZtI"],
        ["Shikoku", 33.4429, 133.0490, "https://www.youtube.com/watch?v=LSYkcWxx5C4"],
        ["Kyushu", 32.3182, 130.7976, "https://www.youtube.com/watch?v=bRimtN3sfzU"],
        ["Okinawa", 26.2124, 127.6809, "https://www.youtube.com/watch?v=TwdU_CoUFR8"]
      ];

      regions.forEach(([name, lat, lng, url]) => {
        L.circleMarker([lat, lng], {
          radius: 14,
          color: '#B7262A',
          fillColor: '#aad2fa',
          fillOpacity: 0.9,
          weight: 3
        })
        .addTo(map)
        .bindTooltip(name, {permanent:true, offset:[0,-15], direction:"top", className:"japan-map-label"})
        .on("click", function(){
          window.open(url, '_blank');
        });
      });

      // If the map is inside hidden elements, it's sometimes necessary to invalidate size:
      if (typeof map.invalidateSize === 'function') map.invalidateSize();

      console.log('[map] Leaflet map initialized.');
    } catch (err) {
      console.error('[map] Error initializing Leaflet map:', err);
    }
  }

  // Try on DOMContentLoaded and as a fallback on window.load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createMap);
    window.addEventListener('load', createMap);
  } else {
    createMap();
  }
})();

/**
 * Fetches and displays the latest Japan travel news headlines.
 * Uses GNews API. Replace 'YOUR_API_KEY_HERE' with a valid API key.
 * Renders news cards inside #live-news-cards if present.
 */
function loadJapanTravelNews() {
  const newsContainer = document.getElementById('live-news-cards');
  if (!newsContainer) return;

  // Optionally, show a loading indicator
  newsContainer.innerHTML = '<div class="live-news-loading">Loading latest news...</div>';
  // --- News provider configuration ---
  const NEWS_PROVIDER = 'newsdata'; // alternatives could be 'gnews' or 'newsapi'
  // IMPORTANT: Put your Newsdata.io API key below as a string, e.g. 'pub_XXXXXXXXXXXX'
  const NEWS_API_KEY = 'YOUR_NEWS_API_KEY';

  if (!NEWS_API_KEY || NEWS_API_KEY === 'YOUR_NEWS_API_KEY') {
    newsContainer.innerHTML = '<div class="live-news-error">News API key not set. Add your Newsdata.io API key in script.js.</div>';
    console.warn('[news] NEWS_API_KEY missing — please add your Newsdata.io API key in script.js');
    return;
  }

  let url = '';
  if (NEWS_PROVIDER === 'newsdata') {
    // Query 'japan travel' and prefer Japanese/English sources
    url = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(NEWS_API_KEY)}&q=japan%20travel&language=en&page=1&country=jp`;
  } else {
    // fallback to theNewsAPI if provider changed
    url = `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API_KEY}&search=japan%20travel&language=en&limit=6`;
  }

  // Add a timeout so it won't stay stuck on "Loading" forever
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  fetch(url, { signal: controller.signal })
    .then(res => {
      clearTimeout(timeoutId);
      if (!res.ok) {
        throw new Error(`Network response not ok (${res.status})`);
      }
      return res.json();
    })
    .then(data => {
      console.log('[news] raw response:', data);
      // Try common response shapes across providers
      const articles = Array.isArray(data.articles)
        ? data.articles
        : Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.results)
        ? data.results
        : [];

      if (!articles.length) {
        newsContainer.innerHTML = '<div class="live-news-empty">No recent news found.</div>';
        return;
      }

      const placeholder = 'asset/wuxia.png';
      // Newsdata.io returns results[] with fields like title, link, description, image_url
      const slice = articles.slice(0, 6); // show up to 6 items
      const html = slice.map(article => {
        const title = article.title || article.name || 'Untitled';
        const urlLink = article.link || article.url || article.source || '#';
        const desc = article.description || article.summary || article.content || '';

        // Prefer common image fields used by providers
        let imgSrc = article.image_url || article.image || article.thumbnail || '';
        const lower = (imgSrc || '').toLowerCase();
        // If image is missing or appears to be a generic placeholder or an external svg placeholder, use local fallback
        if (!imgSrc || lower.includes('placeholder') || (lower.endsWith('.svg') && !lower.includes('/asset/'))) {
          imgSrc = placeholder;
        }

        const imgTag = `<img src="${imgSrc}" alt="${title.replace(/"/g,'')}" loading="lazy">`;
        return `
          <div class="live-news-card">
            ${imgSrc ? imgTag : ''}
            <div>
              <a class="live-news-headline" href="${urlLink}" target="_blank" rel="noopener">${title}</a>
              <div class="live-news-summary">${desc}</div>
            </div>
          </div>
        `;
      }).join('');
      newsContainer.innerHTML = `<div class="live-news-container">${html}</div>`;
      showSnackbar('News updated');
    })
    .catch(err => {
      console.error('[news] fetch error:', err);
      const msg = err.name === 'AbortError' ? 'Request timed out.' : err.message;
      newsContainer.innerHTML = `<div class="live-news-error">Could not load news at this time. ${msg}</div>`;
      showSnackbar('Could not load news');
    });
}

// Optionally, call on DOMContentLoaded
document.addEventListener('DOMContentLoaded', loadJapanTravelNews);

// Simple snackbar helper (vanilla)
function showSnackbar(text, timeout = 2500) {
  let el = document.querySelector('.snackbar');
  if (!el) {
    el = document.createElement('div');
    el.className = 'snackbar';
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => el.classList.remove('show'), timeout);
}

