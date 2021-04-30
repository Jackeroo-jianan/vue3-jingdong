module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-trailing-spaces':'off',
    'indent':'off',
    'spaced-comment':'off',
    'no-trailing-spaces':'off',
    'no-new':'off',
    'key-spacing':'off',
    'comma-dangle':'off',
    'eol-last':'off',
    'quotes':'off',
    'semi':'off',
    'keyword-spacing':'off',
    'space-before-blocks':'off',
    'comma-spacing':'off',
    'space-before-function-paren':'off',
    'space-infix-ops':'off',
    'no-multiple-empty-lines':'off',
    'block-spacing':'off',
    'padded-blocks':'off',
    'arrow-spacing':'off',
    'no-sequences':'off',
    'no-unused-expressions':'off',
    'no-multi-spaces':'off',
    'no-unused-vars':'off',
    'camelcase ':'off',
    'object-curly-newline':'off',
    'object-property-newline':'off',
    'prefer-const':'off'
 }
}
