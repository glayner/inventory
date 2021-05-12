import { container } from 'tsyringe';
import { Response, Request } from 'express';
import CategoryCreateService from '@modules/manage/service/CategoryCreateService';
import CategoryUpdateService from '@modules/manage/service/CategoryUpdateService';

export default class ManageCategoryController {
  async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const categoryCreateService = container.resolve(CategoryCreateService);
    const category = await categoryCreateService.execute({
      description,
    });

    return response.json(category);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;
    const { categoryId } = request.params;

    const categoryUpdateService = container.resolve(CategoryUpdateService);
    const category = await categoryUpdateService.execute({
      categoryId,
      description,
    });

    return response.json(category);
  }
}
