import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export const PAGE_SIZE = 12;

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts');
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
	const posts = await getPosts();
	return posts.filter((post) => post.data.tags.includes(tag));
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
	const posts = await getPosts();
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh'));
}

export function paginate<T>(items: T[], page: number) {
	const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
	const current = Math.min(Math.max(1, page), totalPages);
	const start = (current - 1) * PAGE_SIZE;
	return {
		items: items.slice(start, start + PAGE_SIZE),
		page: current,
		totalPages,
		total: items.length,
	};
}

export function pageHref(base: string, page: number) {
	if (page <= 1) return base || '/';
	return `${base}/page/${page}`;
}

export function postHref(id: string) {
	return `/p/${id}`;
}

export function tagHref(tag: string, page = 1) {
	const base = `/t/${encodeURIComponent(tag)}`;
	return pageHref(base, page);
}
