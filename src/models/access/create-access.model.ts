import { IAccessInfo } from 'accesscontrol';
import { IsBoolean, IsEnum, IsMongoId, IsString } from 'class-validator';
import { BuilderInterface } from '../../generics/builder.interface';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { lorem } from 'faker';
import { randomEnum } from '../../enums/random-enum';
import { AssignSchema, AssignSchemaOptions } from '../../framework/schema';
import { AccessSchema } from '../../schemas/access/access.schema';
import { SchemaName } from '../../enums/schema-name';
import { Injectable } from '../../framework/injector';
import { Types } from 'mongoose';
import { Action, Possession } from './access.model';

export abstract class CreateAccessBuilderAbstract {
  protected id!: string;
  protected role!: string | string[];
  protected resource!: string | string[];
  protected attributes!: string | string[];
  protected action!: Action;
  protected possession!: Possession;
  protected denied!: boolean;
}

export class CreateAccessModelBuilder extends CreateAccessBuilderAbstract
  implements BuilderInterface<CreateAccessModel> {
  withId(id: string) {
    this.id = id;
    return this;
  }

  withRole(role: string | string[]) {
    this.role = role;
    return this;
  }

  withResource(resource: string | string[]) {
    this.resource = resource;
    return this;
  }

  withAttributes(attributes: string | string[]) {
    this.attributes = attributes;
    return this;
  }

  withAction(action: Action) {
    this.action = action;
    return this;
  }

  withPossession(possession: Possession) {
    this.possession = possession;
    return this;
  }

  withDenied(denied: boolean) {
    this.denied = denied;
    return this;
  }

  build(): CreateAccessModel {
    return new CreateAccessModel({
      id: this.id,
      role: this.role,
      resource: this.resource,
      attributes: this.attributes,
      action: this.action,
      possession: this.possession,
      denied: this.denied,
    });
  }
}

export class CreateAccessMockeries extends CreateAccessModelBuilder implements MockeriesInterface<CreateAccessModel> {
  mockId() {
    this.withId(Types.ObjectId().toHexString());
    return this;
  }

  mockRole() {
    this.withRole(lorem.word());
    return this;
  }

  mockResource() {
    this.withResource('act');
    return this;
  }

  mockAttributes() {
    this.withAttributes(lorem.word());
    return this;
  }

  mockAction() {
    this.withAction(randomEnum<Action>(Action));
    return this;
  }

  mockPossession() {
    this.withPossession(randomEnum<Possession>(Possession));
    return this;
  }

  mockDenied() {
    this.withDenied(false);
    return this;
  }

  mock(): CreateAccessModel {
    return this.mockId()
      .mockRole()
      .mockResource()
      .mockAttributes()
      .mockAction()
      .mockPossession()
      .mockDenied()
      .build();
  }

  statics() {
    return [
      // this.withId('5ec2cbe5fd5301a882bc7d81')
      //   .withRole(['Anonymous'])
      //   .withResource('user')
      //   .mockAttributes()
      //   .withAction(Action.CREATE)
      //   .withPossession(Possession.ANY)
      //   .withDenied(true)
      //   .build(),
      this.withId('5ec065ca4a245a7b91d6ba03')
        .withRole(['Admin'])
        .withResource('user')
        .withAttributes(['*'])
        .withAction(Action.CREATE)
        .withPossession(Possession.ANY)
        .withDenied(false)
        .build(),
      this.withId('5ec1a3e02a7218e03a71c99f')
        .withRole(['Admin', 'Anonymous'])
        .withResource('user')
        .withAttributes('*')
        .withAction(Action.READ)
        .withPossession(Possession.ANY)
        .withDenied(false)
        .build(),
      this.withId('5ec8fb585a6aa6d95cb8cadd')
        .withRole(['Admin'])
        .withResource('user')
        .withAttributes(['*'])
        .withAction(Action.UPDATE)
        .withPossession(Possession.ANY)
        .withDenied(false)
        .build(),
      this.withId('5ec8fb5f1d087a3024d3c7e7')
        .withRole(['Admin'])
        .withResource('user')
        .withAttributes(['*'])
        .withAction(Action.DELETE)
        .withPossession(Possession.ANY)
        .withDenied(false)
        .build(),
    ];
  }
}

@AssignMockeries(CreateAccessMockeries)
@AssignSchema(new AssignSchemaOptions(AccessSchema, SchemaName.ACCESS))
@Injectable()
export class CreateAccessModel implements IAccessInfo {
  @IsMongoId()
  public readonly id!: string;

  @IsString({ each: true })
  public readonly role!: string | string[];

  @IsString({ each: true })
  public readonly resource!: string | string[];

  @IsString({ each: true })
  public readonly attributes!: string | string[];

  @IsEnum(Action)
  public readonly action!: Action;

  @IsEnum(Possession)
  public readonly possession!: Possession;

  @IsBoolean()
  public readonly denied!: boolean;

  constructor(model: CreateAccessModel) {
    Object.assign(this, model);
  }
}
