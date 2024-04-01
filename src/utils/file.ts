export function parseSlug(fileName: string) {
    const dirs = fileName.split('/')
    const name = dirs.pop()!.split('.').shift()
    const category = dirs.pop()
    return `/${category}/${name}`
}
