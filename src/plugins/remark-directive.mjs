import {visit} from 'unist-util-visit'
import {h} from 'hastscript'

export function RDNotePlugin() {
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'textDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'containerDirective'
            ) {
                if (node.name !== 'note') return

                const data = node.data || (node.data = {})
                const tagName = node.type === 'textDirective' ? 'span' : 'div'
                if (node.attributes.class) {
                    node.attributes.class = 'notification notification-' + node.attributes.class + ' rounded-lg'
                }
                data.hName = tagName
                data.hProperties = h(tagName, node.attributes).properties
            }
        })
    }
}

// bilibili frame
// <iframe src="//player.bilibili.com/player.html?bvid=BV1Zh411M7P7&autoplay=0" width="100%" allowfullscreen> </iframe>
export function RDBilibiliPlugin() {
    return (tree, file) => {
        visit(tree, function (node) {
            if (
                node.type === 'containerDirective' ||
                node.type === 'leafDirective'
            ) {
                if (node.name !== 'bilibili') return

                const data = node.data || (node.data = {})
                const attributes = node.attributes || {}
                const bvid = attributes.id


                if (!bvid) {
                    file.fail('Unexpected missing `id` on `youtube` directive', node)
                }

                data.hName = 'iframe'
                //<iframe src="//player.bilibili.com/player.html?bvid=BV1Zh411M7P7&autoplay=0" width="100%" allowfullscreen> </iframe>
                data.hProperties = {
                    src: `//player.bilibili.com/player.html?bvid=${bvid}&autoplay=0`,
                    width: '100%',
                    height: 400,
                    aspectRatio: '16 / 9',
                    // fit height
                    class: 'm-auto',
                    // height: 400,
                    frameBorder: 0,
                    allow: 'picture-in-picture',
                    allowFullScreen: true
                }
            }
        })
    }
}



