import { container } from 'tsyringe';

import InstructorsRepository from '@modules/instructors/infra/typeorm/repositories/InstructorsRepository';
import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';

container.registerSingleton<IInstructorsRepository>(
  'InstructorsRepository',
  InstructorsRepository,
);
