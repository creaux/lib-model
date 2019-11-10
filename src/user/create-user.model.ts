import { IsString } from 'class-validator';
import { CreateEntityAbstract } from '../create-entity.abstract';

export class CreateUserModel extends CreateEntityAbstract {
  @IsString()
  public readonly forname!: string;

  @IsString()
  public readonly surname!: string;

  @IsString()
  public readonly email!: string;

  @IsString()
  public readonly password!: string;

  @IsString()
  public readonly roles!: string[];

  public constructor(data: Partial<CreateUserModel>) {
    super();
    Object.assign(this, data);
  }
}
