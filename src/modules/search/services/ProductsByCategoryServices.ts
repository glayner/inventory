import Category from '@modules/manage/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/manage/repositories/ICategoryRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  categoryId: string;
}

@injectable()
class ProductsByCategoryServices {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({ categoryId }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.findByIdWithProducts(
      categoryId,
    );

    if (!category) {
      throw new AppError('Categoria não foi encontrada');
    }

    return category;
  }
}
export default ProductsByCategoryServices;
