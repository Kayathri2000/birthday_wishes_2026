# For my Sunshine

A single-page, cinematic birthday universe built with HTML, CSS and vanilla JavaScript. It is fully static, needs no backend, and is ready for GitHub Pages.

The experience intentionally does **not** depend on photos. It tells the story through type, light, illustration and four tiny romantic games.

## The experience

1. The night sky
2. Before you were my Sunshine
3. The Sunshine section
4. Game 1: pop the heart balloons
5. A little love note
6. Game 2: blow out the birthday candles
7. Game 3: catch the Sunshine
8. Things I love about you
9. Game 4: find the hidden heart
10. The love letter
11. The big red button
12. The final wish

Every game is optional. The visitor can always scroll onward; finishing a game reveals a small celebration and a shortcut to the next part of the story.

## Preview locally

Open `index.html` directly in a browser, or run a tiny local server from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalise everything

Open `js/script.js`. The block marked `PERSONAL CONTENT` at the top contains every editable piece:

- names and nickname
- hero and section messages
- game copy, completion messages and balloon pop lines
- the floating "Sunshine" phrases
- the seven love notes
- the complete love letter
- the final wish sequence
- optional music and GIF paths

Change the text directly there. No build step is required.

## Photos

This version deliberately has no photo gallery or photo section. The site is complete without images.

The photos in `ref/` are not referenced by the page. They can stay as a private archive, or you can remove them without affecting the website.

## Music

The birthday piano track in `ref/music/` is already connected in `js/script.js`:

```js
music: {
  src: "ref/music/HAPPY%20BIRTHDAY%20TO%20YOU%20PIANO%20INSTRUMENTAL%20BEST%20HAPPY%20BITHDAY%20MUSIC%202021.mp3",
  volume: 0.55,
  autoplay: true
}
```

Music is on by default and attempts to start as soon as the page is ready. Browsers that block unmuted autoplay start it on the visitor's first tap, click, or keypress instead. Set `autoplay: false` if the music should start paused. The floating button shows play/pause state. If the file is missing, the control stays hidden.

To use a different track, place it in `ref/music/` and update `music.src`. A filename with spaces can be written directly or percent-encoded with `%20`.

## GIF (optional)

Add a small romantic GIF to `ref/gifs/`, then set its path in `js/script.js`:

```js
gif: {
  src: "ref/gifs/love.gif",
  alt: "A small animated romantic moment",
  caption: "a tiny piece of us"
}
```

It appears as a subtle detail beneath the little love note. Leaving `src` empty keeps the page clean with no broken assets.

## Structure

```text
/
├── index.html
├── favicon.svg
├── css/
│   └── style.css
├── js/
│   └── script.js
├── ref/
│   ├── gifs/
│   ├── music/
│   └── other/        (optional)
└── README.md
```

## Deploy to GitHub Pages

1. Create a GitHub repository and upload this folder's contents.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. GitHub will publish the site at `https://<username>.github.io/<repository>/`.

All paths are relative, so the site works from a project subpath as well as a custom domain.

## Built-in care

- Mobile-first layout with touch-friendly targets
- Mouse, touch and keyboard support for every game
- Semantic sections, status messages and visible focus styles
- `prefers-reduced-motion` support that still preserves gameplay
- Lightweight CSS illustrations and vanilla JavaScript only
- Graceful fallbacks for missing audio, GIFs and browsers without JavaScript animation APIs
- No backend, database, trackers or external libraries
- Google Fonts with local serif, sans-serif and cursive fallbacks
