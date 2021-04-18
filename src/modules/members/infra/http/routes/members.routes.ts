import { Router } from 'express';
import { getRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateMemberService from '@modules/members/services/CreateMember.service';
import UpdateMemberService from '@modules/members/services/UpdateMember.service';

import Member from '../../typeorm/entities/Member';

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

membersRouter.put('/:id', async (request, response) => {
  const { name, email, weight, height, instructor_id } = request.body;

  const updateMember = new UpdateMemberService();

  const updatedMember = await updateMember.excute({
    name,
    email,
    weight,
    height,
    instructor_id,
  });

  return response.json(updatedMember);
});

export default membersRouter;
