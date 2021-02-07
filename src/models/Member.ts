import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Instructor from './Instructor';

@Entity('users')
class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('timestamp with time zone')
  birth: Date;

  @Column()
  gender: 'male' | 'female';

  @Column()
  blood: 'A1' | 'A2' | 'B1' | 'B2' | 'AB1' | 'AB2' | 'O1' | 'O2';

  @Column()
  weight: string;

  @Column()
  height: string;

  @Column()
  instructor_id: string;

  @ManyToOne(() => Instructor)
  @JoinColumn({ name: 'instructor_id' })
  instructor: Instructor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Member;
