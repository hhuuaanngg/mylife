const VISIBLE_CONCURRENCY = 4;
const REST_CONCURRENCY = 2;
const VIEWPORT_MARGIN = 8;

const inflight = new WeakMap<HTMLImageElement, Promise<void>>();

function isInViewport(el: Element, margin = VIEWPORT_MARGIN): boolean {
	const rect = el.getBoundingClientRect();
	const vh = window.innerHeight || document.documentElement.clientHeight;
	const vw = window.innerWidth || document.documentElement.clientWidth;
	return rect.bottom > -margin && rect.top < vh + margin && rect.right > -margin && rect.left < vw + margin;
}

function markLoaded(img: HTMLImageElement) {
	img.dataset.loaded = '1';
	delete img.dataset.loading;
	img.classList.add('is-ready');
	const host = img.closest('.photo-cell, .article-photo');
	if (!host) return;
	host.classList.remove('is-waiting');
	host.classList.add('is-loaded');
	host.removeAttribute('aria-busy');
}

function loadOne(img: HTMLImageElement, priority: 'high' | 'low' = 'low'): Promise<void> {
	const existing = inflight.get(img);
	if (existing) return existing;
	if (img.dataset.loaded === '1') return Promise.resolve();

	const url = img.dataset.src;
	if (!url) {
		markLoaded(img);
		return Promise.resolve();
	}

	const task = new Promise<void>((resolve) => {
		let settled = false;
		img.dataset.loading = '1';
		img.fetchPriority = priority;
		img.decoding = 'async';

		const finish = () => {
			if (settled) return;
			settled = true;
			window.clearTimeout(timer);
			img.removeEventListener('load', onLoad);
			img.removeEventListener('error', onError);
			void (async () => {
				try {
					if (typeof img.decode === 'function' && img.naturalWidth > 0) {
						await img.decode();
					}
				} catch {
					/* decode can reject on error; still drop the skeleton */
				}
				markLoaded(img);
				resolve();
			})();
		};

		const onLoad = () => finish();
		const onError = () => finish();
		const timer = window.setTimeout(finish, 20000);

		img.addEventListener('load', onLoad);
		img.addEventListener('error', onError);
		img.src = url;
		if (img.complete && img.naturalWidth > 0) finish();
	});

	inflight.set(img, task);
	return task;
}

async function runPool(items: HTMLImageElement[], concurrency: number, priority: 'high' | 'low'): Promise<void> {
	const queue = items.filter((img) => img.dataset.loaded !== '1');
	let cursor = 0;
	const workerCount = Math.min(concurrency, queue.length) || 0;
	await Promise.all(
		Array.from({ length: workerCount }, async () => {
			while (cursor < queue.length) {
				const img = queue[cursor++];
				if (!img) break;
				await loadOne(img, priority);
			}
		}),
	);
}

export function setupLazyImages() {
	const all = [...document.querySelectorAll<HTMLImageElement>('img.lazy-img[data-src]')];
	if (!all.length) return;

	const start = () => boot(all);
	requestAnimationFrame(start);
}

function boot(all: HTMLImageElement[]) {
	const visible = all.filter((img) => isInViewport(img.closest('.photo-cell, .article-photo') ?? img));
	const rest = all.filter((img) => !visible.includes(img));
	const pending = new Set(rest);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const host = entry.target;
				const img =
					host instanceof HTMLImageElement
						? host
						: host.querySelector<HTMLImageElement>('img.lazy-img[data-src]');
				if (!img) continue;
				pending.delete(img);
				observer.unobserve(host);
				void loadOne(img, 'high');
			}
		},
		{ rootMargin: '0px', threshold: 0.01 },
	);

	for (const img of rest) {
		observer.observe(img.closest('.photo-cell, .article-photo') ?? img);
	}

	void (async () => {
		await runPool(visible, VISIBLE_CONCURRENCY, 'high');
		const leftover = [...pending].filter((img) => img.dataset.loaded !== '1' && img.dataset.loading !== '1');
		await runPool(leftover, REST_CONCURRENCY, 'low');
		observer.disconnect();
		const stragglers = all.filter((img) => img.dataset.loaded !== '1');
		await runPool(stragglers, REST_CONCURRENCY, 'low');
	})();
}
