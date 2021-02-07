import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateMemberService from '../services/members/CreateMember.service';

import Member from '../models/Member';

const membersRouter = Router();

membersRouter.get('/', async (request, response) => {
  const membersRepository = getRepository(Member);

  const members = await membersRepository.find();

  return response.json(members);
});

membersRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    birth,
    gender,
    blood,
    weight,
    height,
    instructor_id,
  } = request.body;

  const createMember = new CreateMemberService();

  const parsedBirth = parseISO(birth);

  const member = await createMember.execute({
    name,
    email,
    birth: parsedBirth,
    gender,
    blood,
    weight,
    height,
    instructor_id,
  });

  return response.json(member);
});

export default membersRouter;
