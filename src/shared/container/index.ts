import { container } from 'tsyringe';

import CategoryRepository from '@modules/manage/infra/typeorm/repositories/ProductRepository';
import ICategoryRepository from '@modules/manage/repositories/ICategoryRepository';

import IProductRepository from '@modules/manage/repositories/IProductRepository';
import ProductRepository from '@modules/manage/infra/typeorm/repositories/CategoryRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);
