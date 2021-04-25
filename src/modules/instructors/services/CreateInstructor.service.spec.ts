import AppError from '@shared/errors/AppError';

import FakeInstructorsRepository from '../repositories/fakes/FakeInstructorsRepository';
import CreateInstructorService from './CreateInstructor.service';

let fakeInstructorsRepository: FakeInstructorsRepository;
let createInstructor: CreateInstructorService;

describe('CreateInstructor', () => {
  beforeEach(() => {
    fakeInstructorsRepository = new FakeInstructorsRepository();
    createInstructor = new CreateInstructorService(fakeInstructorsRepository);
  });

  it('Should be able to create a new instructor', async () => {
    const instructor = await createInstructor.execute({
      name: 'Juca Brasileiro',
      email: 'juca@gmail.com',
      birth: new Date(1975, 4, 22),
      gender: 'male',
    });

    expect(instructor.email).toBe('juca@gmail.com');
  });

  it('Should not be able to create a new instructor with existing email', async () => {
    await createInstructor.execute({
      name: 'Juca Brasileiro',
      email: 'juca@gmail.com',
      birth: new Date(1975, 4, 22),
      gender: 'male',
    });

    await expect(
      createInstructor.execute({
        name: 'Adalberto Nunes',
        email: 'juca@gmail.com',
        birth: new Date(1988, 8, 14),
        gender: 'male',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
