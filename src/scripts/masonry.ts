function columnCount() {
	if (window.matchMedia('(min-width: 1080px)').matches) return 3;
	if (window.matchMedia('(min-width: 700px)').matches) return 2;
	return 1;
}

export function setupMasonry(feed: HTMLElement) {
	let cols: HTMLElement[] = [];
	let seq = 0;

	const assignIndex = (post: HTMLElement) => {
		if (!post.dataset.feedIndex) post.dataset.feedIndex = String(seq++);
	};

	const ordered = () =>
		[...feed.querySelectorAll<HTMLElement>('.post')].sort(
			(a, b) => Number(a.dataset.feedIndex) - Number(b.dataset.feedIndex),
		);

	const pack = () => {
		const posts = ordered();
		const n = columnCount();
		feed.classList.add('is-packed');
		feed.replaceChildren();
		cols = Array.from({ length: n }, () => {
			const col = document.createElement('div');
			col.className = 'masonry-col';
			feed.appendChild(col);
			return col;
		});
		for (const post of posts) {
			cols[Number(post.dataset.feedIndex) % n]?.appendChild(post);
		}
	};

	const append = (posts: HTMLElement[]) => {
		if (!cols.length) pack();
		const n = cols.length || 1;
		for (const post of posts) {
			assignIndex(post);
			post.classList.add('is-new');
			cols[Number(post.dataset.feedIndex) % n]?.appendChild(post);
		}
	};

	for (const post of feed.querySelectorAll<HTMLElement>(':scope > .post')) assignIndex(post);
	pack();

	let timer = 0;
	window.addEventListener('resize', () => {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => {
			if (columnCount() !== cols.length) pack();
		}, 160);
	});

	return { append, pack };
}
