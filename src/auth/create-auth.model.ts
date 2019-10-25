import { CreateEntityAbstract } from '../create-entity.abstract';

export class CreateAuthModel extends CreateEntityAbstract {
  public readonly userId!: string;

  public readonly token!: string;

  constructor(model: Partial<CreateAuthModel>) {
    super();
    Object.assign(this, model);
  }
}
