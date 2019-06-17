/**
 * Generic configurations for builds
 */
module.exports = (() => ({
    serverName: 'onp-academy',
    webpackJsonpFunction: 'mazWebpack',
    nodeModulesPath: '../../node_modules',
    publicPath: '../../.next',
    dataPath: '../../data',
    staticPath: '../../static',
    contributionPath: '../../preprocess/contribution',
    cachePath: '../../.cache',
    serverPath: '../../server',
    scssPath: '../../styles',
    // Add following packages to common chunks (in addition to react and react-dom)
    // https://spectrum.chat/next-js/general/why-lodash-appears-in-all-of-my-client-pages-chunks~d5de06ff-83b0-4d73-be45-c15d41fc1a37
    vendors: [
        'react-slick',
        'lodash',
        'core-js'
    ],
    // https://github.com/babel/babel/issues/8809
    legacyBrowsers: [
        // The browsers that don't support <script type='module'>.
        'Firefox ESR',
        'ie 11',
        'edge 15',
        'ios 10',
        'safari 10',
        'android 4.4.3'
    ],
    modernBrowsers: [
        // The last three versions of each browser, excluding versions
        // that don't support <script type='module'>.
        'last 2 Chrome versions',
        'last 2 Safari versions',
        'last 2 iOS versions',
        'last 2 Firefox versions',
        'last 2 Edge versions'
    ],
    cssnano: {
        discardComments: {
            removeAll: true
        },
        zindex: false,
        reduceIdents: false
    },
    iconsFont: {
        fontName: 'onp-academy-icons',
        formats: ['woff', 'woff2'],
        iconTag: 'span.cc-icon'
    },
    externals: [
        '../next.config',
        '../.next/runtime.credentials'
    ],
    stats: {
        assets: false,
        chunks: false,
        modules: false,
        children: false,
        chunkModules: false,
        assetsSort: 'size',
        colors: true
    }
}))();
