import { IsDateString, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';
import { BuilderInterface } from '../../generics/builder.interface';
import { lorem } from 'faker';
import { Injectable } from '../../framework/injector';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';

export abstract class PaymentBuilderAbstract {
  protected paymentId!: string;
  protected secret!: string;
  protected createdAt!: string;
}

@Injectable()
export class PaymentBuilder extends PaymentBuilderAbstract implements BuilderInterface<PaymentModel> {
  withPaymentId(paymentId: string) {
    this.paymentId = paymentId;
    return this;
  }

  withSecret(secret: string) {
    this.secret = secret;
    return this;
  }

  withCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
    return this;
  }

  build(): PaymentModel {
    return new PaymentModel({ paymentId: this.paymentId, secret: this.secret, createdAt: this.createdAt });
  }
}

@Injectable()
export class PaymentMockeries extends PaymentBuilder implements MockeriesInterface<PaymentModel> {
  mockPaymentId() {
    return this.withPaymentId(Types.ObjectId().toHexString());
  }

  mockSecret() {
    return this.withSecret(lorem.word());
  }

  mockCreatedAt() {
    return this.withCreatedAt(new Date().toDateString());
  }

  mock(): PaymentModel {
    return this.mockPaymentId()
      .mockSecret()
      .mockCreatedAt()
      .build();
  }
}

@AssignMockeries(PaymentMockeries)
export class PaymentModel {
  @Expose()
  @IsString()
  public readonly paymentId!: string;

  @Expose()
  @IsString()
  public readonly secret!: string;

  @Expose()
  @IsDateString()
  public readonly createdAt!: string;

  constructor(params: PaymentModel) {
    Object.assign(this, params);
  }
}
