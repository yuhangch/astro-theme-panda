import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import vercel from '@astrojs/vercel/serverless'
import {remarkModifiedTime} from './src/plugins/remark-modified-time.mjs'
import remarkPanGu from 'remark-pangu'
import UnoCSS from 'unocss/astro'
import expressiveCode from 'astro-expressive-code'
import {ExpressiveCodeTheme} from '@expressive-code/core'
import {i18n as eci18n} from './src/plugins/rehype-ec-i18n.mjs'
import {readFileSync} from 'fs'
import {parse} from 'jsonc-parser'
import remarkDirective from "remark-directive";
import {RDNotePlugin, RDBilibiliPlugin} from "./src/plugins/remark-directive.mjs";

const nightOwlDark = new ExpressiveCodeTheme(
    parse(readFileSync('./src/styles/expressive-code/night-owl-dark.jsonc', 'utf-8'))
)
const nightOwlLight = new ExpressiveCodeTheme(
    parse(readFileSync('./src/styles/expressive-code/night-owl-light.jsonc', 'utf-8'))
)


export const PandaConfig = {
    title: 'Panda Blog',
    description: 'Panda Blog, a blog powered by Astro',
    start: '2016',
    site: 'https://astro-theme-panda.vercel.app/',
    defaultLocale: 'en',
    navbar: [
        // {title: 'Posts', url: '/'}, // auto generated
        {title: 'about', url: '/about/'},
    ],
    footer:[
        {title: 'rss', url: '/rss.xml/'},
        {title: 'contact', url: 'https://github.com/yuhangch/astro-theme-panda/issues/new'},
        {title: 'github', url: 'https://github.com/yuhangch/astro-theme-panda'},
    ]
}

const {site, defaultLocale} = PandaConfig
// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [yaml()],
    },
    prefetch: true,
    site,
    scopedStyleStrategy: 'class',
    trailingSlash: 'always',
    build: {
        format: 'directory'
    },
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkDirective, RDNotePlugin, RDBilibiliPlugin, remarkModifiedTime, remarkPanGu],
        rehypePlugins: [eci18n],
        remarkRehype: {
            footnoteLabel: ' '
        }
    },
    integrations: [
        UnoCSS(),
        sitemap(),
        expressiveCode({
            themes: [nightOwlDark, nightOwlLight],
            themeCssSelector: (theme) => {
                return '.' + theme.type
            }
        }),
        mdx(),
        partytown()
    ],
    output: 'server',
    adapter: vercel({
        functionPerRoute: false
    }),
})
