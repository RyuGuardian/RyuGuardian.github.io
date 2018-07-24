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
    'semi': ['error', 'always'],
    'keyword-spacing': ['warn', { 'overrides': {
      'if': { 'after': false },
      'for': { 'after': false },
      'while': { 'after': false }
    }}],
    'space-before-function-paren': ['warn', 'never'],
    'no-unused-vars': ['warn']
  }
}
