import IProductRepository from '@modules/manage/repositories/IProductRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async list(): Promise<Product[]> {
    const categories = await this.ormRepository.find();
    return categories;
  }
}
export default ProductRepository;
