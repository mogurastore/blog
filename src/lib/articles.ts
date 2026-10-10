import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getAllArticles(): Promise<CollectionEntry<'articles'>[]> {
	const posts = await getCollection('articles');
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
