import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import ICategoryRepository from '../repositories/ICategoryRepository';
import IProductRepository from '../repositories/IProductRepository';

interface IRequestDTO {
  description: string;

  categoryId: string;
}

@injectable()
class ProductCreateService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    description,
    categoryId,
  }: IRequestDTO): Promise<Product> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new AppError('Categoria não encontrada');
    }
    const checkProductExist = await this.productRepository.findByDescription(
      description,
    );
    if (checkProductExist) {
      throw new AppError('Já existe um produto com a descrição informada');
    }

    const product = await this.productRepository.create({
      description,
      category,
    });

    return product;
  }
}
export default ProductCreateService;
