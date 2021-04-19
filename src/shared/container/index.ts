import { container } from 'tsyringe';

import InstructorsRepository from '@modules/instructors/infra/typeorm/repositories/InstructorsRepository';
import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';

import MembersRepository from '@modules/members/infra/typeorm/repositories/MembersRepository';
import IMembersRepository from '@modules/members/repositories/IMembersRepository';

container.registerSingleton<IInstructorsRepository>(
  'InstructorsRepository',
  InstructorsRepository,
);

container.registerSingleton<IMembersRepository>('MembersRepository', MembersRepository);
