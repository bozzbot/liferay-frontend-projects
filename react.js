/**
 * © 2017 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: MIT
 */

'use strict';

const config = {
	extends: [require.resolve('./index')],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'react-hooks'],

	rules: {
		/**
		 * @see https://reactjs.org/docs/hooks-rules.html
		 */
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',

		/**
		 * @see https://github.com/yannickcr/eslint-plugin-react
		 */
		'react/jsx-key': 'error',
		'react/jsx-no-comment-textnodes': 'error',
		'react/jsx-no-duplicate-props': 'error',
		'react/jsx-no-undef': 'error',
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'react/no-children-prop': 'error',
		'react/no-danger-with-children': 'error',
		'react/no-direct-mutation-state': 'error',
		'react/no-is-mounted': 'error',
		'react/no-render-return-value': 'error',
		'react/no-string-refs': 'error',
		'react/no-unescaped-entities': 'error',
		'react/no-unknown-property': 'error',
		'react/require-render-return': 'error',
	},

	settings: {
		react: {
			version: 'detect',
		},
	},
};

module.exports = config;
