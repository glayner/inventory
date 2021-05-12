import { Router } from 'express';

import manageRouter from '@modules/manage/infra/http/routes/manage.routes';
import searchRoute from '@modules/search/infra/http/routes/search.routes';

const routes = Router();

routes.use('/manage', manageRouter);
routes.use('/search', searchRoute);

export default routes;
