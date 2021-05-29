import { celebrate, Segments, Joi } from 'celebrate';

const ProductUpdateValidate = celebrate({
  [Segments.PARAMS]: {
    productId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    description: Joi.string().required(),
    categoryId: Joi.string().uuid().required(),
  },
});

export default ProductUpdateValidate;
