import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PayrollType {
  WEEKLY = 'weekly',
  BI_WEEKLY = 'bi-weekly',
  SEMI_MONTHLY = 'semi-monthly',
  MONTHLY = 'monthly',
}

export enum CountryName {
  USA = 'usa',
  CANADA = 'canada',
}

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  operatingName: string;

  @Column({ type: 'bigint' })
  businessNo: number;

  @Column()
  directorName: string;

  @Column()
  managerPerson: string;

  @Column({ unique: true })
  contactEmail: string;

  @Column({ unique: true, type: 'bigint', nullable: true })
  contactNo: number;

  @Column({ nullable: true })
  streetNameAndNo: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({
    type: 'enum',
    enum: CountryName,
    default: CountryName.CANADA,
  })
  country: CountryName;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: PayrollType,
    default: PayrollType.WEEKLY,
  })
  userType: PayrollType;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
