import { ArrayNotEmpty, IsArray, IsDefined, IsMongoId, IsDateString } from 'class-validator';
import { Mockerizer } from '../../common';
import { Types } from 'mongoose';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderProcess } from './order-process.enum';
import { Expose } from 'class-transformer';

@Mockerizer<Omit<CreateOrderUserModel, 'process' | 'paymentId'>>({
  products: () => [Types.ObjectId().toHexString()],
  user: () => Types.ObjectId().toHexString(),
  createdAt: () => new Date().toDateString(),
  updatedAt: () => undefined,
})
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
