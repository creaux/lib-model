import { IsArray, IsMongoId, IsOptional, ArrayNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';

export abstract class UpdateOrderBuilderAbstract {
  protected products!: string[];
  protected user!: string;
}

@Injectable()
export class UpdateOrderBuilder extends UpdateOrderBuilderAbstract implements BuilderInterface<UpdateOrderModel> {
  withProducts(products: string[]) {
    this.products = products;
    return this;
  }

  withUser(user: string) {
    this.user = user;
    return this;
  }

  build(): UpdateOrderModel {
    return new UpdateOrderModel({ user: this.user, products: this.products });
  }
}

@Injectable()
export class UpdateOrderMockeries extends UpdateOrderBuilder implements MockeriesInterface<UpdateOrderModel> {
  mockProducts() {
    return this.withProducts([Types.ObjectId().toHexString()]);
  }

  mockUser() {
    return this.withUser(Types.ObjectId().toHexString());
  }

  mock(): UpdateOrderModel {
    return this.mockProducts()
      .mockUser()
      .build();
  }
}

@AssignMockeries(UpdateOrderMockeries)
export class UpdateOrderModel {
  @ApiModelProperty({
    required: false,
    type: [String],
    example: ['5de3e0a388e99a666e8ee8ab'],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Expose()
  public readonly products!: string[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: '000000000000000000000d00',
  })
  @IsOptional()
  @IsMongoId()
  @Expose()
  public readonly user!: string;

  constructor(args: Partial<UpdateOrderModel>) {
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
