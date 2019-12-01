import { Validator } from 'class-validator';
import test from 'ava';
import { CartModelMap } from './cart.model-map';
import { MOCK_TOKEN } from '../../common/model-mock.decorator';

const { keys } = Object;

let cartModelMap: CartModelMap;
let validator: Validator;
let Mock: any;

test.before(() => {
  Mock = Reflect.getMetadata(MOCK_TOKEN, CartModelMap);

  cartModelMap = new Mock() as CartModelMap;
  validator = new Validator();
});

test('should raise error when id is not defined', async t => {
  const { id, ...props } = cartModelMap;
  const model = new CartModelMap({
    // @ts-ignore
    id: undefined,
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isDefined', 'isMongoId']);
});

test('should raise error when id is not mongo id', async t => {
  const { id, ...props } = cartModelMap;
  // @ts-ignore
  const model = new CartModelMap({
    // @ts-ignore
    id: 'abc',
    ...props,
  });

  const validated = (await validator.validate(model))[0];

  t.is(validated.property, 'id');
  t.deepEqual(keys(validated.constraints), ['isMongoId']);
});
