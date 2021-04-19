import { getRepository, Repository } from 'typeorm';

import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';
import ICreateInstructorDTO from '@modules/instructors/dtos/ICreateInstructorDTO';

import Instructor from '../entities/Instructor';

class InstructorsRepository implements IInstructorsRepository {
  private ormRepository: Repository<Instructor>;

  constructor() {
    this.ormRepository = getRepository(Instructor);
  }

  public async findById(id: string): Promise<Instructor | undefined> {
    const instructor = await this.ormRepository.findOne(id);

    return instructor;
  }

  public async findByEmail(email: string): Promise<Instructor | undefined> {
    const instructor = await this.ormRepository.findOne({ where: { email } });

    return instructor;
  }

  public async create(data: ICreateInstructorDTO): Promise<Instructor> {
    const instructor = await this.ormRepository.create(data);

    await this.ormRepository.save(instructor);

    return instructor;
  }

  public async save(data: ICreateInstructorDTO): Promise<Instructor> {
    const instructor = await this.ormRepository.save(data);

    return instructor;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default InstructorsRepository;
