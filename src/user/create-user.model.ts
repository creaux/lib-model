export class CreateUserModel {
  constructor(
    public readonly forname: string,
    public readonly surname: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}