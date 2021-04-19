import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import IMembersRepository from '../repositories/IMembersRepository';

import Member from '../infra/typeorm/entities/Member';

@injectable()
class CreateMember {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
  ) {}

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
    const hasMember = await this.membersRepository.findByEmail(email);

    if (hasMember) throw new AppError('Email address already used!');

    const parsedBirth = new Date(birth);

    const member = this.membersRepository.create({
      name,
      email,
      birth: parsedBirth,
      gender,
      blood,
      weight,
      height,
      instructor_id,
    });

    return member;
  }
}

export default CreateMember;
