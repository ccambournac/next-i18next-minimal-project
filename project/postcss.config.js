/**
 * Custom PostCSS configuration
 * @see https://github.com/zeit/next-plugins/tree/master/packages/next-sass
 * @see https://github.com/zeit/next-plugins/pull/416
 */
const {legacyBrowsers} = require('./preprocess/config.js');

module.exports = ({file, options}) => ({
	exec: true,
	parser: file.extname === '.css' ? require('postcss-safe-parser') : false,
	plugins: {
		'postcss-preset-env': {
			browsers: legacyBrowsers
		}
	}
});
