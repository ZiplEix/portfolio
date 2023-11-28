import * as config from '$lib/config'
import type { Post } from '$lib/types'

export const prerender = true;

export async function GET({ fetch }) {
	const response = await fetch('api/posts')
	const posts: Post[] = await response.json()

	const headers = { 'Content-Type': 'application/xml' }


	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.title}</title>
				<description>${config.description}</description>
				<link>${config.url}</link>
				<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => {
                            const [day, month, year] = post.date.split('-').map(Number);
                            const date = new Date(year, month - 1, day).toUTCString();
                            return `
                            <item>
                                <title>${post.title}</title>
                                <description>${post.description}</description>
                                <link>${config.url}/${post.slug}</link>
                                <guid isPermaLink="true">${config.url}/${post.slug}</guid>
                                <pubDate>${date}</pubDate>
                            </item>
                            `
                        }
					)
					.join('')}
			</channel>
		</rss>
	`.trim()

	return new Response(xml, { headers })
}
