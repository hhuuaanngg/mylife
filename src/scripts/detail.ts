type Hydrate = (root: ParentNode) => void;

function postPath(href: string) {
	try {
		return new URL(href, window.location.origin).pathname.replace(/\/$/, '') || '/';
	} catch {
		return href;
	}
}

export function setupPostModal(hydrate: Hydrate) {
	const dialog = document.querySelector<HTMLDialogElement>('#post-modal');
	if (!dialog) return;

	const body = dialog.querySelector<HTMLElement>('[data-post-modal-body]');
	const loading = dialog.querySelector<HTMLElement>('[data-post-modal-loading]');
	const closer = dialog.querySelector<HTMLButtonElement>('[data-post-modal-close]');
	const lightbox = document.querySelector<HTMLDialogElement>('#lightbox');
	if (!body || !closer) return;

	const cache = new Map<string, string>();
	const homeTitle = document.title;
	let token = 0;
	let pushed = false;
	let closingByPop = false;

	const setLoading = (on: boolean) => {
		if (loading) loading.hidden = !on;
		body.hidden = on;
	};

	const pauseVideos = () => {
		body.querySelectorAll('video').forEach((video) => {
			video.pause();
		});
	};

	const hide = () => {
		if (!dialog.open) return;
		dialog.close();
	};

	const syncClosed = () => {
		pauseVideos();
		token += 1;
		body.replaceChildren();
		document.body.classList.remove('post-modal-open');
		document.title = homeTitle;
		if (pushed && !closingByPop) {
			pushed = false;
			history.back();
		} else {
			pushed = false;
		}
	};

	const fill = (html: string) => {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		const article = doc.querySelector<HTMLElement>('.article');
		if (!article) throw new Error('missing article');
		const node = document.importNode(article, true);
		node.classList.remove('wrap');
		node.querySelector('.article-back')?.remove();
		body.replaceChildren(...node.childNodes);
		if (article.dataset.postId) body.dataset.postId = article.dataset.postId;
		const title = body.querySelector('.article-title')?.textContent?.trim();
		if (title) document.title = `${title} · MEMORE`;
	};

	const open = async (href: string) => {
		const path = postPath(href);
		const my = ++token;
		if (!dialog.open) dialog.showModal();
		document.body.classList.add('post-modal-open');
		setLoading(true);

		try {
			let html = cache.get(path);
			if (!html) {
				const response = await fetch(path);
				if (!response.ok) throw new Error(String(response.status));
				html = await response.text();
				cache.set(path, html);
			}
			if (my !== token) return;
			fill(html);
			setLoading(false);
			body.scrollTop = 0;
			hydrate(body);
			if (!pushed && postPath(location.pathname) !== path) {
				history.pushState({ cikePost: path }, '', path);
				pushed = true;
			}
		} catch {
			if (my !== token) return;
			setLoading(false);
			body.replaceChildren();
			const error = document.createElement('p');
			error.className = 'post-modal-error';
			error.textContent = '加载失败，关闭后重试。';
			body.append(error);
		}
	};

	document.addEventListener('click', (event) => {
		if (!(event.target instanceof Element)) return;
		if (event.defaultPrevented) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		const link = event.target.closest('a[href^="/p/"]');
		if (!(link instanceof HTMLAnchorElement)) return;
		if (link.closest('#post-modal, .lightbox')) return;
		if (!link.closest('.post')) return;
		event.preventDefault();
		void open(link.getAttribute('href') || link.href);
	});

	closer.addEventListener('click', hide);

	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) hide();
	});

	dialog.addEventListener('cancel', (event) => {
		if (lightbox?.open) event.preventDefault();
	});

	dialog.addEventListener('close', syncClosed);

	window.addEventListener('popstate', () => {
		if (!dialog.open) return;
		closingByPop = true;
		hide();
		closingByPop = false;
	});
}
