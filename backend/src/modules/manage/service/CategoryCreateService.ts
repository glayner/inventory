import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequestDTO {
  description: string;
}

@injectable()
class CategoryCreateService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ description }: IRequestDTO): Promise<Category> {
    const checkCategoryExist = await this.categoryRepository.findByDescription(
      description,
    );
    if (checkCategoryExist) {
      throw new AppError('Já existe uma categoria com a descrição informada');
    }

    const category = await this.categoryRepository.create({ description });

    return category;
  }
}
export default CategoryCreateService;
