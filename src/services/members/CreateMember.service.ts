import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Member from '../../models/Member';

interface RequestProps {
  name: string;
  email: string;
  birth: Date;
  gender: 'male' | 'female';
  blood: 'A1' | 'A2' | 'B1' | 'B2' | 'AB1' | 'AB2' | 'O1' | 'O2';
  weight: number;
  height: number;
  instructor_id: string;
}

class CreateMember {
  public async execute(props: RequestProps): Promise<Member> {
    const membersRepository = getRepository(Member);

    const hasMember = await membersRepository.findOne({ where: { email: props.email } });

    if (hasMember) throw new AppError('Email address already used!');

    const parsedBirth = new Date(props.birth);

    const member = membersRepository.create({
      name: props.name,
      email: props.email,
      birth: parsedBirth,
      gender: props.gender,
      blood: props.blood,
      weight: props.weight,
      height: props.height,
      instructor_id: props.instructor_id,
    });

    await membersRepository.save(member);

    return member;
  }
}

export default CreateMember;
