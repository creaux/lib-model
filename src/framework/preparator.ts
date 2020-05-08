import { Mockeries } from './mockeries';
import { Schema } from './schema';
import { Injectable } from './injector';
import { Schema as MongooseSchema, Model } from 'mongoose';
import { BuilderInterface } from '../generics/builder.interface';
import { SchemaName } from '../enums/schema-name';
import { Constructor } from '../generics/constructor.type';
import { MongooseConnector } from './mongoose-connector';
import { AssignReadUpdateOptions, ReadUpdate } from './readUpdate';

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
export class Fiber {
  protected resources: Map<Constructor, Resource>;

  private connect() {
    return this.wire.connect();
  }

  constructor(private mockeries: Mockeries, private wire: MongooseConnector) {
    this.resources = new Map<Constructor, Resource>();
  }

  public retrieveFromModel<T extends object | object[]>(target: Constructor, count = 1): T {
    this.mockeries.prepare(target, count);
    return this.mockeries.resolve<T>(target);
  }

  public async createFromModel(target: Constructor, count = 0) {
    const connection = await this.connect();
    this.mockeries.prepare(target, count);
    const data = this.mockeries.resolve(target);
    const schema = Schema.resolve(target);
    const model = connection.model(schema.name, schema.schema);
    const resourceBuilder = new ResourceBuilder()
      .withName(schema.name)
      .withSchema(schema.schema)
      .withModel(model);

    if (Array.isArray(data)) {
      resourceBuilder.withData(data as any[]);
    } else {
      resourceBuilder.withData([data]);
    }

    const resource = resourceBuilder.build();

    try {
      await model.insertMany(resource.data);
    } catch (error) {
      throw new Error(`${Fiber.name}: model insertAll - ${error}`);
    }

    this.resources.set(target, resource);

    // TODO: This should be extracted
    const readUpdate: AssignReadUpdateOptions = ReadUpdate.resolve(target);
    if (readUpdate && readUpdate.read) {
      this.mockeries.use(readUpdate.read, data);

      // TODO
      if (readUpdate.update) {
        this.mockeries.use(readUpdate.update, data);
      }
    }
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

  public tearDown() {
    for (const [target] of this.resources.entries()) {
      this.mockeries.clean(target);
    }
    return this.wire.stop();
  }

  public get dbUri(): Promise<string> {
    return this.wire.uri;
  }
}
