import ICreateTransactionDTO from '@modules/transaction/dtos/ICreateTransactionDTO';
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

  public async findById(
    transactionId: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne({
      where: { id: transactionId },
      relations: ['product'],
    });
    return transaction;
  }

  public async listByProductId(productId: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({
      relations: ['product'],
      where: { 'product.id': productId },
      order: { date: 'ASC' },
    });

    return transactions;
  }

  public async findLastByProductId(
    productId: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository
      .createQueryBuilder('transaction')
      .innerJoinAndSelect('transaction.product', 'product')
      .where('product.id = :productId', { productId })
      .orderBy('transaction.date', 'DESC')
      .getOne();

    return transaction;
  }

  public async create({
    date,
    purchased_amt,
    purchased_qnt,
    purchased_unt,
    sold_amt,
    sold_qnt,
    sold_unt,
    balance_amt,
    balance_qnt,
    balance_unt,
    product,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      date,
      purchased_amt,
      purchased_qnt,
      purchased_unt,
      sold_amt,
      sold_qnt,
      sold_unt,
      balance_amt,
      balance_qnt,
      balance_unt,
      product,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async delete(transaction: Transaction): Promise<void> {
    await this.ormRepository.remove(transaction);
  }
}
export default TransactionRepository;
