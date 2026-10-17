/* msalmi.com — theme toggle, link underline, logo replay */

const doc = document;
const root = doc.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const darkQuery = matchMedia('(prefers-color-scheme: dark)');

root.classList.add('js');

/* ---------- Theme ---------- */

const btn = doc.getElementById('theme');

/* Choice made with the toggle (data-theme) wins; otherwise follow the OS.
   Saved in localStorage only when the visitor uses the toggle; the inline script in <head> re-applies it before first paint. */
const STORE = 'theme';

function currentTheme() {
	return root.getAttribute('data-theme') ?? (darkQuery.matches ? 'dark' : 'light');
}

function applyTheme(theme, pin) {
	const dark = theme === 'dark';

	/* Only an explicit choice pins data-theme; otherwise CSS follows the OS. */
	if (pin) {
		root.setAttribute('data-theme', theme);
	}

	if (btn) {
		btn.setAttribute('aria-pressed', String(dark));
	}

	doc.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
		meta.setAttribute('content', dark ? '#1E1C1A' : '#F5F4F0');
	});
}

applyTheme(currentTheme(), false);

btn?.addEventListener('click', () => {
	const next = currentTheme() === 'dark' ? 'light' : 'dark';
	applyTheme(next, true);
	try {
		localStorage.setItem(STORE, next);
	} catch (e) {
		/* storage blocked (private mode, policy): the choice lasts for this page only */
	}
});

darkQuery.addEventListener('change', (e) => {
	if (!root.hasAttribute('data-theme')) {
		applyTheme(e.matches ? 'dark' : 'light', false);
	}
});

/* ---------- Link underline: start width at a given letter ---------- */

function measureUnderlines() {
	doc.querySelectorAll('.tx[data-u]').forEach((el) => {
		const node = el.firstChild;
		const box = el.getBoundingClientRect();
		if (!node?.length || !box.width) {
			return;
		}

		const [index, fraction] = el.dataset.u.split(':').map(Number);
		const range = doc.createRange();
		range.setStart(node, index);
		range.setEnd(node, index + 1);

		const letter = range.getBoundingClientRect();
		const x = letter.left - box.left + letter.width * fraction;
		el.style.setProperty('--uw', `${(x / box.width * 100).toFixed(2)}%`);
	});
}

doc.fonts.ready.then(() => {
	measureUnderlines();
	addEventListener('resize', measureUnderlines);
});

/* ---------- Logo: inline /assets/logo.svg, replay on hover/click ---------- */

const tile = doc.getElementById('logo');
let cycling = false;
let t2, t3;

function logoAnimations(svg) {
	return svg.getAnimations({ subtree: true }).filter((a) => (a.animationName ?? '').startsWith('ms-'));
}

/* Play every logo animation from where it is now, forwards (1) or backwards (-1): reverses mid-flight without jumping. */
function play(svg, rate) {
	logoAnimations(svg).forEach((a) => {
		a.effect.updateTiming({ delay: 0 });
		const total = a.effect.getComputedTiming().duration;
		a.currentTime = Math.max(0, Math.min(a.currentTime ?? 0, total));
		a.playbackRate = rate;
		a.play();
	});
}

function cycle() {
	const svg = tile.querySelector('svg');
	if (reduced || cycling || !svg) {
		return;
	}
	cycling = true;
	clearTimeout(t2);
	clearTimeout(t3);
	play(svg, -1);
	t2 = setTimeout(() => play(svg, 1), 1600);
	t3 = setTimeout(() => { cycling = false; }, 2900);
}

/* The <img> works without JS; inlining lets the SVG use the page's --fg/--acc and react to the pointer.
   Scripts inside the SVG file don't run when imported this way, so the replay lives here. */
if (tile) {
	const img = tile.querySelector('img');
	fetch(img?.src ?? '/assets/logo.svg')
		.then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
		.then((text) => {
			const svg = new DOMParser().parseFromString(text, 'image/svg+xml').documentElement;
			if (svg?.nodeName !== 'svg') {
				return;
			}
			svg.querySelectorAll('script').forEach((s) => s.remove());
			svg.removeAttribute('role');
			svg.removeAttribute('aria-label');
			svg.setAttribute('aria-hidden', 'true');
			svg.setAttribute('focusable', 'false');
			tile.replaceChildren(doc.importNode(svg, true));
		})
		.catch(() => {});

	tile.addEventListener('click', cycle);
	tile.addEventListener('mouseenter', cycle);
}
