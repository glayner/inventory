import ProductCreateService from '@modules/manage/service/ProductCreateService';
import ProductDeleteService from '@modules/manage/service/ProductDeleteService';
import ProductUpdateService from '@modules/manage/service/ProductUpdateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ManageProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description, categoryId } = request.body;

    const productCreateService = container.resolve(ProductCreateService);
    const product = await productCreateService.execute({
      description,
      categoryId,
    });

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { description, categoryId } = request.body;
    const { productId } = request.params;

    const productUpdateService = container.resolve(ProductUpdateService);
    const product = await productUpdateService.execute({
      productId,
      categoryId,
      description,
    });

    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;

    const productDeleteService = container.resolve(ProductDeleteService);
    const product = await productDeleteService.execute({
      productId,
    });

    return response.json(product);
  }
}
