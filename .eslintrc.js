module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    '@react-native-community',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/no-unused-modules': [1, { unusedExports: true }],
        'import/extensions': [
          'error',
          {
            js: 'ignorePackages',
            jsx: 'ignorePackages',
            ts: 'ignorePackages',
            tsx: 'ignorePackages',
            json: 'always',
          },
        ],
        'import/prefer-default-export': 'off',
        'no-continue': 'off', // enable for-loop control statements
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'], // enable for-loops
        'no-shadow': 'off',
        'no-undef': 'off',
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.jsx', '.tsx'],
          },
        ],
        'react/jsx-props-no-spreading': [
          'error',
          {
            custom: 'ignore',
          },
        ],
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
        'react/require-default-props': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        // Always try to resolve types under `<root>@types` directory
        // even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
      },
    },
  },
};
