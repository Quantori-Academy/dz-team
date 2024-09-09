import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		files: ['packages/be/**/*.{ts,tsx}'],
		extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.node,
			parserOptions: {
				project: ['./packages/be/tsconfig.json'],
			},
		},
		rules: {
			'require-await': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
		},
	},
	{
		files: ['packages/fe/**/*.{ts,tsx}'],
		ignores: ['packages/fe/vite.config.ts'],
		extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
			parserOptions: { project: ['./packages/fe/tsconfig.json'] },
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
	},
)
