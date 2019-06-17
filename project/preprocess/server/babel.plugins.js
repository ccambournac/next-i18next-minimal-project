// Common Babel plugins used for ES6+ transpilation
module.exports = [
	require('@babel/plugin-transform-modules-commonjs'),

	// ECMA STAGE 2
	[require('@babel/plugin-proposal-decorators'), {legacy: true}],
	require('@babel/plugin-proposal-function-sent'),
	require('@babel/plugin-proposal-export-namespace-from'),
	require('@babel/plugin-proposal-numeric-separator'),
	require('@babel/plugin-proposal-throw-expressions'),
	require('@babel/plugin-proposal-optional-chaining'),

	// ECMA STAGE 3
	require('@babel/plugin-proposal-private-methods'),
	require('@babel/plugin-syntax-dynamic-import'),
	require('@babel/plugin-syntax-import-meta'),
	[require('@babel/plugin-proposal-class-properties'), {loose: false}],
	require('@babel/plugin-proposal-json-strings')
];
