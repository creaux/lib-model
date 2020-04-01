import { IsArray, IsDateString, IsDefined, IsEnum, IsInstance, IsMongoId, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderProcess } from '../../enums/order-process.enum';
import { PaymentMockeries, PaymentModel } from '../payment/payment.model';
import { BuilderInterface } from '../../generics/builder.interface';
import { UserMockeries, UserModel } from '../user/user.model';
import { ProductMockeries, ProductModel } from '../product/product.model';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';

export abstract class OrderBuilderAbstract {
  protected id!: string;
  protected user!: UserModel;
  protected products!: ProductModel[];
  protected createdAt!: string;
  protected process!: OrderProcess;
  protected payment!: PaymentModel;
}

@Injectable()
export class OrderBuilder extends OrderBuilderAbstract implements BuilderInterface<OrderModel> {
  withId(id: string) {
    this.id = id;
    return this;
  }

  withUser(user: UserModel) {
    this.user = user;
    return this;
  }

  withProducts(products: ProductModel[]) {
    this.products = products;
    return this;
  }

  withCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
    return this;
  }

  withProcess(process: OrderProcess) {
    this.process = process;
    return this;
  }

  withPayment(payment: PaymentModel) {
    this.payment = payment;
    return this;
  }

  build(): OrderModel {
    return new OrderModel({
      id: this.id,
      user: this.user,
      products: this.products,
      createdAt: this.createdAt,
      process: this.process,
      payment: this.payment,
    });
  }
}

@Injectable()
export class OrderMockeries extends OrderBuilder implements MockeriesInterface<OrderModel> {
  constructor(
    private productMockeries: ProductMockeries,
    private userMockeries: UserMockeries,
    private paymentMockeries: PaymentMockeries,
  ) {
    super();
  }

  mockId() {
    return this.withId(Types.ObjectId().toHexString());
  }

  mockUser() {
    return this.withUser(this.userMockeries.mock());
  }

  mockProducts() {
    return this.withProducts([this.productMockeries.mock()]);
  }

  mockCreatedAt() {
    return this.withCreatedAt(new Date().toDateString());
  }

  mockProcess() {
    return this.withProcess(OrderProcess.UNPAID);
  }

  mockPayment() {
    return this.withPayment(this.paymentMockeries.mock());
  }

  mock(): OrderModel {
    return this.mockId()
      .mockUser()
      .mockProducts()
      .mockCreatedAt()
      .mockProcess()
      .mockPayment()
      .build();
  }
}

@AssignMockeries(OrderMockeries)
export class OrderModel {
  @ApiModelProperty({
    required: true,
    type: Types.ObjectId,
    example: Types.ObjectId().toHexString(),
  })
  @IsDefined()
  @IsMongoId()
  public readonly id!: string;

  @ApiModelProperty({
    required: false,
    type: [ProductModel],
  })
  @IsArray()
  @IsInstance(ProductModel, { each: true })
  @IsDefined()
  public readonly products!: ProductModel[];

  @ApiModelProperty({
    required: true,
    type: UserModel,
  })
  @IsDefined()
  @IsInstance(UserModel)
  @ValidateNested()
  @Type(() => UserModel)
  public readonly user!: UserModel;

  // TODO: Test
  @IsDefined()
  @IsDateString()
  public readonly createdAt!: string;

  // TODO: Test
  @IsDefined()
  @IsEnum(OrderProcess)
  public readonly process!: OrderProcess;

  // TODO: Test
  @IsDefined()
  @IsInstance(PaymentModel)
  @ValidateNested()
  @Type(() => PaymentModel)
  public readonly payment?: PaymentModel;

  constructor(params: OrderModel) {
    Object.assign(this, params);
  }
}
