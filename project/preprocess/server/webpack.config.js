const config                  = require('../config'),
      webpack                 = require('webpack'),
      fs                      = require('fs'),
      path                    = require('path'),
      {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer'),
      {version, dependencies} = require('../../package.json'),
      ascii                   = require('../utils/ascii'),

      publicPath              = path.resolve(__dirname, config.publicPath),
      serverPath              = path.resolve(__dirname, config.serverPath),
      cacheDirectory          = path.resolve(__dirname, `${config.cachePath}/webpack/server`),
      mode                    = process.env.NODE_ENV === 'development' ? 'development' : 'production',
      analyze                 = ['server', 'both'].includes(process.env.BUNDLE_ANALYZE);

const now       = new Date(),
      year      = now.getUTCFullYear().toString().slice(-2),
      month     = ('0' + (now.getUTCMonth() + 1)).slice(-2),
      day       = ('0' + now.getUTCDate()).slice(-2),
      hours     = ('0' + now.getUTCHours()).slice(-2),
      minutes   = ('0' + now.getUTCMinutes()).slice(-2),
      timestamp = `${year}${month}${day}-${hours}${minutes}`;

console.info(ascii({version, environment: mode}));
console.warn('\x1b[33m%s\x1b[1m', '\n→ STARTING SERVER BUILD...\n');

/** Consider all require'd modules external ones for webpack */
const nodeModules = {};
fs.readdirSync('./node_modules')
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((mod) => {
        if (dependencies.hasOwnProperty(mod)) {
            nodeModules[mod] = 'commonjs ' + mod;
        }
    });

config.externals.forEach(mod => {
    nodeModules[mod] = 'commonjs ' + mod;
});

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(mode),
            SERVER: true,
            BUILD_DATE: JSON.stringify((new Date).toString()),
            BUILD_TIME: JSON.stringify(timestamp)
        }
    })
];

if (analyze) {
    plugins = [].concat(plugins, [new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../preprocess/reports/onp-academy.html',
        openAnalyzer: true,
        logLevel: 'info'
    })]);
}

/**
 * PRODUCTION
 */
module.exports = {
    mode,
    target: 'node',
    node: {
        fs: 'empty',
        __dirname: false,
        __filename: false
    },
    entry: `${serverPath}/index.js`,
    output: {
        path: publicPath,
        filename: `${config.serverName}.js`
    },
    plugins,
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: false,
                        quiet: false,
                        emitWarning: true,
                        configFile: './preprocess/configs/.eslintrc',
                        formatter: require('eslint/lib/formatters/stylish')
                    }
                },
                exclude: /node_modules|libs/
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {cacheDirectory}
                    },
                    {
                        loader: 'babel-loader',
                        options: require('./babel.build.config')(mode)
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    externals: nodeModules,
    // https://webpack.js.org/configuration/stats/
    stats: {
        assets: false,
        chunks: false,
        modules: false,
        children: false,
        chunkModules: false,
        assetsSort: 'size',
        colors: true
    },
    performance: {
        hints: false
    }
};
