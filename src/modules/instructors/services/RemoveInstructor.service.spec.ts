import AppError from '@shared/errors/AppError';

import FakeInstructorsRepository from '../repositories/fakes/FakeInstructorsRepository';
import CreateInstructorService from './CreateInstructor.service';
import RemoveInstructorService from './RemoveInstructor.service';

let fakeInstructorsRepository: FakeInstructorsRepository;
let createInstructor: CreateInstructorService;
let removeInstructor: RemoveInstructorService;

describe('RemoveInstructor', () => {
  beforeEach(() => {
    fakeInstructorsRepository = new FakeInstructorsRepository();
    createInstructor = new CreateInstructorService(fakeInstructorsRepository);
    removeInstructor = new RemoveInstructorService(fakeInstructorsRepository);
  });

  it('Should be able to remove an instructor', async () => {
    const instructor = await createInstructor.execute({
      name: 'Juca Brasileiro',
      email: 'juca@gmail.com',
      birth: new Date(1975, 4, 22),
      gender: 'male',
    });

    await removeInstructor.execute(instructor.id);

    await expect(
      fakeInstructorsRepository.findById(instructor.id),
    ).resolves.toBeUndefined();
  });

  it('Should not be able to remove an instructor', async () => {
    await expect(removeInstructor.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
