/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button rotate when the visitor clicks it:
- First add the button to the page by following the "Next steps" in the README
*/
const btn = document.querySelector("button"); // Get the button from the page
// Detect clicks on the button (use addEventListener and guard for existence)
if (btn) {
  btn.addEventListener('click', () => {
    // The JS works in conjunction with the 'rotated' code in style.css
    btn.classList.toggle("rotated");
  });
}

// This is a single line JS comment
/*
This is a comment that can span multiple lines 
- use comments to make your own notes!
*/


const modeSelector = document.querySelector('.mode');
const theme = document.querySelector('#change-theme');
let themeDark = true;

eventsListener();

function eventsListener() {
  // Restore theme only if the theme link element exists
  if (theme) {
    document.addEventListener('DOMContentLoaded', () => {
      chargeThemeLocalStorage();
    });
  }
  // Attach mode toggle click only if the element exists
  if (modeSelector) {
    modeSelector.addEventListener('click', changeMode);
  }
}

function changeMode() {
  // Nothing to do if required elements are missing
  if (!theme || !modeSelector) return;
  if (themeDark) {
    theme.href = 'stylesheets/theme-light.css';
    modeSelector.classList.add('mode--right');
  }
  else {
    theme.href = 'stylesheets/theme-dark.css';
    modeSelector.classList.remove('mode--right');
  }
  saveThemeLocalStorage(theme.href);
  themeDark = !themeDark;
}

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


// Optional user-cards + search (only run when the template and container exist)
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const cardSearchInput = document.querySelector("[data-search]")

let users = []

if (cardSearchInput && userCardTemplate && userCardContainer) {
  cardSearchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
      const isVisible =
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
      user.element.classList.toggle("hide", !isVisible)
    })
  })

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
      users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        header.textContent = user.name
        body.textContent = user.email
        userCardContainer.append(card)
        return { name: user.name, email: user.email, element: card }
      })
    })
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
  const url = "https://api.thenewsapi.com/v1/news/top?api_token=7f7rfXcQTQT4ei37bw5JvDcAZPNxIKbz5NxBN429&search=japan%20travel&language=en&limit=6";
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Network response not ok (${res.status})`);
      }
      return res.json();
    })
    .then(data => {
      console.log('[news] raw response:', data);
      // TheNewsAPI may return articles under different keys; try common ones
      const articles = Array.isArray(data.articles)
        ? data.articles
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
      const html = articles.map(article => {
        // Prefer article.image, but guard against empty or common placeholder URLs
        let imgSrc = article.image || '';
        const lower = (imgSrc || '').toLowerCase();
        if (!imgSrc || lower.includes('placeholder') || lower.endsWith('.png') && lower.indexOf('asset/') === -1) {
          imgSrc = placeholder;
        }
        const imgTag = `<img src="${imgSrc}" alt="${(article.title||'News').replace(/"/g,'')}" loading="lazy">`;
        return `
          <div class="live-news-card">
            ${imgSrc ? imgTag : ''}
            <div>
              <a class="live-news-headline" href="${article.url || article.link || '#'}" target="_blank" rel="noopener">${article.title || article.name || 'Untitled'}</a>
              <div class="live-news-summary">${article.description || article.summary || ''}</div>
            </div>
          </div>
        `;
      }).join('');
      newsContainer.innerHTML = `<div class="live-news-container">${html}</div>`;
      showSnackbar('News updated');
    })
    .catch(err => {
      console.error('[news] fetch error:', err);
      newsContainer.innerHTML = `<div class="live-news-error">Could not load news at this time. ${err.message}</div>`;
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

