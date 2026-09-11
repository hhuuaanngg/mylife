const LAYOUT_KEY = 'cike-photo-layout';
const LIKES_KEY = 'cike-likes';

type LayoutMode = 'grid' | 'waterfall';

function getLayout(): LayoutMode {
	const saved = localStorage.getItem(LAYOUT_KEY);
	return saved === 'grid' || saved === 'waterfall' ? saved : 'waterfall';
}

function applyLayout(mode: LayoutMode) {
	document.documentElement.dataset.photoLayout = mode;
	localStorage.setItem(LAYOUT_KEY, mode);
	document.querySelectorAll<HTMLButtonElement>('[data-layout-btn]').forEach((btn) => {
		btn.setAttribute('aria-pressed', String(btn.dataset.layoutBtn === mode));
	});
}

function setupLayoutSwitch() {
	applyLayout(getLayout());
	document.querySelectorAll<HTMLButtonElement>('[data-layout-btn]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const mode = btn.dataset.layoutBtn === 'grid' ? 'grid' : 'waterfall';
			applyLayout(mode);
		});
	});
}

function setupExpand() {
	document.querySelectorAll<HTMLElement>('[data-expand]').forEach((el) => {
		const btn = el.parentElement?.querySelector<HTMLButtonElement>('[data-more]');
		if (!btn) return;

		const overflowing = el.scrollHeight > el.clientHeight + 1;
		btn.hidden = !overflowing;

		btn.addEventListener('click', () => {
			const open = el.classList.toggle('is-open');
			btn.textContent = open ? '收起' : '更多';
		});
	});
}

function readLikes(): Set<string> {
	try {
		const raw = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]');
		return new Set(Array.isArray(raw) ? raw.map(String) : []);
	} catch {
		return new Set();
	}
}

function setupLikes() {
	const likes = readLikes();

	document.querySelectorAll<HTMLButtonElement>('[data-like]').forEach((btn) => {
		const id = btn.dataset.like;
		if (!id) return;

		const sync = () => {
			const on = likes.has(id);
			btn.classList.toggle('is-liked', on);
			btn.setAttribute('aria-pressed', String(on));
			btn.setAttribute('aria-label', on ? '取消喜欢' : '喜欢');
		};

		sync();
		btn.addEventListener('click', () => {
			if (likes.has(id)) likes.delete(id);
			else likes.add(id);
			localStorage.setItem(LIKES_KEY, JSON.stringify([...likes]));
			sync();
		});
	});
}

type Photo = { src: string; alt: string };

function collectGalleries() {
	const galleries = new Map<string, Photo[]>();
	document.querySelectorAll<HTMLElement>('[data-post-id]').forEach((post) => {
		const id = post.dataset.postId;
		if (!id) return;
		const photos = [...post.querySelectorAll<HTMLButtonElement>('[data-lightbox]')].map((btn) => {
			const img = btn.querySelector('img');
			return {
				src: img?.getAttribute('src') || '',
				alt: img?.getAttribute('alt') || '',
			};
		});
		galleries.set(id, photos.filter((p) => p.src));
	});
	return galleries;
}

function setupLightbox() {
	const dialog = document.querySelector<HTMLDialogElement>('#lightbox');
	if (!dialog) return;

	const img = dialog.querySelector<HTMLImageElement>('[data-lb-img]');
	const count = dialog.querySelector<HTMLElement>('[data-lb-count]');
	const prev = dialog.querySelector<HTMLButtonElement>('[data-lb-prev]');
	const next = dialog.querySelector<HTMLButtonElement>('[data-lb-next]');
	const close = dialog.querySelector<HTMLButtonElement>('[data-lb-close]');
	if (!img || !count || !prev || !next || !close) return;

	const galleries = collectGalleries();
	let postId = '';
	let index = 0;
	let startX = 0;

	const photos = () => galleries.get(postId) ?? [];

	const render = () => {
		const list = photos();
		const current = list[index];
		if (!current) return;
		img.src = current.src;
		img.alt = current.alt;
		count.textContent = `${index + 1} / ${list.length}`;
		prev.hidden = list.length < 2;
		next.hidden = list.length < 2;
	};

	const open = (id: string, i: number) => {
		postId = id;
		index = i;
		render();
		if (!dialog.open) dialog.showModal();
		document.body.classList.add('lb-open');
	};

	const hide = () => {
		dialog.close();
		document.body.classList.remove('lb-open');
	};

	const step = (delta: number) => {
		const list = photos();
		if (list.length < 2) return;
		index = (index + delta + list.length) % list.length;
		render();
	};

	document.querySelectorAll<HTMLButtonElement>('[data-lightbox]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.dataset.post;
			const i = Number(btn.dataset.index || 0);
			if (!id) return;
			open(id, i);
		});
	});

	prev.addEventListener('click', () => step(-1));
	next.addEventListener('click', () => step(1));
	close.addEventListener('click', hide);

	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) hide();
	});

	dialog.addEventListener('close', () => {
		document.body.classList.remove('lb-open');
	});

	window.addEventListener('keydown', (event) => {
		if (!dialog.open) return;
		if (event.key === 'ArrowLeft') step(-1);
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'Escape') hide();
	});

	dialog.addEventListener('touchstart', (event) => {
		startX = event.changedTouches[0]?.clientX ?? 0;
	});

	dialog.addEventListener('touchend', (event) => {
		const x = event.changedTouches[0]?.clientX ?? 0;
		const dx = x - startX;
		if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
	});
}

function scrollToHash() {
	if (!location.hash) return;
	const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
	el?.scrollIntoView({ block: 'start' });
}

setupLayoutSwitch();
setupExpand();
setupLikes();
setupLightbox();
scrollToHash();
