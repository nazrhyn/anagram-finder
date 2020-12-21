/* eslint-version 7.16 */
module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		sourceType: 'script',
		requireConfigFile: false,
		babelOptions: {
			plugins: [
				'@babel/plugin-proposal-nullish-coalescing-operator',
				'@babel/plugin-proposal-optional-chaining',
			],
		},
	},
	plugins: [
		'node',
		'jest',
	],
	extends: [
		'eslint:recommended',
		'.eslintrc-base.js',
		'.eslintrc-es6plus.js',
		'plugin:node/recommended',
		'.eslintrc-node.js',
	],
	env: {
		'node': true,
	},
};
