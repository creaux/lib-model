import { Types } from 'mongoose';
import { IsMongoId, IsString, IsEnum, IsBoolean } from 'class-validator';
import { AssignSchemaOptions, AssignSchema } from '../../framework/schema';
import { SchemaName } from '../../enums/schema-name';
import { AccessSchema } from '../../schemas/access/access.schema';
import { BuilderInterface } from '../../generics/builder.interface';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { lorem } from 'faker';
import { randomEnum } from '../../enums/random-enum';
import { IAccessInfo } from 'accesscontrol';

enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

enum Possession {
  OWN = 'own',
  ANY = 'any',
}

export abstract class AccessBuilderAbstract {
  protected id!: string;
  protected role!: string | string[];
  protected resource!: string | string[];
  protected attributes!: string | string[];
  protected action!: Action;
  protected possession!: Possession;
  protected denied!: boolean;
}

export class AccessModelBuilder extends AccessBuilderAbstract implements BuilderInterface<AccessModel> {
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

  build(): AccessModel {
    return new AccessModel({
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

export class AccessMockeries extends AccessModelBuilder implements MockeriesInterface<AccessModel> {
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

  mock(): AccessModel {
    return this.mockRole()
      .mockResource()
      .mockAttributes()
      .mockAction()
      .mockPossession()
      .mockDenied()
      .build();
  }
}

@AssignMockeries(AccessMockeries)
@AssignSchema(new AssignSchemaOptions(AccessSchema, SchemaName.ACCESS))
export class AccessModel implements IAccessInfo {
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

  constructor(model: AccessModel) {
    Object.assign(this, model);
  }
}
