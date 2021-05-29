import { celebrate, Segments, Joi } from 'celebrate';

const regexDate = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9](?:(:[0-5][0-9]))?(-03:00|.[0-9]{3})$/;

const CreateTransactionValidate = celebrate({
  [Segments.BODY]: {
    date: Joi.string().regex(
      regexDate,
      'date most be yyyy-MM-ddTHH:mm:ss-03:00',
    ),

    productId: Joi.string().uuid().required(),

    soldQnt: Joi.number(),

    purchasedQnt: Joi.number().when('soldQnt', {
      not: Joi.exist(),
      then: Joi.number().required(),
    }),

    purchasedUnt: Joi.number().when('soldQnt', {
      not: Joi.exist(),
      then: Joi.number().required(),
    }),
  },
});

export default CreateTransactionValidate;
