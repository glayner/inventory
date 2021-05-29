import { Router } from 'express';

import manageRouter from '@modules/manage/infra/http/routes/manage.routes';
import searchRoute from '@modules/search/infra/http/routes/search.routes';
import transactionRouter from '@modules/transaction/infra/http/routes/transaction.routes';

const routes = Router();

routes.use('/manage', manageRouter);
routes.use('/search', searchRoute);
routes.use('/transaction', transactionRouter);

export default routes;
