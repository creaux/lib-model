import { lorem } from 'faker';
import { Types } from 'mongoose';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { AssignSchema, SchemaObject } from '../..';
import { SectionSchema } from '../../schemas/section/section.schema';
import { SchemaName } from '../../enums/schema-name';

export abstract class SectionBuilderAbstract {
  protected id!: string;
  protected name!: string;
}

@Injectable()
export class SectionBuilder extends SectionBuilderAbstract implements BuilderInterface<SectionModel> {
  withId(id: string) {
    this.id = id;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  build(): SectionModel {
    return new SectionModel({ id: this.id, name: this.name });
  }
}

@Injectable()
export class SectionMockeries extends SectionBuilder implements MockeriesInterface<SectionModel> {
  mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  mockName() {
    return this.withName(lorem.words());
  }

  mock(): SectionModel {
    return this.mockId()
      .mockName()
      .build();
  }
}

@AssignMockeries(SectionMockeries)
@AssignSchema(new SchemaObject(SectionSchema, SchemaName.SECTION))
export class SectionModel {
  public id!: string;

  public name!: string;

  public constructor(model: SectionModel) {
    Object.assign(this, model);
  }
}
