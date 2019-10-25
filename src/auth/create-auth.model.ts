import { CreateEntityAbstract } from '../create-entity.abstract';

export class CreateAuthModel extends CreateEntityAbstract {
  public static MOCK_PROPERTIES = {
    userId: 'abc',
    token: 'abc',
  };

  public static MOCK = new CreateAuthModel(CreateAuthModel.MOCK_PROPERTIES);

  public readonly userId!: string;

  public readonly token!: string;

  constructor(model: Partial<CreateAuthModel>) {
    super();
    Object.assign(this, model);
  }
}
