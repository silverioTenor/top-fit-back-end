import { Router } from 'express';

import instructors from '@modules/instructors/infra/http/routes/instructors.routes';
import members from '@modules/members/infra/http/routes/members.routes';

const routes = Router();

routes.use('/instructors', instructors);
routes.use('/members', members);

export default routes;
