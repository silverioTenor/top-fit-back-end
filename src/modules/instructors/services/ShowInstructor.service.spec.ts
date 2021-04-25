import AppError from '@shared/errors/AppError';

import FakeInstructorsRepository from '../repositories/fakes/FakeInstructorsRepository';
import CreateInstructorService from './CreateInstructor.service';
import ShowInstructorService from './ShowInstructor.service';

let fakeInstructorsRepository: FakeInstructorsRepository;
let createInstructor: CreateInstructorService;
let showInstructor: ShowInstructorService;

describe('ShowInstructor', () => {
  beforeEach(() => {
    fakeInstructorsRepository = new FakeInstructorsRepository();
    createInstructor = new CreateInstructorService(fakeInstructorsRepository);
    showInstructor = new ShowInstructorService(fakeInstructorsRepository);
  });

  it('Should be able to show an instructor', async () => {
    const instructor = await createInstructor.execute({
      name: 'Juca Brasileiro',
      email: 'juca@gmail.com',
      birth: new Date(1975, 4, 22),
      gender: 'male',
    });

    const getInstructor = await showInstructor.execute(instructor.id);

    expect(getInstructor).toEqual(instructor);
  });

  it('Should not be able to show an instructor without id', async () => {
    await expect(showInstructor.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
