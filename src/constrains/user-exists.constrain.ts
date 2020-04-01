import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable, Optional } from '@nestjs/common';
import { Types } from 'mongoose';

export const USER_RESOURCE_TOKEN = Symbol();

export interface UserService {
  findById(id: string): Promise<any>;
}

@ValidatorConstraint({ name: 'userExists', async: true })
@Injectable()
export class UserExistsConstrain implements ValidatorConstraintInterface {
  public static decorator() {
    return (object: object, propertyName: string) => {
      registerDecorator({
        propertyName,
        target: object.constructor,
        validator: UserExistsConstrain,
      });
    };
  }

  constructor(@Inject(USER_RESOURCE_TOKEN) @Optional() private readonly userService: UserService) {
    if (!this.userService) {
      console.warn('Service is not provided, constrain will be ignored');
    }
  }

  async validate(id: string) {
    if (!this.userService) {
      return true;
    }

    if (Types.ObjectId.isValid(id)) {
      return !!(await this.userService.findById(id));
    }

    return true;
  }

  public defaultMessage(args: ValidationArguments = {} as ValidationArguments): string {
    return `Property ${args.property} contain incorrect non existing user id ${args.value}`;
  }
}
