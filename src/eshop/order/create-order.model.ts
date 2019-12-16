import { ArrayNotEmpty, IsArray, IsDefined, IsMongoId, IsString } from 'class-validator';
import { Mockerizer } from '../../common/mockerizer.decorator';
import { Types } from 'mongoose';

@Mockerizer<CreateOrderModel>({
  products: () => [Types.ObjectId().toHexString()],
  user: () => Types.ObjectId().toHexString(),
})
export class CreateOrderModel {
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  public readonly products: string[];

  @IsDefined()
  @IsMongoId()
  public readonly user: string;

  constructor({ user, products }: CreateOrderModel) {
    this.user = user;
    this.products = products;
  }
}
