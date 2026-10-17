# AGENTS.md

Rules for AI agents (and humans) working on msalmi.com.

## What this repo is

- Static personal site served by **GitHub Pages** from `main` (protected: no force-push, no deletion), custom domain in `CNAME` (msalmi.com).
- **No build step, no dependencies, no framework.** Files are served exactly as committed.
- `.nojekyll` is present, so **every committed file is public**, including dotfiles and this file. Never commit secrets, drafts or private notes.
- `TODO.md` is local only (listed in `.git/info/exclude`). Never commit it.
- Editor and OS files (`.DS_Store`, `.vscode/`, `node_modules/`) are in `.gitignore`. Keep it that way.

## Keep content in sync

The same facts are repeated across many files. When one changes, update **all** of the places listed, in the same commit.

### Name, title, employer, location

- `index.html`: `<title>`, `meta description`, `og:title`, `og:description`, `og:image:alt`, `twitter:title`, `twitter:description`, JSON-LD (`jobTitle`, `worksFor`, `homeLocation`), `.role`
- `404.html`: `<title>`
- `work/index.html`: the StartCHURCH chapter role, `meta description`
- `resume.md` header, and `resume.pdf`
- `llms.txt` and `llms-full.txt` (summary paragraph)
- `matheus.vcf` (`TITLE`, `ADR`)
- `og.png` (the image text; regenerate it)

### Tagline ("I design systems end to end: …")

- `index.html`: `meta description`, `og:description`, `twitter:description`, `.tagline`
- `resume.md`, `resume.pdf`, `llms.txt`, `llms-full.txt`, `matheus.vcf` (`NOTE`, with commas escaped as `\,`)

### Email and profile links (LinkedIn, GitHub, 500px, Résumé)

- `index.html`: the "Links" `<nav>`, the `<address class="print-only">` line, JSON-LD `sameAs`
- `work/index.html`: footer (LinkedIn, Résumé)
- `404.html`: links (Résumé, broken-link email)
- `llms.txt`, `llms-full.txt`, `matheus.vcf`
- `resume.md` and `resume.pdf`: email, site, LinkedIn and GitHub only. 500px (photography) is intentionally left out of the résumé.
- `.well-known/security.txt` (`Contact`)

### The three blocks (engineering, business, ai)

- `index.html` `.own-grid`, and the matching bullets in `llms.txt` and `llms-full.txt`
- Each block links to its group on `/work/` (`#engineering`, `#business`, `#ai`). The link text quotes a number from that group: keep them in sync.
- The block sentence is repeated as the group intro in `work/index.html` (Outcomes).

### /work (`work/index.html`)

- Timeline: every company (description, projects, what I did) and the studies; "On the side" lists freelance work.
- Outcomes are **anonymous**: no company, client or system names, percentages and rounded figures only, never $ or revenue amounts (an "8 figures" bracket is the only revenue mention). Keep the date line ("As of …") current and refresh the numbers every 3–6 months.
- No JavaScript: chapters are `<input type="radio">` inside each label, the panel is picked with `:has()`; the phone layout uses `<details>`. Keep it that way.
- Links into the page from elsewhere use `/work/` (trailing slash, as GitHub Pages serves it).

### Résumé

- Terminology (US audience): visible text says **Résumé** (with accents: it can't be read as the verb "resume"); URLs and file names say `resume` (no accents). Never "CV" or "curriculum vitae", which in the US means a long academic document.
- `resume.md` is the source. `resume.pdf` must say the same thing (A4); regenerate it whenever `resume.md` changes.
- `resume.pdf` is printed from an HTML layout with Chromium; that HTML is not in this repo.
- `llms-full.txt` = `llms.txt` + `---` + the body of `resume.md` (from `## Experience` on). Keep both halves identical to their sources.

### Pages and dates

- New public page or file meant for crawlers: add it to `sitemap.xml`.
- Content change on a listed URL: bump its `<lastmod>` in `sitemap.xml`.
- `.well-known/security.txt` `Expires` must stay in the future (renew yearly).

### Colors and fonts

- Palette lives in `assets/site.css` `:root`. Hex values are also hard-coded in: `meta theme-color` (`index.html`, `404.html`, `work/index.html`), `assets/site.js` (theme-color update), `favicon.svg`, `assets/logo.svg` (fallbacks), `favicon-32.png`, `apple-touch-icon.png`, `og.png`.
- Fonts are self-hosted in `assets/fonts/` (`@font-face` in `assets/site.css`). The font `preload` links must be identical in `index.html`, `404.html` and `work/index.html`.

## Conventions

- **American English** in all content and comments.
- **Prettier** formats HTML, CSS, JS, JSON, Markdown and YAML (`.prettierrc`, `.prettierignore`: an allowlist of extensions). JS has no semicolons.
- **Indent with tabs in every file**, comments included. Only where tabs are not allowed (YAML) use 4 spaces, never 2. `.editorconfig` sets this for editors.
- CI (`.github/workflows/format.yml`, free on a public repo) runs Prettier on every push to `main` and commits the result as `Auto format (Prettier)`. Run `git pull` after pushing, before the next commit.
- Prettier is never added to the repo: run it with `npx prettier@<version in format.yml> --write .`, ideally before committing.
- **Keep JavaScript to a minimum.** Do not add new JS; prefer HTML/CSS. `assets/site.js` is an ES module (`<script type="module">`) using modern syntax, and the site must stay fully usable without it.
- Theme: CSS follows `prefers-color-scheme` until the visitor uses the toggle; only then is the choice saved in `localStorage` (`theme`), and a tiny inline script in each page's `<head>` re-applies it before first paint (no flash between pages). Every new page needs that inline script.
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

Applies to every HTML page in the repo (today `index.html`, `404.html` and `work/index.html`) and to every new one. A page that misses any item is not done.

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
npx @axe-core/cli http://localhost:8000/ http://localhost:8000/work/ http://localhost:8000/404.html
npx vnu-jar index.html work/index.html 404.html   # or paste into validator.w3.org/nu
```

## Before committing

- Re-check the sync lists above for anything you touched.
- Run Prettier (see Conventions). It may reformat `resume.md`; `llms-full.txt` is not formatted, so copy the change into it by hand.
- Run the **Quality bar** checks above on every page you touched (and on all pages when CSS or JS changes).
- Print preview (`@media print`) must still fit on one A4 page.
- Sanity-check in a text browser: `lynx -display_charset=utf-8 http://localhost:8000`.
- Serve locally with `python3 -m http.server` (ES modules don't run from `file://`).
