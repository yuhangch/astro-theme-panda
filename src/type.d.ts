declare module '@assets/*'
declare module '@components/*'
declare module '@data/*'
declare module '@layouts/*'
declare module '@plugins/*'
declare module '@styles/*'
declare module '@utils/*'
declare module '@content/*'

declare module 'remark-pangu' {
    const pangu: any
    export default pangu
}



export interface PostFrontMatter {
    title: string
    title_en: string
    date: string
    tags: string[]
    categories: string[]
    lastModified: string
    draft: boolean
}
