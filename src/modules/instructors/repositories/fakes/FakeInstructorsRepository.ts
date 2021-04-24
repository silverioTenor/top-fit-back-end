import { v4 as uuid } from 'uuid';

import ICreateInstructorDTO from '@modules/instructors/dtos/ICreateInstructorDTO';
import Instructor from '@modules/instructors/infra/typeorm/entities/Instructor';
import IInstructorsRepository from '../IInstructorsRepository';

class FakeInstructorsRepository implements IInstructorsRepository {
  private instructors: Array<Instructor> = [];

  public async findById(id: string): Promise<Instructor | undefined> {
    const foundInstructor = this.instructors.find(instructor => instructor.id === id);

    return foundInstructor;
  }

  public async findByEmail(email: string): Promise<Instructor | undefined> {
    const foundInstructor = this.instructors.find(
      instructor => instructor.email === email,
    );

    return foundInstructor;
  }

  public async create({
    name,
    email,
    birth,
    gender,
  }: ICreateInstructorDTO): Promise<Instructor> {
    const instructor = new Instructor();

    Object.assign(instructor, {
      id: uuid(),
      name,
      email,
      birth,
      gender,
    });

    this.instructors.push(instructor);

    return instructor;
  }

  public async save({ id, name, email, birth, gender }: Instructor): Promise<Instructor> {
    const findIndex = this.instructors.findIndex((instructor, index) => {
      if (instructor.id === id) return index;
    });

    const instructor = {
      ...this.instructors[findIndex],
      id,
      name,
      email,
      birth,
      gender,
    };

    this.instructors[findIndex] = instructor;

    return instructor;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.instructors.findIndex((instructor, index) => {
      if (instructor.id === id) return index;
    });

    this.instructors.splice(findIndex, 1);
  }
}

export default FakeInstructorsRepository;
