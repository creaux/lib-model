import { MongoMemoryServer } from 'mongodb-memory-server';
import { Injectable } from './injector';

@Injectable()
export class MongoServer {
  private server: MongoMemoryServer;

  constructor() {
    this.server = new MongoMemoryServer({
      instance: {
        port: 27017,
        ip: '::,0.0.0.0',
        dbName: 'test',
      },
    });
  }

  public async getUri(): Promise<string> {
    const uri = await this.server.getUri();
    console.log(`MONGODB URI IS: ${uri}`);
    return uri;
  }

  public ensureConnection() {
    return this.server.ensureInstance();
  }

  public stop(): Promise<boolean> {
    return this.server.stop();
  }
}
