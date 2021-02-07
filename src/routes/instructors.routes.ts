import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import Instructor from '../models/Instructor';

import CreateInstructortService from '../services/CreateInstructor.service';

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

export default instructorsRouter;
