import CategoryCreateService from '@modules/manage/service/CategoryCreateService';
import CategoryDeleteService from '@modules/manage/service/CategoryDeleteService';
import CategoryUpdateService from '@modules/manage/service/CategoryUpdateService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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

  async delete(request: Request, response: Response): Promise<Response> {
    const { categoryId } = request.params;

    const categoryDeleteService = container.resolve(CategoryDeleteService);
    const category = await categoryDeleteService.execute({
      categoryId,
    });

    return response.json(category);
  }
}
