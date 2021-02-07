import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Instructor from '../../models/Instructor';

interface RequestProps {
  id: string;
  name: string;
  email: string;
  birth: Date;
}

class UpdateInstructor {
  public async execute({ id, name, email, birth }: RequestProps): Promise<Instructor> {
    const instructorRepository = getRepository(Instructor);

    const instructor = await instructorRepository.findOne({ where: { id } });

    if (!instructor) throw new AppError('Instructor not found!');

    const instructorDate = new Date(birth);

    const updateInstructor = instructorRepository.create({
      ...instructor,
      name,
      email,
      birth: instructorDate,
    });

    await instructorRepository.save(updateInstructor);

    return updateInstructor;
  }
}

export default UpdateInstructor;
