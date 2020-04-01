import { IAccessInfo } from 'accesscontrol';
import { IsString, IsBoolean } from 'class-validator';

export class CreateAccessModel implements IAccessInfo {
  @IsString({ each: true })
  public readonly role!: string | string[];

  @IsString({ each: true })
  public readonly resource!: string | string[];

  @IsString({ each: true })
  public readonly attributes!: string | string[];

  @IsString()
  public readonly action!: string;

  @IsString()
  public readonly possession!: string;

  @IsBoolean()
  public readonly denied!: boolean;

  constructor(model: CreateAccessModel) {
    Object.assign(this, model);
  }
}
