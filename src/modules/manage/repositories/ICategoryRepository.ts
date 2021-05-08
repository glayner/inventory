import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  list(): Promise<Category[]>;
}
