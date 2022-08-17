// Modified from `babel-plugin-dynamic-import-chunk-name` as it resulted
//
// It used a slightly different naming system than what we wanted. Using the
// plugin and correcting the names after the fact would be more effor than
// forking. Additionally, the plugin does not have source code available online.
// While we're unlikely to run into issues, having a way to create fixes ourselves
// would be beneficial.
//
// https://www.npmjs.im/babel-plugin-dynamic-import-chunk-name
// MIT Licensed: https://www.runpkg.com/?babel-plugin-dynamic-import-chunk-name@1.0.0/LICENSE

function convertToKebabCase(string) {
    return string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

function getChunkName(filename) {
    return filename
        .split('/')
        .map((part) => part.replace(/\..*$/, ''))
        .filter(Boolean)
        .map(convertToKebabCase)
        .join('-');
}

function hasComment(comment) {
    return comment && comment.value.replace(/\*+/g, '').trim().startsWith('webpackChunkName');
}

/**
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj}
 */
export default function webpackChunkNameCommentsPlugin({ types: t }) {
    return {
        name: 'webpack-chunk-name-comments',
        visitor: {
            CallExpression(path) {
                if (path.node.callee.type !== 'Import') {
                    return;
                }

                const [arg] = path.node.arguments;
                const [comment] = arg.leadingComments || [];

                if (!hasComment(comment)) {
                    t.addComment(arg, 'leading', `webpackChunkName: "${getChunkName(arg.value)}"`);
                }
            },
        },
    };
};
