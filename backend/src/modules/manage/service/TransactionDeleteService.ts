import Transaction from '@modules/transaction/infra/typeorm/entities/Transaction';
import ITransactionRepository from '@modules/transaction/repositories/ITransactionRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequestDTO {
  transactionId: string;
}

@injectable()
class TransactionDeleteService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  public async execute({ transactionId }: IRequestDTO): Promise<Transaction> {
    const transaction = await this.transactionRepository.findById(
      transactionId,
    );

    if (!transaction) {
      throw new AppError('Transação não encontrada');
    }

    const checkLastTransaction = await this.transactionRepository.findLastByProductId(
      transaction.product.id,
    );

    if (checkLastTransaction && checkLastTransaction.id !== transactionId) {
      throw new AppError('Você só pode excluir a ultima transação do produto');
    }

    await this.transactionRepository.delete(transaction);

    return transaction;
  }
}
export default TransactionDeleteService;
