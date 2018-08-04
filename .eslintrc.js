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
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'indent': 'warn',
    'eol-last': 'warn',
    'no-multiple-empty-lines': 'warn',
    'brace-style': ['warn', 'stroustrup', { 'allowSingleLine': false }],
    'comma-dangle': 'warn',
    'padded-blocks': 'warn',
    'spaced-comment': 'warn',

    'vue/require-prop-types': 'warn',
    'vue/valid-v-on': 'off',
    'vue/html-indent': 'warn',
    'vue/attributes-order': 'warn',
    'vue/order-in-components': 'warn',
    'vue/no-multi-spaces': 'off',
    'vue/max-attributes-per-line': [
      'warn',
      { 'singleline': 3,
        'multiline': {
          'max': 3,
          'allowFirstLine': true
        }
    }]
  }
}
