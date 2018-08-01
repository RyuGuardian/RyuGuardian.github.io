module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },

  plugins: [
    'vue'
  ],

  extends: [
    'standard',
    'plugin:vue/recommended'
  ],

  rules: {
    'semi': ['warn', 'always'],
    'keyword-spacing': ['warn', { 'overrides': {
      'if': { 'after': false },
      'for': { 'after': false },
      'while': { 'after': false }
    }}],
    'space-before-function-paren': ['warn', 'never'],
    'no-unused-vars': ['warn'],
    'quotes': 'off',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'indent': 'warn',
    'eol-last': 'warn',
    'no-multiple-empty-lines': 'warn',
    'brace-style': ['warn', 'stroustrup', { 'allowSingleLine': false }],

    'vue/require-prop-types': 'warn',
    'vue/valid-v-on': 'off',
    'vue/html-indent': 'warn',
    'vue/attributes-order': 'warn',
    'vue/max-attributes-per-line': [
      'warn',
      { 'singleline': 3,
        'multiline': {
          'max': 1,
          'allowFirstLine': true
        }
    }]
  }
}
