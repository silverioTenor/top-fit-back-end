import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Instructor from '../infra/typeorm/entities/Instructor';

class RemoveInstructor {
  public async execute(id: string): Promise<void> {
    const instructorRepository = getRepository(Instructor);

    const instructor = await instructorRepository.findOne({ where: { id } });

    if (!instructor) throw new AppError('Instructor not found!');

    await instructorRepository.delete(id);
  }
}

export default RemoveInstructor;
