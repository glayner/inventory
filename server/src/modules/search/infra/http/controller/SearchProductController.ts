import TransactionsByProductService from '@modules/search/services/TransactionsByProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SearchProductController {
  async show(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;

    const transactionsByProductService = container.resolve(
      TransactionsByProductService,
    );
    const product = await transactionsByProductService.execute({ productId });

    return response.json(product);
  }
}
