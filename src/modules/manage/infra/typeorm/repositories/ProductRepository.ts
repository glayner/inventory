import ICategoryRepository from '@modules/manage/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async list(): Promise<Category[]> {
    const products = await this.ormRepository.find();
    return products;
  }
}
export default CategoryRepository;
