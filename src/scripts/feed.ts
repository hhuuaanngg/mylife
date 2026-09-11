const LOAD_AHEAD = 720;

type Hydrate = (posts: HTMLElement[]) => void;

function nearBottom(el: Element) {
	return el.getBoundingClientRect().top < (window.innerHeight || 0) + LOAD_AHEAD;
}

export function setupInfiniteFeed(hydrate: Hydrate) {
	const feed = document.querySelector<HTMLElement>('[data-feed]');
	const sentinel = document.querySelector<HTMLElement>('[data-infinite]');
	if (!feed || !sentinel) return;

	const status = sentinel.querySelector<HTMLElement>('[data-infinite-status]');
	const bar = sentinel.querySelector<HTMLElement>('.feed-sentinel-bar');
	let next = sentinel.dataset.next || '';
	let loading = false;

	const setState = (state: 'idle' | 'loading' | 'error' | 'done', message = '') => {
		sentinel.dataset.state = state;
		if (status) {
			status.hidden = !message;
			status.textContent = message;
		}
		if (bar) bar.hidden = state !== 'loading';
	};

	const finish = () => {
		next = '';
		sentinel.dataset.next = '';
		setState('done');
		observer.disconnect();
	};

	const loadMore = async () => {
		if (loading || !next) return;
		loading = true;
		setState('loading', '加载中…');
		const url = next;

		try {
			const response = await fetch(url, { headers: { Accept: 'text/html' } });
			if (!response.ok) throw new Error(String(response.status));
			const html = await response.text();
			const doc = new DOMParser().parseFromString(html, 'text/html');
			const chunk = doc.querySelector('.feed-chunk') ?? doc.querySelector('[data-feed]');
			const incoming = [...(chunk?.querySelectorAll<HTMLElement>(':scope > .post') ?? [])];
			const added: HTMLElement[] = [];

			for (const post of incoming) {
				const id = post.id;
				if (id && feed.querySelector(`#${CSS.escape(id)}`)) continue;
				const node = document.importNode(post, true);
				feed.appendChild(node);
				added.push(node);
			}

			next = chunk?.getAttribute('data-next') || '';
			sentinel.dataset.next = next;
			if (added.length) hydrate(added);

			if (!next) finish();
			else setState('idle');
			loading = false;
			if (next && nearBottom(sentinel)) void loadMore();
		} catch {
			loading = false;
			setState('error', '加载失败，点击重试');
		}
	};

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries.some((entry) => entry.isIntersecting)) void loadMore();
		},
		{ rootMargin: `${LOAD_AHEAD}px 0px`, threshold: 0 },
	);

	sentinel.addEventListener('click', () => {
		if (sentinel.dataset.state === 'error') void loadMore();
	});

	observer.observe(sentinel);
	if (nearBottom(sentinel)) void loadMore();
}
