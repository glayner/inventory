import { container } from 'tsyringe';

import ICategoryRepository from '@modules/manage/repositories/ICategoryRepository';
import CategoryRepository from '@modules/manage/infra/typeorm/repositories/CategoryRepository';

import IProductRepository from '@modules/manage/repositories/IProductRepository';
import ProductRepository from '@modules/manage/infra/typeorm/repositories/ProductRepository';

import ITransactionRepository from '@modules/transaction/repositories/ITransactionRepository';
import TransactionRepository from '@modules/transaction/infra/typeorm/repositories/TransactionRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository,
);
