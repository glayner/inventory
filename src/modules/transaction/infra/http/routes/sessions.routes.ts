import { Router } from 'express';

import SessionsController from '../controller/SessionsController';
import SessionValidate from '../validations/SessionValidate';

const sessionsRoutes = Router();
const sessionController = new SessionsController();

sessionsRoutes.post('/', SessionValidate, sessionController.create);

export default sessionsRoutes;
