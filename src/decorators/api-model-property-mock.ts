import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { MOCK_TOKEN } from '../common';
import { ApiModelProperty } from '@nestjs/swagger';

export function ApiModelPropertyMock(
  metadata?: {
    description?: string;
    required?: boolean;
    type?: any;
    isArray?: boolean;
    collectionFormat?: string;
    default?: any;
    enum?: SwaggerEnumType;
    format?: string;
    in?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    readOnly?: boolean;
    nullable?: boolean;
    xml?: any;
    example?: any;
  },
  mock?: {
    count?: number;
    Model: any;
  },
): PropertyDecorator {
  if (mock) {
    if (mock.Model == undefined) {
      throw new Error('Mock must contain mandatory Model class.');
    }
    const ModelMock = Reflect.getMetadata(MOCK_TOKEN, mock.Model);
    return ApiModelProperty({ ...metadata, example: new ModelMock(mock.count || 3) });
  }
  return ApiModelProperty(metadata);
}
