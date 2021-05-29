import Category from '@modules/manage/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/manage/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CategoryListService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const category = await this.categoryRepository.list();

    return category;
  }
}
export default CategoryListService;
