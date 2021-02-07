import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Member from '../../models/Member';

interface RequestProps {
  name: string;
  email: string;
  weight: number;
  height: number;
  instructor_id: string;
}

class UpdateMemberService {
  public async excute(props: RequestProps): Promise<Member> {
    const membersRepository = getRepository(Member);

    const hasMember = await membersRepository.findOne({ where: { email: props.email } });

    if (!hasMember) throw new AppError('Member not found!');

    const updatedMember = membersRepository.create({
      ...hasMember,
      name: props.name,
      weight: props.weight,
      height: props.height,
      instructor_id: props.instructor_id,
    });

    await membersRepository.save(updatedMember);

    return updatedMember;
  }
}

export default UpdateMemberService;
