import { ArrayNotEmpty, IsArray, IsDefined, IsMongoId, IsDateString } from 'class-validator';
import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderProcess } from '../../enums/order-process.enum';
import { Expose } from 'class-transformer';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';

export class CreateOrderUserAbstract {
  products!: string[];
  user!: string;
  createdAt!: string;
  updatedAt!: string;
}

@Injectable()
export class CreateOrderUserBuilder extends CreateOrderUserAbstract implements BuilderInterface<CreateOrderUserModel> {
  withProducts(products: string[]) {
    this.products = products;
    return this;
  }

  withUser(user: string) {
    this.user = user;
    return this;
  }

  withCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: string) {
    this.updatedAt = updatedAt;
    return this;
  }

  build(): CreateOrderUserModel {
    return new CreateOrderUserModel({
      products: this.products,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}

@Injectable()
export class CreateOrderUserMockeries extends CreateOrderUserBuilder
  implements MockeriesInterface<CreateOrderUserModel> {
  mockProducts() {
    return this.withProducts([Types.ObjectId().toHexString()]);
  }

  mockUser() {
    return this.withUser(Types.ObjectId().toHexString());
  }

  mockCreatedAt() {
    return this.withCreatedAt(new Date().toDateString());
  }

  mockUpdatedAt() {
    return this.withUpdatedAt(new Date().toDateString());
  }

  mock(): CreateOrderUserModel {
    return this.mockProducts()
      .mockCreatedAt()
      .mockUpdatedAt()
      .mockUser()
      .build();
  }
}

@AssignMockeries(CreateOrderUserMockeries)
export class CreateOrderUserModel {
  @ApiModelProperty({
    required: false,
    type: [String],
    example: ['5e1882d4c4dbffe54e02eec5'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Expose()
  public readonly products!: string[];

  @ApiModelProperty({
    required: true,
    type: String,
    example: '5e1882d4c4dbffe54e02eec5',
  })
  @IsDefined()
  @IsMongoId()
  @Expose()
  public readonly user!: string;

  @IsDefined()
  @IsDateString()
  @Expose()
  public readonly createdAt!: string;

  @IsDefined()
  @IsDateString()
  @Expose()
  public readonly updatedAt?: string;

  // TODO: Test
  @Expose()
  public readonly process? = OrderProcess.UNPAID;

  // TODO Mockerizer types update to be able to remove these from Constructor<T> doesn't work now
  // @Exclude()
  // private readonly map: Map<'paymentId', string> = new Map();
  //
  // @Exclude()
  // public set(key: 'paymentId', value: string) {
  //   this.map.set(key, value);
  // }
  //
  // @Exclude()
  // public get(key: 'paymentId') {
  //   return this.map.get(key);
  // }
  // TODO Then update this one
  // Basically I want to do this https://github.com/typestack/class-transformer#exposing-getters-and-method-return-values
  // Goal is to update model after it is created
  // This also assume that at the moment instantiating of models is incorrect approach, correct is https://github.com/typestack/class-transformer#plaintoclass
  // and then to database this https://github.com/typestack/class-transformer#classtoplain
  // This will make sure that Exposed are saved to db and Excluded are not
  //
  // New approach will suppose to avoid of making model for each usecase and instead to have kind of dynamic models
  // means less of boilerplate
  public paymentId?: string;

  constructor(args: CreateOrderUserModel) {
    // This makes sure that plainToClass from class-transform will work
    // as it is initializing using empty constructor and then copying all keys one by one
    Object.assign(this, args);
  }
}
