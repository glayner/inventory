import Category from '../infra/typeorm/entities/Category';

export default interface ICreateProductDTO {
  description: string;

  category: Category;
}
