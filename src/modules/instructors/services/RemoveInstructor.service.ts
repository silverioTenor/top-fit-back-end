import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IInstructorsRepository from '../repositories/IInstructorsRepository';

@injectable()
class RemoveInstructor {
  constructor(
    @inject('InstructorsRepository')
    private instructorRepository: IInstructorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const instructor = await this.instructorRepository.findById(id);

    if (!instructor) throw new AppError('Instructor not found!');

    await this.instructorRepository.delete(id);
  }
}

export default RemoveInstructor;
