import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductRepository';

interface IRequestDTO {
  productId: string;
}

@injectable()
class ProductDeleteService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ productId }: IRequestDTO): Promise<Product> {
    const product = await this.productRepository.findByIdWithTransactions(
      productId,
    );

    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    if (product.transactions[0]) {
      throw new AppError(
        'Você não pode excluir produtos que tenham lançamentos',
      );
    }

    await this.productRepository.delete(product);

    return product;
  }
}
export default ProductDeleteService;
