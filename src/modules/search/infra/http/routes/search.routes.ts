import { Router } from 'express';

import SearchCategoryController from '../controller/SearchCategoryController';
import SearchProductController from '../controller/SearchProductController';

const searchRoute = Router();
const searchCategoryController = new SearchCategoryController();
const searchProductController = new SearchProductController();

searchRoute.get('/category', searchCategoryController.index);

searchRoute.get('/category/:categoryId', searchCategoryController.show);

searchRoute.get('/product/:productId', searchProductController.show);

export default searchRoute;
