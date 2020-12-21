module.exports = {
	rules: {
		'array-bracket-newline': [2, 'consistent'],
		'array-bracket-spacing': 2,
		'array-element-newline': [2, 'consistent'],
		'block-scoped-var': 2,
		'block-spacing': 2,
		'brace-style': [2, '1tbs', { allowSingleLine: true }],
		'camelcase': 2,
		'comma-dangle': [2, 'always-multiline'],
		'comma-spacing': 2,
		'comma-style': 2,
		'complexity': 1,
		'curly': 2,
		'default-case-last': 2,
		'dot-location': [2, 'property'],
		'dot-notation': 2,
		'eol-last': 2,
		'eqeqeq': 2,
		'func-call-spacing': 2,
		'function-call-argument-newline': [2, 'consistent'],
		'function-paren-newline': [2, 'consistent'],
		'guard-for-in': 2,
		'indent': [2, 'tab', { SwitchCase: 1 }],
		'key-spacing': 2,
		'keyword-spacing': 2,
		'linebreak-style': 2,
		'max-depth': [1, { 'max': 10 }],
		'max-lines-per-function': [1, { max: 100, skipBlankLines: true, skipComments: true }],
		'max-nested-callbacks': [1, { max: 8 }],
		'max-params': [1, { 'max': 8 }],
		'new-cap': 2,
		'new-parens': 2,
		'no-array-constructor': 2,
		'no-bitwise': 2,
		'no-caller': 2,
		'no-catch-shadow': 2,
		'no-constructor-return': 2,
		'no-else-return': [2, { allowElseIf: false }],
		'no-empty': [2, { allowEmptyCatch: true }],
		'no-empty-function': 2,
		'no-eval': 2,
		'no-extra-bind': 2,
		'no-extra-label': 2,
		'no-extra-parens': [2, 'all', { nestedBinaryExpressions: false, enforceForArrowConditionals: true }],
		'no-floating-decimal': 2,
		'no-implicit-coercion': [2, { boolean: false }],
		'no-implied-eval': 2,
		'no-lone-blocks': 2,
		'no-lonely-if': 2,
		'no-loop-func': 2,
		'no-loss-of-precision': 2,
		'no-mixed-operators': 2,
		'no-mixed-requires': [2, { allowCall: false }],
		'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
		'no-multi-spaces': [2, { exceptions: { Property: false } }],
		'no-multiple-empty-lines': [2, { max: 1 }],
		'no-nested-ternary': 2,
		'no-new': 2,
		'no-new-func': 2,
		'no-new-object': 2,
		'no-new-require': 2,
		'no-new-wrappers': 2,
		'no-octal': 2,
		'no-proto': 2,
		'no-redeclare': 2,
		'no-return-assign': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-shadow': [1, { builtinGlobals: true }],
		'no-shadow-restricted-names': 2,
		'no-throw-literal': 2,
		'no-trailing-spaces': 2,
		'no-undef-init': 2,
		'no-unmodified-loop-condition': 2,
		'no-unneeded-ternary': [2, { defaultAssignment: false }],
		'no-unreachable-loop': 2,
		'no-unused-expressions': 2,
		'no-unsafe-negation': [2, { enforceForOrderingRelations: true }],
		'no-use-before-define': [2, { functions: false, variables: false }],
		'no-useless-backreference': 2,
		'no-useless-call': 2,
		'no-useless-concat': 2,
		'no-useless-return': 2,
		'no-void': [2, { allowAsStatement: true }],
		'no-whitespace-before-property': 2,
		'object-curly-newline': [2, { multiline: true, consistent: true }],
		'object-curly-spacing': [2, 'always'],
		'object-property-newline': [2, { allowAllPropertiesOnSameLine: true }],
		'one-var-declaration-per-line': 2,
		'operator-assignment': 2,
		'operator-linebreak': 2,
		'padded-blocks': [2, 'never'],
		'prefer-promise-reject-errors': 2,
		'quote-props': [2, 'consistent'],
		'quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
		'radix': 2,
		'require-jsdoc': [2, { require: { ClassDeclaration: true, MethodDefinition: true } }],
		'semi': 2,
		'semi-spacing': 2,
		'semi-style': 2,
		'space-before-blocks': 2,
		'space-before-function-paren': [2, { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
		'space-in-parens': 2,
		'space-infix-ops': 2,
		'space-unary-ops': 2,
		// The //////// allows for the 10-slash delimiter we use in Angular controllers.
		'spaced-comment': [2, 'always', { block: { balanced: true }, line: { exceptions: ['/'] } }],
		'switch-colon-spacing': 2,
		'use-isnan': [2, { enforceForIndexOf: true }],
		'valid-jsdoc': [
			2,
			{
				matchDescription: '\\.$',
				preferType: {
					function: 'Function',
					boolean: 'Boolean',
					number: 'Number',
					integer: 'Number',
					int: 'Number',
					string: 'String',
					object: 'Object'
				},
				requireParamType: true,
				requireReturn: false
			}
		],
		'wrap-iife': [2, 'inside', { functionPrototypeMethods: true }],
		'yoda': 2,
	}
};
