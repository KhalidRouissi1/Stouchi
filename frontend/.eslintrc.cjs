import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'

export default {
  extends: ['airbnb', 'airbnb-typescript', 'airbnbn-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    'react/react-in-jsx-scope': 1,
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
  },
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      languageOptions: { globals: globals.browser },
    },
    {
      files: ['**/*.js'],
      languageOptions: { sourceType: 'script' },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
  ],
}
