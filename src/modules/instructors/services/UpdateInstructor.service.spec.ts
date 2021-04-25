import AppError from '@shared/errors/AppError';

import FakeInstructorsRepository from '../repositories/fakes/FakeInstructorsRepository';
import CreateInstructorService from './CreateInstructor.service';
import UpdateInstructorService from './UpdateInstructor.service';

let fakeInstructorsRepository: FakeInstructorsRepository;
let createInstructor: CreateInstructorService;
let updateInstructor: UpdateInstructorService;

describe('UpdateInstructor', () => {
  beforeEach(() => {
    fakeInstructorsRepository = new FakeInstructorsRepository();
    createInstructor = new CreateInstructorService(fakeInstructorsRepository);
    updateInstructor = new UpdateInstructorService(fakeInstructorsRepository);
  });

  it('Should be able to update a instructor', async () => {
    const instructor = await createInstructor.execute({
      name: 'Juca Brasileiro',
      email: 'juca@gmail.com',
      birth: new Date(1975, 4, 22),
      gender: 'male',
    });

    const updatedInstructor = await updateInstructor.execute({
      ...instructor,
      email: 'jucabrasileiro@gmail.com',
    });

    expect(updatedInstructor.email).toBe('jucabrasileiro@gmail.com');
  });

  it('Should not be able to update a instructor without id', async () => {
    const instructor = await createInstructor.execute({
      name: 'Juca Brasileiro',
      email: 'juca@gmail.com',
      birth: new Date(1975, 4, 22),
      gender: 'male',
    });

    await expect(
      updateInstructor.execute({
        ...instructor,
        id: 'non-existing',
        email: 'jucabrasileiro@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
