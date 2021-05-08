import { celebrate, Segments, Joi } from 'celebrate';

const CreateUserTokenValidate = celebrate({
  [Segments.BODY]: {
    login: Joi.string().required(),
    email: Joi.string().email().required(),
    birthday: Joi.string().isoDate().required(),
  },
});

export default CreateUserTokenValidate;
