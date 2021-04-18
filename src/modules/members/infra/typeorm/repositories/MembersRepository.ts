import { getRepository, Repository } from 'typeorm';

import IMembersRepository from '@modules/members/repositories/IMembersRepository';
import ICreateMemberDTO from '@modules/members/dtos/ICreateMemberDTO';

import Member from '@modules/members/infra/typeorm/entities/Member';

class MembersRepository implements IMembersRepository {
  private ormRepository: Repository<Member>;

  constructor() {
    this.ormRepository = getRepository(Member);
  }

  public async findById(id: string): Promise<Member | undefined> {
    const member = await this.ormRepository.findOne(id);

    return member;
  }

  public async findByEmail(email: string): Promise<Member | undefined> {
    const member = await this.ormRepository.findOne({ where: { email } });

    return member;
  }

  public async create(data: ICreateMemberDTO): Promise<Member> {
    const member = await this.ormRepository.create(data);

    await this.ormRepository.save(member);

    return member;
  }

  public async save(data: Member): Promise<Member> {
    const member = await this.ormRepository.save(data);

    return member;
  }
}

export default MembersRepository;
