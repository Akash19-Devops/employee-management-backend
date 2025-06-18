import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserType {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  EMPLOYER = "employer"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.ADMIN
  })
  userType: UserType;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangedAt?: Date;
}

