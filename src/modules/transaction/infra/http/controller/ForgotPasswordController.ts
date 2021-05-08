import CreateUserTokenService from '@modules/authorization/service/CreateUserTokenService';
import FindUserForgotService from '@modules/authorization/service/FindUserForgotService';
import UpdatePasswordForgotTokenService from '@modules/authorization/service/UpdatePasswordForgotTokenService';
import { classToClass } from 'class-transformer';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { login, email, birthday } = request.body;

    const birthdayFormated = new Date(parseISO(birthday).setUTCHours(3));

    const createUserTokenService = container.resolve(CreateUserTokenService);

    const token = await createUserTokenService.execute({
      login,
      email,
      birthday: birthdayFormated,
    });

    return response.json(token);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { login: loginForgot } = request.params;

    const findUserForgotService = container.resolve(FindUserForgotService);

    const { birthday, email, login } = await findUserForgotService.execute({
      login: loginForgot,
    });

    return response.json({ birthday, email, login });
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { token: forgotToken } = request.params;
    const { password } = request.body;

    const updatePasswordForgotTokenService = container.resolve(
      UpdatePasswordForgotTokenService,
    );

    const {
      user,
      token,
      role,
      permissions,
    } = await updatePasswordForgotTokenService.execute({
      token: forgotToken,
      password,
    });

    return response.json({
      token,
      user: classToClass(user),
      role,
      permissions,
    });
  }
}
