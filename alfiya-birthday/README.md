# Alfiya's Little Birthday World 🌸

A romantic, page-by-page birthday website. This build contains **Page 1 —
The Entrance** and **Page 2 — The Birthday Reveal**, architected so Pages
3–11 can be added without rebuilding anything.

## How to run it

No build step, no server required for basic viewing:

1. Keep `index.html`, `style.css`, `script.js`, and the `assets/` folder
   together in this same folder.
2. Double-click `index.html` to open it in a browser, **or** for the most
   accurate preview (some browsers restrict local file access), serve it
   with a tiny local server, e.g.:
   ```
   npx serve .
   ```
   or, with Python installed:
   ```
   python3 -m http.server
   ```
   then open the printed `http://localhost` address.
3. Open it on your phone for the real experience — it's designed mobile
   first (tested down to 360px width) and also scales up for desktop.

## Where future assets go

- `assets/images/` — any photos or page-specific background images for
  later pages (e.g. Memories, Our Story).
- `assets/flowers/` — custom flower artwork (SVG/PNG), if you ever want
  to swap the current CSS/SVG flowers for hand-picked illustrations.
- `assets/music/` — the background track for the Music page (Page 9),
  e.g. `theme.mp3`.

Nothing in Pages 1–2 currently loads from these folders — they're just
staged for later.

## How Page 1 works

`index.html` has three fixed, full-screen **depth layers** behind the
content (background gradient → blurred glow blobs + soft flowers →
petals/sparkles + sharper foreground flowers), then a `<main id="pages">`
that holds one `<section class="page" data-page="N">` per page.

`style.css` is organized to match: tokens at the top, then one block per
depth layer, then the page system, then Page 1's content and CTA button.

`script.js` is split into small, reusable modules — **Ambience** (petals
+ sparkles, with a `burst()` flourish on tap), **Parallax** (a lightweight
eased pointer/touch-drag listener for the depth layers, skipped under
reduced motion), and **PageManager** (the shared fade + scale + glow
transition — `PageManager.goTo(n)` fades the current page out, flashes
the pink glow, then fades `data-page="n"` in).

## How Page 2 works

Page 2 (`.page--reveal`, `data-page="2"`) reuses everything above as-is
and adds its own accents scoped under that one class, so none of it
touches Page 1:

- **Content timeline** — `page2__pre` → `page2__line` → `page2__hero`
  ("Happy 19th Birthday") → `page2__subtitle` each fade/reveal in with
  staggered `animation-delay`s in `style.css`. Because a `.page` is
  `display:none` until `PageManager` makes it active, every delay is
  timed **relative to the moment the page becomes visible** — so it
  lines up right after the shared transition glow that already plays
  first, no JS timers needed.
- **`page2__glow`** — a soft gold radial glow that expands behind the
  text partway through the sequence, then settles into a gentle
  infinite pulse.
- **Flower bloom** — the same four corner flowers from the global depth
  layers get a one-time "bloom" pop (`Garden.bloomFlowers()` adds an
  `.is-blooming` class, which animates each flower's `<svg>` — not its
  wrapper — so it never fights the wrapper's own sway animation).
- **Local garden cluster** — `Garden.populateLocal()` spawns a small set
  of petals/sparkles into Page 2's own `.petals-layer`/`.sparkles-layer`
  containers (`#page2Petals` / `#page2Particles`), reusing the exact same
  `Ambience.populate()` + CSS classes the global layers use — no styles
  duplicated.
- **CTA** — Page 2's button is the *same* `.cta` markup/CSS as Page 1's;
  only its reveal/breathe/shimmer `animation-delay`s are pushed later
  (`.page--reveal .cta { ... }`) so it appears after the text settles.

`PageManager.goTo()` now also accepts an optional `onEnter` callback,
fired the instant the target page becomes visible — Page 1's button
passes `Garden.bloom` so the bloom/local-garden accents kick off exactly
in sync with Page 2's own CSS timeline.

## Exactly where to add Page 3 later

1. In `index.html`, replace the placeholder section:
   ```html
   <section class="page" data-page="3" id="page-3" aria-hidden="true">
     <!-- real Page 3 content goes here -->
   </section>
   ```
2. Give Page 3 its own CTA button (or auto-advance). It's already wired
   up at the bottom of `script.js` via `wireCta(page2Btn, 3)` — pass an
   `onEnter` callback there too if Page 3 needs its own entrance accent
   (the way Page 2 uses `Garden.bloom`):
   ```js
   wireCta(page2Btn, 3, YourPage3Module.onEnter);
   ```
3. Add a new `<section class="page" data-page="4">` for Page 4, and a
   `wireCta(page3Btn, 4, ...)` call, and so on through Page 11. No other
   part of the transition system needs to change — every page reuses the
   same fade + scale + glow.
4. If a page needs its own background styling (like the Page 3
   placeholder's gradient), scope it with `.page[data-page="N"] { ... }`
   in `style.css`, following the existing pattern.

## Animation system, in short

Everything that moves uses only `transform`, `opacity`, and `filter` —
no layout-triggering properties — and every animated rule is disabled
under `@media (prefers-reduced-motion: reduce)`. Petal/sparkle counts
are reduced automatically on small screens to keep things smooth on
older phones. Where an element ever needs two animations that would
otherwise both touch `transform` (e.g. a bloom pop *and* a sway), the
fix used throughout is to split them across a wrapper and its child
rather than layering both on one element — see the flower bloom above.
