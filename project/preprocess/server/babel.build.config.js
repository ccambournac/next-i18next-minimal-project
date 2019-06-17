/**
 * Configuration used for transpilation of production builds for server-side scripts.
 * @see https://babeljs.io/docs/en/configuration#babelconfigjs
 */

const plugins = require('./babel.plugins');

/**
 * Babel configuration.
 * @param {string} mode - Webpack mode
 * @return {{presets: *[], plugins: *}}
 */
module.exports = (mode = 'development') => ({
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    // https://babeljs.io/docs/en/options#sourcetype
    sourceType: 'unambiguous',
    presets: [
        [
            require('@babel/preset-env'),
            {
                targets: {
                    node: '10.15'
                },
                modules: false,
                useBuiltIns: false
            }
        ]
    ],
    plugins: mode === 'development' ?
        plugins :
        plugins.concat([
            // CLEAN
            [
                require('babel-plugin-transform-remove-console'),
                {
                    exclude: ['error', 'warn']
                }
            ],
            require('babel-plugin-transform-remove-debugger')
        ])
});
