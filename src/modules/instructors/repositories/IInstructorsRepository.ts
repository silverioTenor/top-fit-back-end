import ICreateInstructorDTO from '../dtos/ICreateInstructorDTO';
import Instructor from '../infra/typeorm/entities/Instructor';

export default interface IInstructorsRepository {
  findById(id: string): Promise<Instructor | undefined>;
  findByEmail(email: string): Promise<Instructor | undefined>;
  create(data: ICreateInstructorDTO): Promise<Instructor>;
  save(instructor: Instructor): Promise<Instructor>;
}
