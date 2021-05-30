import ICreateProductDTO from '@modules/manage/dtos/ICreateProductDTO';
import IProductRepository from '@modules/manage/repositories/IProductRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async list(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async findByDescription(
    description: string,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({ description });

    return product;
  }

  public async findByIdWithCategory(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByIdWithTransactions(
    id: string,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.transactions', 'transactions')
      .where('product.id = :productId', { productId: id })
      .orderBy('transactions.date')
      .getOne();

    return product;
  }

  public async create({
    description,
    category,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ description, category });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async delete(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}
export default ProductRepository;
