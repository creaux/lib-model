import { IsMongoId, IsString } from 'class-validator';
import { Injectable } from '../../framework/injector';
import { BuilderInterface } from '../../generics/builder.interface';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { Types } from 'mongoose';
import { lorem } from 'faker';
import { AssignSchema, AssignSchemaOptions } from '../../framework/schema';
import { RoleSchema } from '../../schemas/role/role.schema';
import { SchemaName } from '../../enums/schema-name';
import { AssignReadUpdate, AssignReadUpdateOptions } from '../../framework/readUpdate';
import { RoleModel } from './role.model';

export abstract class CreateRoleBuilderAbstract {
  protected id!: string;
  protected name!: string;
}

@Injectable()
export class CreateRoleModelBuilder extends CreateRoleBuilderAbstract implements BuilderInterface<CreateRoleModel> {
  public withId(id: string) {
    this.id = id;
    return this;
  }

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public build(): CreateRoleModel {
    return new CreateRoleModel({ id: this.id, name: this.name });
  }
}

@Injectable()
export class CreateRoleModelMockeries extends CreateRoleModelBuilder implements MockeriesInterface<CreateRoleModel> {
  public mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  public mockName() {
    return this.withName(lorem.word());
  }

  mock(): CreateRoleModel {
    return this.mockId()
      .mockName()
      .build();
  }

  statics() {
    return [
      this.withId('5e17734e841b06a773bd300b')
        .withName('Anonymous')
        .build(),
      this.withId('5ec1a27d634e59e52fe0a6ab')
        .withName('Admin')
        .build(),
    ];
  }
}

@AssignReadUpdate(new AssignReadUpdateOptions(RoleModel))
@AssignSchema(new AssignSchemaOptions(RoleSchema, SchemaName.ROLE))
@AssignMockeries(CreateRoleModelMockeries)
@Injectable()
export class CreateRoleModel {
  @IsMongoId()
  public readonly id!: string;

  @IsString()
  public readonly name!: string;

  constructor(model: CreateRoleModel) {
    Object.assign(this, model);
  }
}