import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import { PandaConfig } from '../config.js'
const { site, description, title } = PandaConfig

export const prerender = true

const parser = new MarkdownIt()

export async function GET({ params }) {
    const blog = await getCollection('posts')
    const posts = blog
        .filter((i) => i.data.title && !i.data.draft)
        .map((post) => {
            const html = parser.render(post.body)
            return {
                ...post.data,
                link: `/posts/${post.slug}/`,
                content: html
            }
        })
    return new Response(
        (
            await rss({
                site,
                title,
                description,
                items: posts
            })
        ).body,
        {
            headers: {
                'content-type': 'application/xml'
            }
        }
    )
}
