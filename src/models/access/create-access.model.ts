import { IAccessInfo } from 'accesscontrol';
import { IsString, IsBoolean, IsEnum } from 'class-validator';
import { BuilderInterface } from '../../generics/builder.interface';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { lorem } from 'faker';
import { randomEnum } from '../../enums/random-enum';

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

export abstract class CreateAccessBuilderAbstract {
  protected role!: string | string[];
  protected resource!: string | string[];
  protected attributes!: string | string[];
  protected action!: Action;
  protected possession!: Possession;
  protected denied!: boolean;
}

export class CreateAccessModelBuilder extends CreateAccessBuilderAbstract
  implements BuilderInterface<CreateAccessModel> {
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
    return this.mockRole()
      .mockResource()
      .mockAttributes()
      .mockAction()
      .mockPossession()
      .mockDenied()
      .build();
  }
}

@AssignMockeries(CreateAccessMockeries)
export class CreateAccessModel implements IAccessInfo {
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
