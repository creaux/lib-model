import { QueryPopulateOptions } from 'mongoose';
import { BuilderInterface } from '../generics/builder.interface';
import { SchemaName } from '../enums/schema-name';

export class QueryPopulateOptionsBuilder implements BuilderInterface<QueryPopulateOptions> {
  private path!: string;
  private model!: SchemaName;
  private populate?: QueryPopulateOptions;

  public withPath(path: string): QueryPopulateOptionsBuilder {
    this.path = path;
    return this;
  }

  public withModel(model: SchemaName): QueryPopulateOptionsBuilder {
    this.model = model;
    return this;
  }

  public withPopulate(populate: QueryPopulateOptions): QueryPopulateOptionsBuilder {
    this.populate = populate;
    return this;
  }

  build(): QueryPopulateOptions {
    return { path: this.path, model: this.model, populate: this.populate };
  }
}
