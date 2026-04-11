module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['prisma.config.ts', '**/*.test.ts'],
        packageDir: ['.', './server', './worker'],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
  },
};
