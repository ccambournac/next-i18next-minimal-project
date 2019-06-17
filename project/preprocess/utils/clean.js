const del        = require('del'),
	  path       = require('path'),
	  config     = require('../config'),
	  publicPath = path.resolve(__dirname, config.publicPath);

const clean = (() => {
	del.sync([
		`${publicPath}/**`,
		`${publicPath}/.**`,
		`!${publicPath}`,
		`!${publicPath}/runtime.credentials.json`,
		`!${publicPath}/runtime.config.json`
	]); // Clean asset directory except runtime configuration
})();

module.exports = clean;
