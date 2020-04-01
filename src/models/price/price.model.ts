import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { random } from 'faker';
import { ApiModelProperty } from '@nestjs/swagger';
import { BuilderInterface } from '../../generics/builder.interface';
import { Injectable } from '../../framework/injector';
import { LocationEnum } from '../../enums/location.enum';
import { AssignMockeries, MockeriesInterface } from '../../framework/mockeries';
import { ExposeGroup } from '../../enums/expose-group.enum';

export abstract class PriceBuilderAbstract {
  protected value!: number;
  protected country!: LocationEnum;
}

@Injectable()
export class PriceBuilder extends PriceBuilderAbstract implements BuilderInterface<PriceModel> {
  withValue(value: number) {
    this.value = value;
    return this;
  }

  withCountry(country: LocationEnum) {
    this.country = country;
    return this;
  }

  build(): PriceModel {
    return new PriceModel({ value: this.value, country: this.country });
  }
}

@Injectable()
export class PriceMockeries extends PriceBuilder implements MockeriesInterface<PriceModel> {
  mockValue() {
    return this.withValue(random.number());
  }

  mockCountry() {
    return this.withCountry(LocationEnum.US);
  }

  mock(): PriceModel {
    return this.mockValue()
      .mockCountry()
      .build();
  }
}

@AssignMockeries(PriceMockeries)
export class PriceModel {
  @ApiModelProperty({
    required: true,
    type: Number,
    example: 123,
  })
  @IsDefined()
  @IsNumber()
  @Expose()
  public readonly value!: number;

  @ApiModelProperty({
    required: true,
    enum: [LocationEnum.US, LocationEnum.CZ],
    example: 123,
  })
  @IsDefined()
  @Expose()
  @IsEnum(LocationEnum)
  public readonly country!: LocationEnum;

  @IsString()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get currency(): string {
    return require('../product/currencies.json')[this.country];
  }

  @IsNumber()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get tax(): number {
    // TODO Missing functionality for example for US where each state has different tax
    return require('../product/taxes.json')[this.country].rate;
  }

  @IsNumber()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get charge(): number {
    return Math.round(this.value * this.tax * 100) / 100;
  }

  @IsNumber()
  @Expose({ groups: [ExposeGroup.RESPONSE] })
  public get price(): number {
    return this.value + this.charge;
  }

  constructor(args: Omit<PriceModel, 'tax' | 'currency' | 'charge' | 'price'>) {
    Object.assign(this, args);
  }
}
