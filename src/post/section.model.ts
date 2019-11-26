export class SectionModel {
  public id!: string;

  public name!: string;

  public constructor(model: SectionModel) {
    Object.assign(this, model);
  }
}
