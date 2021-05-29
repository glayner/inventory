import Product from '@modules/manage/infra/typeorm/entities/Product';
import IProductRepository from '@modules/manage/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  productId: string;
}

@injectable()
class TransactionsByProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ productId }: IRequest): Promise<Product> {
    const product = await this.productRepository.findByIdWithTransactions(
      productId,
    );

    if (!product) {
      throw new AppError('Produto não foi encontrada');
    }

    return product;
  }
}
export default TransactionsByProductService;
