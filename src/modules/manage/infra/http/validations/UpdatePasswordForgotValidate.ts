import { celebrate, Segments, Joi } from 'celebrate';

const UpdatePasswordForgotValidate = celebrate({
  [Segments.PARAMS]: {
    token: Joi.string().required(),
  },
  [Segments.BODY]: {
    password: Joi.string().min(8).trim().required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
  },
});

export default UpdatePasswordForgotValidate;
