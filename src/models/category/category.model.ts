import { IsDefined, IsString } from 'class-validator';
import { lorem } from 'faker';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';

export abstract class CategoryBuilderAbstract {
  protected name!: string;
}

@Injectable()
export class CategoryModelBuilder extends CategoryBuilderAbstract implements BuilderInterface<CategoryModel> {
  withName(name: string) {
    this.name = name;
    return this;
  }

  build(): CategoryModel {
    return new CategoryModel({ name: this.name });
  }
}

@Injectable()
export class CategoryModelMockeries extends CategoryModelBuilder implements MockeriesInterface<CategoryModel> {
  mockName(): this {
    return this.withName(lorem.words(3));
  }

  mock(): CategoryModel {
    return this.mockName().build();
  }
}

@AssignMockeries(CategoryModelMockeries)
export class CategoryModel {
  @IsDefined()
  @IsString()
  public readonly name: string;

  constructor({ name }: CategoryModel) {
    this.name = name;
  }
}
