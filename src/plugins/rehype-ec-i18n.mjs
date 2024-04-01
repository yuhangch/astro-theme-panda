function find(node) {
    let ecNodes = []

    if (node.type === 'raw' && node.value.includes('expressive-code')) {
        ecNodes.push(node)
    }

    if (node.children) {
        let parent = node
        for (let child of parent.children) {
            ecNodes.push(...find(child))
        }
    }

    return ecNodes
}

export function i18n() {
    return async function transformer(node, file) {
        // if class include expressive-code

        const en = file.history.at(0).includes('.en.')
        if (!en) {
            const ecNodes = find(node)
            for (let ecNode of ecNodes) {
                ecNode.value = ecNode.value.replace(
                    /title="Copy to clipboard" data-copied="Copied!"/g,
                    `title="复制到剪贴板" data-copied="已复制!"`
                )
            }
        }

        return node
    }
}
