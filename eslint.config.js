import common from 'eslint-config-neon/common';
import mod from 'eslint-config-neon/module';
import noDeprecated from 'eslint-config-neon/no-deprecated';
import node from 'eslint-config-neon/node';
import prettier from 'eslint-config-neon/prettier';
import typescript from 'eslint-config-neon/typescript';
import merge from 'lodash.merge';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/**
 * @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray}
 */
const config = [
	{
		ignores: ['.yarn/**']
	},
	...[...common, ...typescript, ...prettier, ...mod, ...noDeprecated, ...node].map((config) =>
		merge(config, {
			files: ['src/**/*.ts'],
			languageOptions: {
				parserOptions: {
					project: 'tsconfig.base.json'
				}
			},
			rules: {
				'import/order': 'off',
				'@typescript-eslint/consistent-type-definitions': 'off'
			}
		})
	),
	eslintPluginPrettierRecommended
];

export default config;
