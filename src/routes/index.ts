import { Router } from 'express';

import instructors from './instructors.routes';

const routes = Router();

routes.use('/instructors', instructors);

export default routes;
