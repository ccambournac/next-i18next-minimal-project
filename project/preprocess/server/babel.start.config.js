/**
 * Configuration used for transpilation with babel-node CLI.
 * @see https://babeljs.io/docs/en/configuration#babelconfigjs
 */
/**
 * Babel configuration.
 * @param {string} mode - Webpack mode
 * @return {{presets: *[], plugins: *}}
 */
module.exports = {
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
    plugins: require('./babel.plugins')
};
