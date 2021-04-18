export default interface ICreateMemberDTO {
  name: string;
  email: string;
  birth: Date;
  gender: 'male' | 'female';
  blood: 'A1' | 'A2' | 'B1' | 'B2' | 'AB1' | 'AB2' | 'O1' | 'O2';
  weight: number;
  height: number;
  instructor_id: string;
}
