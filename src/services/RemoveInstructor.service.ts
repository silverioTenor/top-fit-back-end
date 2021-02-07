import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Instructor from '../models/Instructor';

class RemoveInstructor {
  public async execute(id: string): Promise<void> {
    const instructorRepository = getRepository(Instructor);

    const instructor = await instructorRepository.findOne({ where: { id } });

    if (!instructor) throw new AppError('Instructor not found!');

    await instructorRepository.delete(id);
  }
}

export default RemoveInstructor;
