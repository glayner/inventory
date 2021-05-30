import TransactionDeleteService from '@modules/manage/service/TransactionDeleteService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ManageTransactionController {
  async delete(request: Request, response: Response): Promise<Response> {
    const { transactionId } = request.params;

    const transactionDeleteService = container.resolve(
      TransactionDeleteService,
    );
    const transaction = await transactionDeleteService.execute({
      transactionId,
    });

    return response.json(transaction);
  }
}
