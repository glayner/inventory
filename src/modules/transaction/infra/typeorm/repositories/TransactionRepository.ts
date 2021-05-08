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
}
export default TransactionRepository;
