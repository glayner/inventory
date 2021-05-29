import { container } from 'tsyringe';
import { Response, Request } from 'express';
import CreateTransactionService from '@modules/transaction/service/CreateTransactionService';

export default class TransactionController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      date,
      productId,
      purchasedQnt,
      purchasedUnt,
      soldQnt,
    } = request.body;

    const createTransactionService = container.resolve(
      CreateTransactionService,
    );

    const transaction = await createTransactionService.execute({
      date,
      productId,
      purchasedQnt,
      purchasedUnt,
      soldQnt,
    });

    return response.json(transaction);
  }
}
