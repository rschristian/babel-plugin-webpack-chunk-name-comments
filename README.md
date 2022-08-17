# `@rschristian/babel-plugin-webpack-chunk-name-comments`

A Babel plugin that adds Webpack magic comments to provide chunk names on `import()` statements.

## Usage

In your babel configuration (`.babelrc`, `babel.config.json`, etc.) add the plugin:

```js
{
    "plugins": [
        "@rschristian/babel-plugin-webpack-chunk-name-comments"
    ]
}
```

```js
// input:
import("./a.js");

// output:
import(
    /*webpackChunkName: "a"*/
    "./a.js"
);
```

For more information on magic comments and how they might be used, see [Webpack's docs on the subject](https://webpack.js.org/api/module-methods/#magic-comments).

## License

[MIT](https://github.com/rschristian/babel-plugin-webpack-chunk-name-comments/blob/master/LICENSE)

Modified from Widen Enterprises, Inc. [MIT](https://www.runpkg.com/?babel-plugin-dynamic-import-chunk-name@1.0.0/LICENSE)

## Acknowledgments

Modified version of [`babel-plugin-dynamic-import-chunk-name`](https://npm.im/babel-plugin-dynamic-import-chunk-name), built specifically for [`preact-cli`](https://npm.im/preact-cli)
