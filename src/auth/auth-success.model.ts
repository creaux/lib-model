import { IsMongoId, IsDateString, IsString } from 'class-validator';

// TODO: Rename to AuthModel
export class AuthSuccessModel {
  public static MOCK_PROPERTIES = {
    id: '5da613e7fb53194dbfbf32de',
    createdAt: '2019-10-15T18:45:59.565Z',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2FyZWxAdm9tYWNrYS5jeiIsImlhdCI6MTU3MTE2NTE1OX0.ih5PGF04BBOcQlozmfd9DoyKgP4VzFYZh59aD02S3vw',
    userId: '000000000000000000000a00',
  };
  public static MOCK: AuthSuccessModel = new AuthSuccessModel({
    id: AuthSuccessModel.MOCK_PROPERTIES.id,
    token: AuthSuccessModel.MOCK_PROPERTIES.token,
    userId: AuthSuccessModel.MOCK_PROPERTIES.userId,
    createdAt: AuthSuccessModel.MOCK_PROPERTIES.createdAt,
  });

  @IsMongoId()
  public readonly id?: string;

  @IsString()
  public readonly token!: string;

  @IsString()
  public readonly userId!: string;

  @IsDateString()
  public readonly createdAt?: string;

  public constructor(partial: Partial<AuthSuccessModel>) {
    Object.assign(this, partial);
  }
}
