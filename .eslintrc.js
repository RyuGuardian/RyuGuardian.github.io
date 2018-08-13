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
    'space-in-parens': 'warn',
    'operator-linebreak': ['warn', 'before', { 'overrides': { '?': 'ignore', ':': 'ignore' } }],
    'space-before-blocks': 'warn',

    'vue/require-prop-types': 'warn',
    'vue/valid-v-on': 'off',
    'vue/html-indent': ['warn', 2, { 'alignAttributesVertically': false }],
    'vue/order-in-components': 'warn',
    'vue/no-multi-spaces': 'off',
    'vue/return-in-computed-property': 'warn',
    'vue/max-attributes-per-line': [
      'warn',
      { 'singleline': 3,
        'multiline': {
          'max': 3,
          'allowFirstLine': true
        }
    }],
    'vue/attributes-order': ['warn', { order: [
      'DEFINITION',
      'LIST_RENDERING',
      'CONDITIONALS',
      'RENDER_MODIFIERS',
      'UNIQUE',
      'GLOBAL',
      'TWO_WAY_BINDING',
      'OTHER_DIRECTIVES',
      'OTHER_ATTR',
      'EVENTS',
      'CONTENT'
    ]}]
  }
}
