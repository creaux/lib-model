import { IsArray, IsMongoId, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export abstract class UserAbstract {
  @IsString()
  public readonly forname!: string;

  @IsString()
  public readonly surname!: string;

  @IsString()
  public readonly email!: string;

  @IsMongoId()
  public readonly id!: string;

  @IsString()
  @Exclude()
  public readonly password!: string;
}
