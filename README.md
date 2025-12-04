# StoicProject (fixed)

This is a small static site + tiny interactive Stoic Game.

## Files
- `index.html` — home page
- `game.html` — simple interactive Stoic game
- `Style.css` — styling
- `Stoic.js` — game logic (no frameworks)
- `assets/` — images used in the site

## How to publish on GitHub
1. Create a GitHub repository and push these files (root of repo).
2. (Optional) To use GitHub Pages:
   - Go to repo Settings → Pages (or "Pages" in sidebar),
   - Choose `main` (or `gh-pages`) branch and `/(root)` folder → Save.
   - The site will be published at `https://<your-username>.github.io/<repo-name>/` within minutes.

## Quick local preview
Open `index.html` in a browser. For a server preview you can run:
```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
