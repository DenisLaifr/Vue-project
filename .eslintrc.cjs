module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    "plugin:prettier/recommended",
    '@vue/typescript/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-explicit-any': "warn",
  }
}
