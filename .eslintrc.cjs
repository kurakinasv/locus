const path = require('path');

const importOrderRule = [
  'warn',
  {
    groups: ['builtin', 'external', 'internal'],
    pathGroups: [
      {
        pattern: 'react',
        group: 'external',
        position: 'before',
      },
      {
        pattern: '*.svg?react',
        group: 'internal',
        patternOptions: { matchBase: true },
        position: 'after',
      },
      {
        pattern: '*.module.scss',
        group: 'index',
        patternOptions: { matchBase: true },
        position: 'after',
      },
    ],
    pathGroupsExcludedImportTypes: ['react'],
    'newlines-between': 'always',
    alphabetize: {
      order: 'asc',
      caseInsensitive: true,
    },
  },
];

module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve('./tsconfig.paths.json'),
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',

    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'off',

    'object-curly-newline': ['error', { consistent: true }],
    'max-len': [1, { code: 120 }],
    'prefer-const': 'warn',

    'react/jsx-key': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',

    '@typescript-eslint/no-unused-vars': 'off',

    'compat/compat': 'warn',

    'import/order': importOrderRule,
    'import/no-named-as-default-member': 'off',
  },
};
