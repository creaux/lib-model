import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Types } from 'mongoose';

export const SECTION_SERVICE_TOKEN = Symbol();

export interface SectionService {
  findById(id: string): Promise<boolean>;
}

@ValidatorConstraint({ name: 'sectionExists', async: true })
@Injectable()
export class SectionExistsConstrain implements ValidatorConstraintInterface {
  public static decorator() {
    return (object: object, propertyName: string) => {
      registerDecorator({
        propertyName,
        target: object.constructor,
        validator: SectionExistsConstrain,
      });
    };
  }

  constructor(@Inject(SECTION_SERVICE_TOKEN) @Optional() private readonly sectionService: SectionService) {
    if (!this.sectionService) {
      console.warn('Service is not provided, constrain will be ignored');
    }
  }

  public async validate(id: string): Promise<boolean> {
    if (!this.sectionService) {
      return true;
    }

    if (Types.ObjectId.isValid(id)) {
      return !!(await this.sectionService.findById(id));
    }

    return true;
  }

  public defaultMessage(args: ValidationArguments = {} as ValidationArguments): string {
    return `Property ${args.property} contains incorrect non existing ${args.property} id ${args.value}`;
  }
}
