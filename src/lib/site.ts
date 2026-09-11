export const site = {
	name: 'MEMORE',
	english: 'COOL',
	tagline: '温暖且酷。',
	description: '技术、摄影与生活的个人记忆。ME MORE COOL。',
	author: '黄先森',
	footer: '愿我们都能在复杂世界里，温暖且酷。',
	links: [{ label: 'memore.cool', href: 'https://memore.cool' }],
};

export function formatDate(date: Date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}年${month}月${day}日`;
}
