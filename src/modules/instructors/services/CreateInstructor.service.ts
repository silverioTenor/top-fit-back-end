import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICreateInstructorDTO from '../dtos/ICreateInstructorDTO';

import Instructor from '../infra/typeorm/entities/Instructor';
import IInstructorsRepository from '../repositories/IInstructorsRepository';

@injectable()
class CreateInstructorService {
  constructor(
    @inject('InstructorsRepository')
    private instructorRepository: IInstructorsRepository,
  ) {}

  public async execute({
    name,
    email,
    birth,
    gender,
  }: ICreateInstructorDTO): Promise<Instructor> {
    const hasUser = await this.instructorRepository.findByEmail(email);

    if (hasUser) throw new AppError('Email address already used!');

    const instructorDate = new Date(birth);

    const instructor = await this.instructorRepository.create({
      name,
      email,
      birth: instructorDate,
      gender,
    });

    return instructor;
  }
}

export default CreateInstructorService;
