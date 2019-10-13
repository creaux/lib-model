require('dotenv-flow').config({
  // eslint-disable-next-line @typescript-eslint/camelcase
  node_env: process.env.NODE_ENV === 'test' || !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV,
});

console.log(`INFO: NODE_ENV is ${process.env.NODE_ENV} \n`);
console.warn('WARNING: Make sure you have correct environment to make test working!');
