import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateUserTokenDTO {
  user: User;

  token: string;
}
