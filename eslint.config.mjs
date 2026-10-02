export default [
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2022 },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
  { ignores: ['index.min.js', 'node_modules/', 'coverage/'] },
];
