import ITransactionRepository from '@modules/transaction/repositories/ITransactionRepository';
import { getRepository, Repository } from 'typeorm';
import Transaction from '../entities/Transaction';

class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async list(): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find();
    return transactions;
  }

  public async listByProductId(productId: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({
      relations: ['product'],
      where: { 'product.id': productId },
      order: { date: 'ASC' },
    });

    return transactions;
  }
}
export default TransactionRepository;
