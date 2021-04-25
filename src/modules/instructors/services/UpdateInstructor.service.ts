import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Instructor from '../infra/typeorm/entities/Instructor';
import IInstructorsRepository from '../repositories/IInstructorsRepository';

@injectable()
class UpdateInstructor {
  constructor(
    @inject('InstructorsRepository')
    private instructorRepository: IInstructorsRepository,
  ) {}

  public async execute({ id, name, email, birth }: Instructor): Promise<Instructor> {
    const instructor = await this.instructorRepository.findById(id);

    if (!instructor) throw new AppError('Instructor not found!');

    const instructorDate = new Date(birth);

    const updateInstructor = await this.instructorRepository.create({
      ...instructor,
      name,
      email,
      birth: instructorDate,
    });

    await this.instructorRepository.save(updateInstructor);

    return updateInstructor;
  }
}

export default UpdateInstructor;
