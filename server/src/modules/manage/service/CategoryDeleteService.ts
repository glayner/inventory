import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequestDTO {
  categoryId: string;
}

@injectable()
class CategoryDeleteService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ categoryId }: IRequestDTO): Promise<Category> {
    const category = await this.categoryRepository.findByIdWithProducts(
      categoryId,
    );

    if (!category) {
      throw new AppError('Categoria não encontrada');
    }

    if (category.products[0]) {
      throw new AppError('Você não pode excluir categoria que tenham produtos');
    }

    await this.categoryRepository.delete(category);

    return category;
  }
}
export default CategoryDeleteService;
