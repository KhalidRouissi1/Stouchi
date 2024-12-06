import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default {
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks'],
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
    ...pluginJs.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...pluginReact.configs.recommended.rules,
  },
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: globals.browser,
    },
    {
      files: ['**/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};
