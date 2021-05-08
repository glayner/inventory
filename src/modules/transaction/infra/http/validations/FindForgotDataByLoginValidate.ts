import { celebrate, Segments, Joi } from 'celebrate';

const FindForgotDataByLoginValidate = celebrate({
  [Segments.PARAMS]: {
    login: Joi.string().required(),
  },
});

export default FindForgotDataByLoginValidate;
