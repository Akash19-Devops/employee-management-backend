import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

export enum PayrollType {
    WEEKLY = 'weekly',
    BI_WEEKLY = 'bi-weekly',
    SEMI_MONTHLY = 'semi-monthly',
    MONTHLY = 'monthly'
}

export enum CountryName {
    USA = 'usa',
    CANADA = 'canada'
}

@Schema({ timestamps: true })
export class Company {
    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    operatingName: string;

    @Prop({ required: true })
    businessNo: number;

    @Prop({ required: true })
    directorName: string;

    @Prop({ required: true })
    managerPerson: string

    @Prop({ required: true, unique: true })
    contactEmail: string;

    @Prop({ unique: true })
    contactNo: number;

    @Prop()
    streetNameAndNo: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop({ enum: CountryName, default: CountryName.CANADA })
    country: CountryName

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ enum: PayrollType, default: PayrollType.WEEKLY, required: true })
    userType: PayrollType;

    @Prop({ required: true })
    startDate: Date;

}

export const CompanySchema = SchemaFactory.createForClass(Company);
