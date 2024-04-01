import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import {remarkModifiedTime} from './src/plugins/remark-modified-time.mjs'
import remarkPanGu from 'remark-pangu'
import UnoCSS from 'unocss/astro'
import expressiveCode from 'astro-expressive-code'
import {ExpressiveCodeTheme} from '@expressive-code/core'
import {readFileSync} from 'fs'
import {parse} from 'jsonc-parser'
import remarkDirective from "remark-directive";
import {RDNotePlugin, RDBilibiliPlugin} from "./src/plugins/remark-directive.mjs";
import {PandaConfig} from "./src/config.js";

const nightOwlDark = new ExpressiveCodeTheme(
    parse(readFileSync('./src/styles/expressive-code/night-owl-dark.jsonc', 'utf-8'))
)
const nightOwlLight = new ExpressiveCodeTheme(
    parse(readFileSync('./src/styles/expressive-code/night-owl-light.jsonc', 'utf-8'))
)




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
    output: 'static',
})
