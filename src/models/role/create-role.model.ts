import { IsString } from 'class-validator';

export class CreateRoleModel {
  public static MOCK_PROPERTIES = {
    name: 'Executive',
  };

  public static MOCK = new CreateRoleModel(CreateRoleModel.MOCK_PROPERTIES);

  @IsString()
  public readonly name!: string;

  constructor(model: CreateRoleModel) {
    Object.assign(this, model);
  }
}
