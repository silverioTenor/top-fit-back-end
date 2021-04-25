import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IInstructorsRepository from '../repositories/IInstructorsRepository';
import Instructor from '../infra/typeorm/entities/Instructor';

@injectable()
class ShowInstructorService {
  constructor(
    @inject('InstructorsRepository')
    private instructorRepository: IInstructorsRepository,
  ) {}

  public async execute(id: string): Promise<Instructor> {
    const instructor = await this.instructorRepository.findById(id);

    if (!instructor) throw new AppError('Instructor not found!');

    return instructor;
  }
}

export default ShowInstructorService;
