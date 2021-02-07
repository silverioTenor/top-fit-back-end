import { Router } from 'express';
import { getRepository } from 'typeorm';

import Member from '../models/Member';

const membersRouter = Router();

membersRouter.get('/', async (request, response) => {
  const membersRepository = getRepository(Member);

  const members = await membersRepository.find();

  return response.json(members);
});

export default membersRouter;
