import { Router } from 'express';

import ManageCategoryController from '../controller/ManageCategoryController';
import ManageProductController from '../controller/ManageProductController';
import CategoryCreateValidate from '../validations/CategoryCreateValidate';
import CategoryUpdateValidate from '../validations/CategoryUpdateValidate';
import ProductCreateValidate from '../validations/ProductCreateValidate';
import ProductUpdateValidate from '../validations/ProductUpdateValidate';

const manageRouter = Router();
const manageCategoryController = new ManageCategoryController();
const manageProductController = new ManageProductController();

manageRouter.post(
  '/category',
  CategoryCreateValidate,
  manageCategoryController.create,
);

manageRouter.put(
  '/category/:categoryId',
  CategoryUpdateValidate,
  manageCategoryController.update,
);

manageRouter.post(
  '/product',
  ProductCreateValidate,
  manageProductController.create,
);

manageRouter.put(
  '/product/:productId',
  ProductUpdateValidate,
  manageProductController.update,
);

export default manageRouter;
