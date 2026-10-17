# AGENTS.md

Rules for AI agents (and humans) working on msalmi.com.

## What this repo is

- Static personal site served by **GitHub Pages** from `master`, custom domain in `CNAME` (msalmi.com).
- **No build step, no dependencies, no framework.** Files are served exactly as committed.
- `.nojekyll` is present, so **every committed file is public**, including dotfiles and this file. Never commit secrets, drafts or private notes.
- `TODO.md` is local only (listed in `.git/info/exclude`). Never commit it.
- Editor and OS files (`.DS_Store`, `.vscode/`, `node_modules/`) are in `.gitignore`. Keep it that way.

## Keep content in sync

The same facts are repeated across many files. When one changes, update **all** of the places listed, in the same commit.

### Name, title, employer, location
- `index.html`: `<title>`, `meta description`, `og:title`, `og:description`, `og:image:alt`, `twitter:title`, `twitter:description`, JSON-LD (`jobTitle`, `worksFor`, `homeLocation`), `.role`
- `404.html`: `<title>`
- `cv.md` header, and `cv.pdf`
- `llms.txt` and `llms-full.txt` (summary paragraph)
- `matheus.vcf` (`TITLE`, `ADR`)
- `og.png` (the image text; regenerate it)

### Tagline ("I design systems end to end: …")
- `index.html`: `meta description`, `og:description`, `twitter:description`, `.tagline`
- `cv.md`, `cv.pdf`, `llms.txt`, `llms-full.txt`, `matheus.vcf` (`NOTE`, with commas escaped as `\,`)

### Email and profile links (LinkedIn, GitHub, 500px, CV)
- `index.html`: contact `<nav>` links, the `.print-only` address line, JSON-LD `sameAs`
- `404.html`: links (CV, broken-link email)
- `llms.txt`, `llms-full.txt`, `matheus.vcf`
- `cv.md` and `cv.pdf`: email, site, LinkedIn and GitHub only. 500px (photography) is intentionally left out of the CV.
- `.well-known/security.txt` (`Contact`)

### The three blocks (engineering, business, ai)
- `index.html` `.own-grid`, and the matching bullets in `llms.txt` and `llms-full.txt`

### CV
- `cv.md` is the source. `cv.pdf` must say the same thing; regenerate it whenever `cv.md` changes.
- `cv.pdf` is printed from an HTML layout with Chromium; that HTML is not in this repo.
- `llms-full.txt` = `llms.txt` + `---` + the body of `cv.md` (from `## Experience` on). Keep both halves identical to their sources.

### Pages and dates
- New public page or file meant for crawlers: add it to `sitemap.xml`.
- Content change on a listed URL: bump its `<lastmod>` in `sitemap.xml`.
- `.well-known/security.txt` `Expires` must stay in the future (renew yearly).

### Colors and fonts
- Palette lives in `assets/site.css` `:root`. Hex values are also hard-coded in: `meta theme-color` (`index.html`, `404.html`), `assets/site.js` (theme-color update), `favicon.svg`, `assets/logo.svg` (fallbacks), `favicon-32.png`, `apple-touch-icon.png`, `og.png`.
- Fonts are self-hosted in `assets/fonts/` (`@font-face` in `assets/site.css`). The font `preload` links must be identical in `index.html` and `404.html`.

## Conventions

- **American English** in all content and comments.
- Indent with tabs. HTML is formatted by hand (format-on-save is off for HTML).
- **Keep JavaScript to a minimum.** Do not add new JS; prefer HTML/CSS. `assets/site.js` is an ES module (`<script type="module">`) using modern syntax, and the site must stay fully usable without it.
- Theme: CSS follows `prefers-color-scheme`; the toggle only sets `data-theme` for the current page view (nothing is persisted).
- Photo: Gravatar only, `alt=""` (decorative). No local fallback.
- The only third party is Gravatar. Do not add others (fonts are self-hosted on purpose).

## Accessibility

- Decorative images and icons: `alt=""` or `aria-hidden="true"`.
- Visual separators (`·`) are wrapped in `<span aria-hidden="true">`.
- Links with `target="_blank"` get `rel="noopener"` and a `<span class="sr-only">(opens in new tab)</span>`.
- Lists styled with `list-style: none` keep `role="list"` (Safari drops list semantics otherwise).
- Icon-only buttons get a `.sr-only` text name.
- Respect `prefers-reduced-motion` for every animation.

## Quality bar (every page, no exceptions)

Applies to every HTML page in the repo (today `index.html` and `404.html`) and to every new one. A page that misses any item is not done.

### Screens and inputs
- Works from **320 px to 4K**: phones (portrait and landscape), tablets (portrait and landscape), laptops, desktops and large monitors. No horizontal scroll at any width.
- Reflows at **200% and 400% zoom** (WCAG 1.4.10) and with **text-only zoom**; nothing clipped or overlapping.
- Usable with **mouse, touch and keyboard only**. Touch targets at least 44 × 44 px; hover is never the only way to reach anything.
- Fully usable **without JavaScript** and in a **text browser** (lynx).
- Respects `prefers-color-scheme`, `prefers-reduced-motion` and forced colors / Windows High Contrast.
- Print (`@media print`) stays clean and readable.

### Accessibility
- **WCAG 2.2 AA** at minimum: contrast (4.5:1 text, 3:1 large text, UI parts and focus rings), visible focus everywhere, logical heading order, one `<h1>`, landmarks (`header`, `main`, `nav`, `footer` where present), `lang` set, meaningful link text.
- Tested with a **screen reader**: VoiceOver on macOS and iOS at least (NVDA or TalkBack when available). Reading order matches the visual order; nothing decorative is announced; nothing important is hidden.
- **ARIA: native HTML first.** Use ARIA only when no element does the job, follow the WAI-ARIA Authoring Practices patterns, and never put a role or handler on a `div`/`span` that should be a `button` or `a`. No ARIA is better than wrong ARIA.

### Automated checks (all must pass, for every page)
- **Lighthouse** (mobile and desktop): 100 in Accessibility, Best Practices and SEO; Performance 95+.
- **W3C Nu HTML Checker** (validator.w3.org/nu): zero errors. **W3C CSS Validator** on `assets/site.css`: zero errors (modern properties the validator does not know yet are the only accepted warnings).
- **axe-core** (or pa11y with axe): zero violations, light and dark theme.
- **JSON-LD**: valid in the Schema.org validator and Google Rich Results Test.
- **Links**: no broken internal links; `sitemap.xml` lists every public page.

Tools run outside the repo (no dependencies are added here), for example:

```sh
python3 -m http.server 8000
npx lighthouse http://localhost:8000/ --preset=desktop
npx lighthouse http://localhost:8000/ --form-factor=mobile --screenEmulation.mobile
npx @axe-core/cli http://localhost:8000/ http://localhost:8000/404.html
npx vnu-jar index.html 404.html   # or paste into validator.w3.org/nu
```

## Before committing

- Re-check the sync lists above for anything you touched.
- Run the **Quality bar** checks above on every page you touched (and on all pages when CSS or JS changes).
- Print preview (`@media print`) must still fit on one A4 page.
- Sanity-check in a text browser: `lynx -display_charset=utf-8 http://localhost:8000`.
- Serve locally with `python3 -m http.server` (ES modules don't run from `file://`).
