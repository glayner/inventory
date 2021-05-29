/* eslint-disable import/no-duplicates */
import IProductRepository from '@modules/manage/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import { format, isAfter, isBefore, isEqual } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionRepository from '../repositories/ITransactionRepository';

interface IRequest {
  date: Date;

  purchasedQnt?: number;

  purchasedUnt?: number;

  soldQnt?: number;

  productId: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    date,
    purchasedQnt,
    purchasedUnt,
    soldQnt,
    productId,
  }: IRequest): Promise<Transaction> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    const lastTransaction = await this.transactionRepository.findLastByProductId(
      productId,
    );

    if (isAfter(new Date(date), new Date())) {
      throw new AppError('Não é possível fazer lançamentos futuros');
    }

    if (
      lastTransaction &&
      (isBefore(new Date(date), new Date(lastTransaction.date)) ||
        isEqual(new Date(date), new Date(lastTransaction.date)))
    ) {
      throw new AppError(
        `O lançamento deve ser após ${format(
          lastTransaction.date,
          "dd/MM/yyyy 'às' HH:mm:SS",
          { locale: ptBr },
        )}`,
      );
    }

    let balanceAmt = +(lastTransaction?.balance_amt || 0);
    let balanceQnt = +(lastTransaction?.balance_qnt || 0);
    let balanceUnt = +(lastTransaction?.balance_unt || 0);
    let purchasedAmt = 0;
    let soldAmt = 0;
    let soldUnt = 0;

    if (purchasedQnt && purchasedUnt) {
      purchasedAmt = purchasedQnt * purchasedUnt;

      balanceQnt += purchasedQnt;

      balanceAmt += purchasedAmt;

      balanceUnt = balanceAmt / balanceQnt;
    } else if (soldQnt) {
      soldUnt = balanceUnt;
      soldAmt = soldQnt * soldUnt;

      balanceQnt -= soldQnt;
      balanceAmt -= soldAmt;
      balanceUnt = soldUnt;

      if (balanceQnt < 0 || balanceAmt < 0 || balanceUnt < 0) {
        throw new AppError(
          'Não há produtos registrados suficiente à serem vendidos',
        );
      }
    } else {
      throw new AppError('Você deve informar a compra ou a venda de produto');
    }

    const transaction = await this.transactionRepository.create({
      date,
      product,
      balance_amt: +balanceAmt.toFixed(2),
      balance_qnt: balanceQnt,
      balance_unt: +balanceUnt.toFixed(2),
      purchased_unt: purchasedUnt || 0,
      purchased_qnt: purchasedQnt || 0,
      purchased_amt: +purchasedAmt.toFixed(2),
      sold_unt: +soldUnt.toFixed(2),
      sold_qnt: soldQnt || 0,
      sold_amt: +soldAmt.toFixed(2),
    });

    return transaction;
  }
}
export default CreateTransactionService;
