/**
 * Custom Next.js configuration
 * @see https://nextjs.org/docs/#customizing-webpack-config
 *
 * /!\  This file is not tranpiled by Babel.
 *      So keep it compatible with your production target version of Node.js.
 */

module.exports = (phase, {defaultConfig = {}} = {}) => {
    const fs                                         = require('fs'),
          {PHASE_PRODUCTION_SERVER}                  = require('next/constants'),
          {publicRuntimeConfig, serverRuntimeConfig} = require('./.next/runtime.config'),
          commonConfig                               = {
              // Will be available on both server and client
              publicRuntimeConfig,
              // Will only be available on the server side
              serverRuntimeConfig,
              // https://nextjs.org/docs/#disabling-file-system-routing
              useFileSystemPublicRoutes: true,
              // https://nextjs.org/docs/#disabling-etag-generation
              generateEtags: false,
              poweredByHeader: false
          };

    // Use Next.js phases to avoid unneeded packages on production server start.
    if (phase !== PHASE_PRODUCTION_SERVER) {
        const production           = process.env.NODE_ENV === 'production',
              {
                  cssnano,
                  vendors,
                  webpackJsonpFunction
              }                    = require('./preprocess/config'),
              {version}            = require('./package.json'),
              localIp              = require('./preprocess/utils/local-ip.js'),
              FilterWarningsPlugin = require('webpack-filter-warnings-plugin'),
              webpack              = require('webpack'),
              withSass             = require('@zeit/next-sass'),
              withBundleAnalyzer   = require('@zeit/next-bundle-analyzer'),
              withProgressBar      = require('next-progressbar');

        return withProgressBar(
            withBundleAnalyzer(
                withSass(Object.assign({}, {
                    // https://github.com/zeit/next-plugins/tree/master/packages/next-bundle-analyzer#nextjs--webpack-bundle-analyzer
                    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
                    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
                    bundleAnalyzerConfig: {
                        server: {
                            openAnalyzer: true,
                            analyzerMode: 'static',
                            reportFilename: '../../preprocess/reports/nextjs-server.html'
                        },
                        browser: {
                            openAnalyzer: true,
                            analyzerMode: 'static',
                            reportFilename: '../preprocess/reports/nextjs-client.html'
                        }
                    },
                    // Change destination direction for development build
                    // In order to avoid deletion of `runtime.config.json` file.
                    distDir: production ? '.next' : '.dev',
                    // Change next.js original buildId → https://github.com/nexdrew/next-build-id#intro
                    // @see https://github.com/nexdrew/next-build-id/issues/9
                    generateBuildId: async () => fs.readFileSync('../.git-hash', {encoding: 'utf-8'}),
                    // withSass → https://github.com/zeit/next-plugins/tree/master/packages/next-sass
                    // localIdentName → https://github.com/css-modules/css-modules/issues/291
                    cssModules: true,
                    cssLoaderOptions: {
                        url: false,
                        sourceMap: !production,
                        localIdentName: '[local]--[hash:base64:8]',
                        importLoaders: 2
                    },
                    // Webpack → https://nextjs.org/docs/#customizing-webpack-config
                    webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
                        !isServer && console.warn('\x1b[33m%s\x1b[1m', `\n→ STARTING NEXT.JS BUILDS...\n`);

                        config.output.jsonpFunction = webpackJsonpFunction;
                        config.resolve.extensions = config.resolve.extensions.concat('.scss');

                        // ESlint
                        config.module.rules.unshift({
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
                        });

                        // https://github.com/zeit/next-plugins/pull/315
                        config.plugins.push(
                            new FilterWarningsPlugin({
                                exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
                            })
                        );

                        config.plugins.push(
                            new webpack.DefinePlugin({
                                'process.env': {
                                    VERSION: JSON.stringify(version),
                                    NODE_ENV: JSON.stringify(dev ? 'development' : 'production'),
                                    BUILD_DATE: JSON.stringify((new Date).toString()),
                                    LOCAL_IP: JSON.stringify(localIp)
                                }
                            })
                        );

                        // Minify CSS
                        if (config.mode === 'production' && Array.isArray(config.optimization.minimizer)) {
                            const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

                            config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({
                                assetNameRegExp: /\.css$/g,
                                cssProcessor: require('cssnano'),
                                cssProcessorPluginOptions: {
                                    preset: ['default', cssnano]
                                }
                            }));
                        }

                        // Customize common chunks
                        // https://spectrum.chat/next-js/general/why-lodash-appears-in-all-of-my-client-pages-chunks~d5de06ff-83b0-4d73-be45-c15d41fc1a37
                        if (!dev && config.optimization.splitChunks) {
                            config.optimization.splitChunks.cacheGroups.commons.enforce = true;
                            config.optimization.splitChunks.cacheGroups.commons.priority = 9;
                            config.optimization.splitChunks.cacheGroups.react.priority = 12;
                            const re = `[\\\\\/](node_modules[\\\\\/](react|react-dom|${vendors.join('|')}))[\\\\\/]`;
                            config.optimization.splitChunks.cacheGroups.react.test = new RegExp(re);
                        }

                        // Polyfills
                        const originalEntry = config.entry;
                        config.entry = async () => {
                            const entries = await originalEntry();
                            if (entries['main.js'] && !entries['main.js'].includes('./client/polyfills')) {
                                entries['main.js'].unshift('./client/polyfills');
                            }
                            return entries;
                        };

                        return Object.assign(config, {
                            node: {
                                fs: 'empty'
                            }
                        });
                    }
                }, commonConfig))
            )
        );
    }

    // Server start in production only
    return Object.assign({}, defaultConfig || {}, commonConfig);
};
