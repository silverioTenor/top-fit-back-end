import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Member from '../infra/typeorm/entities/Member';

import ICreateMemberDTO from '../dtos/ICreateMemberDTO';
import IMembersRepository from '../repositories/IMembersRepository';

@injectable()
class UpdateMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
  ) {}

  public async excute({
    name,
    email,
    instructor_id,
    weight,
    height,
  }: ICreateMemberDTO): Promise<Member> {
    const hasMember = await this.membersRepository.findByEmail(email);

    if (!hasMember) throw new AppError('Member not found!');

    const updatedMember = await this.membersRepository.save({
      ...hasMember,
      name,
      email,
      weight,
      height,
      instructor_id,
    });

    return updatedMember;
  }
}

export default UpdateMemberService;
