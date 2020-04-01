import { ArrayNotEmpty, IsArray, IsDefined, IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { OrderProcess } from '../../enums/order-process.enum';
import { MapModel } from '../map.model';
import { Exclude, Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { PaymentModel } from '../payment/payment.model';
import { ProductSchema } from '../../schemas/product/product.schema';
import { AssignSchema, SchemaObject } from '../../framework/schema';
import { SchemaName } from '../../enums/schema-name';

export abstract class CreateOrderBuilderAbstract {
  protected products!: string[];
  protected process!: OrderProcess;
}

@Injectable()
export class CreateOrderBuilder extends CreateOrderBuilderAbstract implements BuilderInterface<CreateOrderModel> {
  withProducts(products: string[]) {
    this.products = products;
    return this;
  }

  withProcess(process: OrderProcess) {
    this.process = process;
    return this;
  }

  build(): CreateOrderModel {
    return new CreateOrderModel({
      products: this.products,
      process: this.process,
    });
  }
}

@Injectable()
export class CreateOrderMockeries extends CreateOrderBuilder implements MockeriesInterface<CreateOrderModel> {
  mockProducts() {
    return this.withProducts([Types.ObjectId().toHexString()]);
  }

  mockProcess() {
    return this.withProcess(OrderProcess.UNPAID);
  }

  mock(): CreateOrderModel {
    return this.mockProducts()
      .mockProcess()
      .build();
  }
}

interface CreateOrderInterface {
  products: string[];
  process: OrderProcess;
  payment: PaymentModel;
  createdAt: string;
  user: string;
}

@AssignMockeries(CreateOrderMockeries)
@AssignSchema(new SchemaObject(ProductSchema, SchemaName.PRODUCT))
@Expose()
export class CreateOrderModel extends MapModel<CreateOrderInterface> {
  @ApiModelProperty({
    required: false,
    type: [String],
    example: ['5de3e0a388e99a666e8ee8ab'],
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Expose()
  public readonly products!: string[];

  // TODO: Test
  @IsEnum(OrderProcess)
  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public readonly process: OrderProcess = OrderProcess.UNPAID;

  // FIXME: Is that really work this is not assigned anywhere!!!
  // TODO Test
  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public get payment(): PaymentModel {
    return this.get('payment') as PaymentModel;
  }

  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public get createdAt(): string {
    return this.get('createdAt') as string;
  }

  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  public get user(): string {
    return this.get('user') as string;
  }

  constructor(args: Partial<CreateOrderModel>) {
    super();
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
