// Running only under NPM installation
module.exports = () => ({
  env: {
    type: 'node'
  },
  files: ['src/**/*.ts', { pattern: 'src/**/*.spec.ts', ignore: true }],
  testFramework: 'jest',
  tests: ['src/**/*.spec.ts']
});
