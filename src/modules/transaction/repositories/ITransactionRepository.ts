import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionRepository {
  list(): Promise<Transaction[]>;
}
