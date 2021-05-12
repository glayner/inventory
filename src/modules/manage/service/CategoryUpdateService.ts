import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequestDTO {
  categoryId: string;

  description: string;
}

@injectable()
class CategoryUpdateService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    categoryId,
    description,
  }: IRequestDTO): Promise<Category> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new AppError('Categoria não encontrada');
    }

    if (category.description !== description) {
      const checkCategoryExist = await this.categoryRepository.findByDescription(
        description,
      );
      if (checkCategoryExist) {
        throw new AppError('Já existe uma categoria com a descrição informada');
      }

      category.description = description;
    }

    await this.categoryRepository.save(category);

    return category;
  }
}
export default CategoryUpdateService;
