import { Router } from 'express';
import RecipientController from './app/controllers/RecipientController';

import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
