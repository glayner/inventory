import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionRepository {
  list(): Promise<Transaction[]>;
  listByProductId(productId: string): Promise<Transaction[]>;
  findLastByProductId(productId: string): Promise<Transaction | undefined>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
}
