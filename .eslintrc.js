module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'prettier',
    'standard',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: [
    'prettier',
    'import',
    'simple-import-sort',
    '@typescript-eslint',
    'security',
  ],
  rules: {
    'no-duplicate-imports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // External packages related packages come first.
          ['^express$', '^\\w', '^@?\\w'],
          // Internal packages.
          [
            '^@/.*|$',
            '^@interfaces/.*|$',
            '^@constants/.*|$',
            '^@configs/?.*|$',
            '^@utils/.*|$',
            '^@databases/.*|$',
            '^@routes/.*|$',
            '^@app/?.*|$',
            '^@middleware/.*|$',
            '^@exceptions/.*|$',
            '^@request/.*|$',
            '^@controllers/.*|$',
            '^@models/.*|$',
            '^@services/.*|$',
          ],
          [
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Style imports.
          ['^.+\\.s?css$'],
          // Side effect imports.
          ['^\\u0000'],
        ],
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        semi: false,
        trailingComma: 'all',
        endOfLine: 'lf',
        tabWidth: 2,
        singleQuote: true,
        printWidth: 80,
        useTabs: false,
      },
    ],
    'no-console': 'warn',
    'newline-before-return': 1,
    'no-useless-return': 1,
    'prefer-const': 1,
    'no-unused-vars': 0,
    'no-throw-literal': 0,
    'import/no-unresolved': 'error',
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}
