import { Mockeries } from './mockeries';
import { Schema, SchemaObject } from './schema';
import { Injectable } from './injector';
import { Mongoose, Schema as MongooseSchema, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BuilderInterface } from '../generics/builder.interface';
import { SchemaName } from '../enums/schema-name';
import { Constructor } from '../generics/constructor.type';

export enum Entity {
  POSTS = 'posts',
  SECTIONS = 'sections',
  USERS = 'users',
  ROLES = 'roles',
  ACCESS = 'accesses',
  AUTHS = 'auths',
  PRODUCTS = 'products',
  ORDERS = 'orders',
}

class Setup {
  constructor(public name: SchemaName, public schema: MongooseSchema) {}
}

class Resource {
  constructor(public setup: Setup, public data: any[], public model: Model<any>) {}
}

export class ResourceBuilder implements BuilderInterface {
  private schema!: MongooseSchema;
  private name!: SchemaName;
  private data!: any[];
  private model!: Model<any>;

  public withSchema(schema: MongooseSchema) {
    this.schema = schema;
    return this;
  }

  public withName(name: SchemaName) {
    this.name = name;
    return this;
  }

  public withData(docs: any[]) {
    this.data = docs;
    return this;
  }

  public withModel(model: Model<any>) {
    this.model = model;
    return this;
  }

  public build(): Resource {
    return new Resource(new Setup(this.name, this.schema), this.data, this.model);
  }
}

@Injectable()
class Server {
  private server: MongoMemoryServer;

  constructor() {
    this.server = new MongoMemoryServer();
  }

  public get connectionString(): Promise<string> {
    return this.server.getConnectionString();
  }

  public get ensureConnection() {
    return this.server.ensureInstance();
  }

  public stop() {
    return this.server.stop();
  }
}

@Injectable()
class Wire {
  private mongoose: Mongoose;

  constructor(private server: Server) {
    this.mongoose = new Mongoose();
  }

  public async connect() {
    const connectionString = await this.server.connectionString;
    try {
      return await this.mongoose.connect(connectionString);
    } catch (error) {
      throw new Error(error);
    }
  }

  public stop() {
    return this.server.stop();
  }
}

@Injectable()
export class MockeriesFiber {
  constructor(protected mockeries: Mockeries) {}

  public prepareMockeries(target: Constructor, count = 0) {
    return this.mockeries.prepare(target, count);
  }

  public retrieveMockeries(target: Constructor) {
    return this.mockeries.resolve(target);
  }

  public cleanMockeries(target: Constructor) {
    return this.mockeries.clean(target);
  }
}

@Injectable()
export class Fiber extends MockeriesFiber {
  protected resources: Map<Constructor, Resource>;

  private connect() {
    return this.wire.connect();
  }

  constructor(mockeries: Mockeries, private schema: Schema, private wire: Wire) {
    super(mockeries);
    this.resources = new Map<Constructor, Resource>();
  }

  public retrieveMockFromModel(target: Constructor, count = 1) {
    this.prepareMockeries(target, count);
    return this.retrieveMockeries(target);
  }

  public async createFromModel(target: Constructor, count = 1) {
    const connection = await this.connect();
    this.prepareMockeries(target, count);
    const data = this.retrieveMockeries(target);
    const schema = this.schema.resolve(target);
    const model = connection.model(schema.name, schema.schema);
    const resource = new ResourceBuilder()
      .withName(schema.name)
      .withSchema(schema.schema)
      .withData(data as any[])
      .withModel(model)
      .build();

    try {
      await model.collection.insertMany(resource.data);
    } catch (error) {
      throw new Error(error);
    }

    this.resources.set(target, resource);
  }

  public retrieveFromMongo(target: Constructor, populate: SchemaName[] = []) {
    if (this.resources.has(target)) {
      const resource: Resource = this.resources.get(target) as Resource;
      const finden = resource.model.find();
      for (const schemaName in populate) {
        finden.populate(schemaName);
      }
      return finden.lean().exec();
    }
  }

  public retrieveFromCache(target: Constructor) {
    if (this.resources.has(target)) {
      const resource: Resource = this.resources.get(target) as Resource;
      return resource.data;
    }
  }

  public tearDown() {
    for (const [target] of this.resources.entries()) {
      this.mockeries.clean(target);
    }
    return this.wire.stop();
  }
}
