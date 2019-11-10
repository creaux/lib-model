import { IsMongoId, IsString } from 'class-validator';

export class RoleModel {
  public static MOCK_PROPERTIES = {
    id: '5dc84787046b05067ec1adc5',
    name: 'Executive',
  };

  public static MOCK = new RoleModel(RoleModel.MOCK_PROPERTIES);

  @IsMongoId()
  public readonly id!: string;

  @IsString()
  public readonly name!: string;

  constructor(model: RoleModel) {
    Object.assign(this, model);
  }
}
