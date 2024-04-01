import { createClient, kv as prodKV } from '@vercel/kv'

const { BLOG_API, BLOG_API_SECRET, DEV, KV_REST_API_URL, KV_REST_API_TOKEN } = import.meta.env

const notFound = new Response(null, {
    status: 404,
    statusText: 'Not found'
})
const getLink = async (id) => {
    const kv = DEV
        ? createClient({
              url: KV_REST_API_URL,
              token: KV_REST_API_TOKEN
          })
        : prodKV
    const cached = await kv.get(id)
    if (cached) {
        return cached
    }
    const apiURL = `${BLOG_API}/shorts/${id}`
    const headers = {
        Authorization: `Bearer ${BLOG_API_SECRET}`
    }
    const res = await fetch(apiURL, { headers })
    if (res.status === 404) {
        return null
    }
    const json = await res.json()
    const url = json.url
    await kv.set(id, url)
    return url
}
export const GET = async ({ params, redirect }) => {
    const { id } = params
    const type = id?.slice(0, 1)
    if (!type || !['o', 'b'].includes(type)) {
        return notFound
    }
    const link = await getLink(id)
    if (!link) {
        return notFound
    }
    return redirect(link, 308)
}
