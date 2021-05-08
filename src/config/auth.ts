export default {
  jwt: {
    secret: process.env.APP_SECRET || 'secret',
    expires: Number(process.env.APP_EXPIRES) || 2,
  },
};
