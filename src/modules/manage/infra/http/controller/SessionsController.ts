import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/authorization/service/AuthenticateUserService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const {
      user,
      token,
      role,
      permissions,
    } = await authenticateUserService.execute({
      login,
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
