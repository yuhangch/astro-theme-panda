/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    readonly BLOG_API_SECRET: string
    readonly BLOG_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
