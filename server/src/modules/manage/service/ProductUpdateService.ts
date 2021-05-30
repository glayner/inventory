import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import ICategoryRepository from '../repositories/ICategoryRepository';
import IProductRepository from '../repositories/IProductRepository';

interface IRequestDTO {
  productId: string;

  description: string;

  categoryId: string;
}

@injectable()
class ProductUpdateService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    productId,
    description,
    categoryId,
  }: IRequestDTO): Promise<Product> {
    const product = await this.productRepository.findByIdWithCategory(
      productId,
    );
    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    if (product.category.id !== categoryId) {
      const category = await this.categoryRepository.findById(categoryId);
      if (!category) {
        throw new AppError('Categoria não encontrada');
      }

      product.category = category;
    }

    if (product.description !== description) {
      const checkProductExist = await this.productRepository.findByDescription(
        description,
      );
      if (checkProductExist) {
        throw new AppError('Já existe um produto com a descrição informada');
      }

      product.description = description;
    }

    await this.productRepository.save(product);

    return product;
  }
}
export default ProductUpdateService;
