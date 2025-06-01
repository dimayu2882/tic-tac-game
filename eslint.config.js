import { defineConfig } from 'eslint-define-config';
import js from '@eslint/js';

export default defineConfig([
	{
		ignores: ["dist/**"],
	},
	{
		files: ['**/*.js'],
		...js.configs.recommended,
		rules: {
			'semi': ['error', 'always'],
			'quotes': ['error', 'single'],
			'no-unused-vars': 'warn',
			'no-undef': 'error',
			'indent': ['error', 'tab'],
		},
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				document: 'readonly',
				window: 'readonly',
				globalThis: 'readonly',
				MutationObserver: 'readonly',
				fetch: 'readonly',
				Event: 'readonly',
				console: 'readonly',
				navigator: 'readonly',
				require: 'readonly',
				module: 'readonly',
				__dirname: 'readonly',
				setTimeout: "readonly",
				clearTimeout: "readonly",
			},
		},
	},
]);
