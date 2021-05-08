import { celebrate, Segments, Joi } from 'celebrate';

const SessionValidate = celebrate({
  [Segments.BODY]: {
    login: Joi.string().required(),
    password: Joi.string().min(8).required(),
  },
});

export default SessionValidate;
