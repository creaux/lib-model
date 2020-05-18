import { Injectable } from './injector';
import { Mongoose } from 'mongoose';
import { MongoServer } from './mongo-server';

@Injectable()
export class MongooseConnector {
  private mongoose: Mongoose;

  constructor(private server: MongoServer) {
    this.mongoose = new Mongoose();
  }

  public async connect() {
    try {
      const connectionString: string = await this.server.getUri();
      return await this.mongoose.connect(connectionString);
    } catch (error) {
      throw new Error(error);
    }
  }

  public stop(): Promise<boolean> {
    return this.server.stop();
  }

  public get uri(): Promise<string> {
    return this.server.getUri();
  }
}
