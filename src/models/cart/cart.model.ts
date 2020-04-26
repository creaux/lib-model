import { IsArray, IsDefined, IsInstance, IsMongoId, ValidateNested } from 'class-validator';
import { UserMockeries, UserModel } from '../user/user.model';
import { AssignMockeries, MockeriesInterface, Retrieve } from '../../framework/mockeries';
import { Types } from 'mongoose';
import { BuilderInterface } from '../../generics/builder.interface';
import { ProductMockeries, ProductModel } from '../../models/product/product.model';
import { Injectable } from '../../framework/injector';
import { AssignSchema, AssignSchemaOptions } from '../../framework/schema';
import { SchemaName } from '../../enums/schema-name';
import { CartSchema } from '../../schemas/cart/cart.schema';
const { assign } = Object;

export abstract class CartBuilderAbstract {
  protected id!: string;
  protected products!: ProductModel[];
  protected user!: UserModel;
}

@Injectable()
export class CartBuilder extends CartBuilderAbstract implements BuilderInterface<CartModel> {
  withId(id: string) {
    this.id = id;
    return this;
  }

  withProducts(products: ProductModel[]) {
    this.products = products;
    return this;
  }

  withUser(user: UserModel) {
    this.user = user;
    return this;
  }

  build(): CartModel {
    return new CartModel({ id: this.id, products: this.products, user: this.user });
  }
}

@Injectable()
export class CartMockeries extends CartBuilder implements MockeriesInterface<CartModel> {
  mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  @Retrieve(ProductModel)
  mockProducts(productModel: ProductModel[]) {
    return this.withProducts(productModel);
  }

  @Retrieve(UserModel)
  mockUser(userModel: UserModel) {
    return this.withUser(userModel);
  }

  mock(): CartModel {
    return (
      this.mockId()
        // @ts-ignore
        .mockProducts()
        // @ts-ignore
        .mockUser()
        .build()
    );
  }
}

@AssignMockeries(CartMockeries)
@AssignSchema(new AssignSchemaOptions(CartSchema, SchemaName.CART))
export class CartModel {
  @IsDefined()
  @IsMongoId()
  public readonly id!: string;

  @IsInstance(ProductModel, { each: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  public readonly products!: ProductModel[];

  @IsInstance(UserModel)
  @IsDefined()
  public readonly user!: UserModel;

  constructor(model: CartModel) {
    assign(this, model);
  }
}
