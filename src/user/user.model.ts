export class UserModel {
  public constructor(
    public readonly _id: any,
    public readonly forname: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
