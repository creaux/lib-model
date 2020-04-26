import 'reflect-metadata';
import { MongoServer } from './mongo-server';
import { Injector } from './injector';

describe('MongoServer', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
  });

  it('should create server', async () => {
    const server = Injector.resolve<MongoServer>(MongoServer);
    expect(await server.ensureConnection()).toBeTruthy();
  });

  it('should provide uri', async () => {
    const server = Injector.resolve<MongoServer>(MongoServer);
    expect(typeof (await server.getUri())).toEqual('string');
  });
});
