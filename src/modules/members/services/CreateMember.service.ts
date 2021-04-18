import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import Member from '../infra/typeorm/entities/Member';

class CreateMember {
  public async execute({
    name,
    email,
    birth,
    gender,
    instructor_id,
    blood,
    weight,
    height,
  }: ICreateMemberDTO): Promise<Member> {
    const membersRepository = getRepository(Member);

    const hasMember = await membersRepository.findOne({ where: { email } });

    if (hasMember) throw new AppError('Email address already used!');

    const parsedBirth = new Date(birth);

    const member = membersRepository.create({
      name,
      email,
      birth: parsedBirth,
      gender,
      blood,
      weight,
      height,
      instructor_id,
    });

    await membersRepository.save(member);

    return member;
  }
}

export default CreateMember;
