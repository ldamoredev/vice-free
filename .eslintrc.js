module.exports = {
  root: true,
  extends: ['@react-native-community'],
  ignorePatterns: [
    '.bundle/',
    'dist/',
    'android/',
    'ios/',
    'node_modules/',
    '**/node_modules/',
    '/**/node_modules/*',
  ],
  overrides: [
    {
      files: ['*.ts','*.tsx','*.js','*.jsx'],
    },
  ],
  rules: {
    'semi': ['error', 'never'],
    'curly': ['error', 'multi-line'],
    'object-curly-spacing': [ 'error', 'always' ],
    'dot-notation': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unstable-nested-components': 'off',
    'react-native/no-inline-styles': 'off',
    'no-new': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-unused-vars': [
      'warn', {
        'vars': 'all',
        'args': 'none',
        'ignoreRestSiblings': false,
      }],
    'prettier/prettier': 'off',
  },
}
