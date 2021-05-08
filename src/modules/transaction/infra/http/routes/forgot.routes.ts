import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import CreateUserTokenValidate from '../validations/CreateUserTokenValidate';
import FindForgotDataByLoginValidate from '../validations/FindForgotDataByLoginValidate';
import UpdatePasswordForgotValidate from '../validations/UpdatePasswordForgotValidate';

const forgotRoutes = Router();
const forgotPasswordController = new ForgotPasswordController();

forgotRoutes.get(
  '/login/:login',
  FindForgotDataByLoginValidate,
  forgotPasswordController.show,
);

forgotRoutes.post(
  '/',
  CreateUserTokenValidate,
  forgotPasswordController.create,
);

forgotRoutes.put(
  '/token/:token',
  UpdatePasswordForgotValidate,
  forgotPasswordController.update,
);

export default forgotRoutes;
