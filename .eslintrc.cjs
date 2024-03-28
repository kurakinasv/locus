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
  env: { browser: true, es2021: true },
  plugins: ['react-refresh', 'react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:compat/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: 'src',
      },
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'warn',
    'import/order': importOrderRule,

    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'off',

    'object-curly-newline': ['error', { consistent: true }],
    'max-len': [1, { code: 120 }],
    'prefer-const': 'warn',

    'react/jsx-key': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': ['off', { allowConstantExport: true }],

    '@typescript-eslint/no-unused-vars': 'off',

    'compat/compat': 'warn',
  },
};
