import { IsMongoId, IsString } from 'class-validator';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { lorem } from 'faker';
import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { RolesEnum } from '../../enums/role.enum';

export abstract class RoleBuilderAbstract {
  protected id!: string;
  protected name!: string;
}

@Injectable()
export class RoleModelBuilder extends RoleBuilderAbstract implements BuilderInterface<RoleModel> {
  public withId(id: string) {
    this.id = id;
    return this;
  }

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public build(): RoleModel {
    return new RoleModel({ id: this.id, name: this.name });
  }
}

@Injectable()
export class RoleModelMockerizer extends RoleModelBuilder implements MockeriesInterface<RoleModel> {
  public mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  public mockName() {
    return this.withName(lorem.word());
  }

  mock() {
    return this.mockId()
      .mockName()
      .build();
  }
}

// TODO We have to create all four roles in db and session
@AssignMockeries(RoleModelMockerizer)
export class RoleModel {
  @ApiModelProperty({
    type: String,
    example: Types.ObjectId().toHexString(),
  })
  @IsMongoId()
  public readonly id!: string;

  @ApiModelProperty({
    type: String,
    example: RolesEnum.ADMIN,
  })
  @IsString()
  public readonly name!: string;

  constructor(model: RoleModel) {
    Object.assign(this, model);
  }
}
