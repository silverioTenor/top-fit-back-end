import { getRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

import Instructor from '../infra/typeorm/entities/Instructor';

interface Request {
  name: string;
  email: string;
  birth: Date;
  gender: 'male' | 'female';
}

class CreateInstructor {
  public async execute({ name, email, birth, gender }: Request): Promise<Instructor> {
    const instructorRepository = getRepository(Instructor);

    const hasUser = await instructorRepository.findOne({ where: { email } });

    if (hasUser) throw new AppError('Email address already used!');

    const instructorDate = new Date(birth);

    const instructor = instructorRepository.create({
      name,
      email,
      birth: instructorDate,
      gender,
    });

    await instructorRepository.save(instructor);

    return instructor;
  }
}

export default CreateInstructor;
