import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Instructor from '../models/Instructor';

import CreateInstructortService from '../services/instructors/CreateInstructor.service';
import RemoveInstructorService from '../services/instructors/RemoveInstructor.service';
import UpdateInstructorService from '../services/instructors/UpdateInstructor.service';

const instructorsRouter = Router();

instructorsRouter.get('/', async (request, response) => {
  const instructorRepository = getRepository(Instructor);

  const instructors = await instructorRepository.find();

  return response.json(instructors);
});

instructorsRouter.post('/', async (request, response) => {
  const { name, email, birth, gender } = request.body;

  const parsedDate = parseISO(birth);

  const createInstructor = new CreateInstructortService();

  const instructor = await createInstructor.execute({
    name,
    email,
    birth: parsedDate,
    gender,
  });

  return response.json(instructor);
});

instructorsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, birth } = request.body;

  const updateInstructorService = new UpdateInstructorService();

  const instructor = await updateInstructorService.execute({
    id,
    name,
    email,
    birth,
  });

  return response.json(instructor);
});

instructorsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const removeInstructorService = new RemoveInstructorService();

  await removeInstructorService.execute(id);

  return response.status(201).send();
});

export default instructorsRouter;
