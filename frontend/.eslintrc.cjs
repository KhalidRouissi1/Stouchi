import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';

export default {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json', // Ensure your tsconfig.json is correctly set up
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
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
};
