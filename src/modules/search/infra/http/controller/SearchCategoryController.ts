import CategoryListService from '@modules/search/services/CategoryListService';
import ProductsByCategoryServices from '@modules/search/services/ProductsByCategoryServices';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SearchCategoryController {
  async index(request: Request, response: Response): Promise<Response> {
    const categoryListService = container.resolve(CategoryListService);
    const categories = await categoryListService.execute();

    return response.json(categories);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { categoryId } = request.params;

    const productsByCategoryServices = container.resolve(
      ProductsByCategoryServices,
    );
    const category = await productsByCategoryServices.execute({ categoryId });

    return response.json(category);
  }
}
