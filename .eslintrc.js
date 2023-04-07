module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'eqeqeq': 'error',
    	'no-trailing-spaces': 'error',
    	'object-curly-spacing': [
        	'error', 'always'
    	],
    	'arrow-spacing': [
        	'error', { 'before': true, 'after': true }
    	],
		'indent': [
			'error',
			tab
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'extends': 'eslint:recommended',
		'no-console': 0
	}
}
