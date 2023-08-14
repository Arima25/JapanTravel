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
// Detect clicks on the button
if (btn) {
  btn.onclick = function() {
    // The JS works in conjunction with the 'rotated' code in style.css
    btn.classList.toggle("rotated");
  };
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
    document.addEventListener('DOMContentLoaded', () => {
        chargeThemeLocalStorage();
    })
    modeSelector.addEventListener('click', changeMode);
}

function changeMode() {
    if (themeDark) {
        theme.href = 'stylesheets/theme-light.css';
        modeSelector.classList.add('mode--right');
    }
    else {
        theme.href = 'stylesheets/theme-dark.css'
        modeSelector.classList.remove('mode--right');
    }
    saveThemeLocalStorage(theme.href);
    themeDark = !themeDark;
}

function saveThemeLocalStorage(theme) {
    localStorage.setItem('themeSocial', theme);
}

function chargeThemeLocalStorage() {
    const themeLS = localStorage.getItem('themeSocial');
    if (themeLS) {
        theme.href = themeLS;
        if (themeLS.includes('light')) {
            themeDark = false;
            modeSelector.classList.add('mode--right');
        };
    }
}


const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
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
