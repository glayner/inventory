import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoryRepository {
  list(): Promise<Category[]>;
  findByDescription(description: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
  findByIdWithProducts(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}
