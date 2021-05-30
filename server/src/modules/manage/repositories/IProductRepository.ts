import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  list(): Promise<Product[]>;
  findByDescription(description: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findByIdWithCategory(id: string): Promise<Product | undefined>;
  findByIdWithTransactions(id: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(product: Product): Promise<void>;
}
