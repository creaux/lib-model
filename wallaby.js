module.exports = () => ({
  files: ['src/**/*.ts', { pattern: 'src/**/*.spec.ts', ignore: true }],
  tests: ['src/**/*.spec.ts'],
  env: {
    type: 'node'
  },
  testFramework: 'ava'
});
