import { celebrate, Segments, Joi } from 'celebrate';

const CategoryCreateValidate = celebrate({
  [Segments.BODY]: {
    description: Joi.string().required(),
  },
});

export default CategoryCreateValidate;
