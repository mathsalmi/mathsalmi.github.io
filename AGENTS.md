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
- The Google Fonts `<link>` must be identical in `index.html` and `404.html`.

## Conventions

- **American English** in all content and comments.
- Indent with tabs. HTML is formatted by hand (format-on-save is off for HTML).
- **Keep JavaScript to a minimum.** Do not add new JS; prefer HTML/CSS. `assets/site.js` is an ES module (`<script type="module">`) using modern syntax, and the site must stay fully usable without it.
- Theme: CSS follows `prefers-color-scheme`; the toggle only sets `data-theme` for the current page view (nothing is persisted).
- Photo: Gravatar only, `alt=""` (decorative). No local fallback.
- Third parties are limited to Google Fonts and Gravatar. Do not add others.

## Accessibility

- Decorative images and icons: `alt=""` or `aria-hidden="true"`.
- Visual separators (`·`) are wrapped in `<span aria-hidden="true">`.
- Links with `target="_blank"` get `rel="noopener"` and a `<span class="sr-only">(opens in new tab)</span>`.
- Lists styled with `list-style: none` keep `role="list"` (Safari drops list semantics otherwise).
- Icon-only buttons get a `.sr-only` text name.
- Respect `prefers-reduced-motion` for every animation.

## Before committing

- Re-check the sync lists above for anything you touched.
- Print preview (`@media print`) must still fit on one A4 page.
- Sanity-check in a text browser: `lynx -display_charset=utf-8 http://localhost:8000`.
- Serve locally with `python3 -m http.server` (ES modules don't run from `file://`).
