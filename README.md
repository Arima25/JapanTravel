# JapanTravel -- Currently under redevelopment for further improvement 

A small static site showcasing travel information about Japan. This project is a set of HTML pages, a central stylesheet (`style.css`) and a small `script.js` which adds some interactivity (search, simple UI behaviors).

## What is included

- `index.html` — Main landing page (featured destinations, search bar, gallery, footer).
- `style.css` — Global styles used by the site.
- `script.js` — Small client-side JavaScript (rotating button sample, theme helpers, and a featured search implementation).
- `subPages/` — Folder with additional pages: `culture.html`, `fashion.html`, `food.html`, `navigate.html`.

## How to open locally
There are two easy ways to view the site locally. Both work on Windows (PowerShell) and any OS.

1) Open the files directly (quickest):

```powershell
start 'c:\Users\Mewtw\Desktop\JapanTravel\index.html'
```

2) Run a minimal local web server (recommended — mirrors production behavior):

If you have Python 3 installed, from the project root run:

```powershell
cd 'c:\Users\Mewtw\Desktop\JapanTravel'
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Or with Node.js (if you prefer):

```powershell
cd 'c:\Users\Mewtw\Desktop\JapanTravel'
npx http-server -p 8000
# then open http://localhost:8000/index.html
```

## Search feature (how to use)
- The search bar on the main page filters the featured destinations (Tokyo, Kyoto, Hakone).
- Enter the city name (or partial) and press `Enter` or click `Search` to filter results.
- Clear the search box and press `Enter` to show all featured destinations again.

## Notes about file paths
- Files in `subPages/` reference the root `style.css` and `script.js` using relative paths (`../style.css` and `../script.js`) so they work both when opened directly and when served from a server.
- If you move files into subfolders, check and update paths accordingly.

## Troubleshooting
- If styles or JS aren't loading, open DevTools (F12) in your browser and check the Console and Network tabs for 404 or other errors.
- Common cause: incorrect relative paths (leading `/` points to the server root; use `../` to go up one folder when linking from `subPages/`).

## Suggested next steps
- Improve styling of the search bar (rounded input, icon, or live filtering with debounce).
- Expand search to gallery items, cards, or across pages.
- Add accessibility improvements: ARIA labels, focus states, and proper semantic elements.
- Replace inline styles with classes in `style.css` for consistency.

## Contributing
This is a simple static project. If you'd like help with changes, open an issue or send a PR with a short description of the change.

