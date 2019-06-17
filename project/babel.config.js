/**
 * Custom Babel configuration
 * @param {object} api
 * @see https://nextjs.org/docs/#customizing-babel-config
 * @see https://babeljs.io/docs/en/config-files/#config-function-api
 */
module.exports = (api) => ({
    presets: [[require('next/babel')]],
    plugins: [
        // ECMA STAGE 1
        require('@babel/plugin-proposal-optional-chaining'),

        // ECMA STAGE 2
        [require('@babel/plugin-proposal-decorators'), {legacy: true}],
        require('@babel/plugin-proposal-function-sent'),
        require('@babel/plugin-proposal-export-namespace-from'),
        require('@babel/plugin-proposal-numeric-separator'),
        require('@babel/plugin-proposal-throw-expressions'),

        // ECMA STAGE 3
        require('@babel/plugin-proposal-private-methods'),
        require('@babel/plugin-syntax-dynamic-import'),
        require('@babel/plugin-syntax-import-meta'),
        [require('@babel/plugin-proposal-class-properties'), {loose: false}],
        require('@babel/plugin-proposal-json-strings')
    ].concat(api.env() === 'production' ?
        [
            // CLEAN
            [
                require('babel-plugin-transform-remove-console'),
                {
                    exclude: ['error']
                }
            ],
            require('babel-plugin-transform-remove-debugger')
        ] : [])
});
