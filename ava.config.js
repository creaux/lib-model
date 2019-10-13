export default {
  files: ['./src/**/*.spec.ts', './src/**/spec.ts'],
  compileEnhancements: false,
  extensions: ['ts'],
  require: ['ts-node/register', './src/env.ts'],
};
