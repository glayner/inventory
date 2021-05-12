import { celebrate, Segments, Joi } from 'celebrate';

const ProductCreateValidate = celebrate({
  [Segments.BODY]: {
    description: Joi.string().required(),
    categoryId: Joi.string().uuid().required(),
  },
});

export default ProductCreateValidate;
