export default interface ICreateInstructorDTO {
  name: string;
  email: string;
  birth: Date;
  gender: 'male' | 'female';
}
