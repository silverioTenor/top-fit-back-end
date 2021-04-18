import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import Member from '../infra/typeorm/entities/Member';
import ICreateMemberDTO from '../dtos/ICreateMemberDTO';

class UpdateMemberService {
  public async excute({
    name,
    email,
    instructor_id,
    weight,
    height,
  }: ICreateMemberDTO): Promise<Member> {
    const membersRepository = getRepository(Member);

    const hasMember = await membersRepository.findOne({ where: { email } });

    if (!hasMember) throw new AppError('Member not found!');

    const updatedMember = membersRepository.create({
      ...hasMember,
      name,
      email,
      weight,
      height,
      instructor_id,
    });

    await membersRepository.save(updatedMember);

    return updatedMember;
  }
}

export default UpdateMemberService;
