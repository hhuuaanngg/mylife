export const site = {
	name: '此刻',
	tagline: '把日子拍下来，再写一句。',
	description: '一个年轻向的生活轻博客，照片为主，文案很短。',
	author: '此刻',
	links: [
		{ label: '微博', href: '#' },
		{ label: 'Instagram', href: '#' },
		{ label: '邮箱', href: 'mailto:hello@example.com' },
	],
};

export function formatDate(date: Date) {
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${month}月${day}日`;
}
