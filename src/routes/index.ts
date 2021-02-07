import { Router } from 'express';

import instructors from './instructors.routes';
import members from './members.routes';

const routes = Router();

routes.use('/instructors', instructors);
routes.use('/members', members);

export default routes;
