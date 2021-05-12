import { celebrate, Segments, Joi } from 'celebrate';

const CategoryUpdateValidate = celebrate({
  [Segments.PARAMS]: {
    categoryId: Joi.string().uuid().required(),
  },
  [Segments.BODY]: {
    description: Joi.string().required(),
  },
});

export default CategoryUpdateValidate;
