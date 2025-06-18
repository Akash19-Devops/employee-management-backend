import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PayrollType, CountryName} from "../company.entity"
import { Type } from "class-transformer";

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsNotEmpty()
    @IsString()
    operatingName: string;

    @IsNotEmpty()
    @IsNumber()
    businessNo: number;

    @IsNotEmpty()
    @IsString()
    directorName: string;

    @IsNotEmpty()
    @IsString()
    managerPerson: string;

    @IsNotEmpty()
    @IsEmail()
    contactEmail: string;

    @IsNotEmpty()
    @IsNumber()
    contactNo: number;

    @IsOptional()
    streetNameAndNo: string;

    @IsOptional()
    city: string;

    @IsOptional()
    state: string;

    @IsOptional()
    @IsEnum(CountryName)
    country: CountryName;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsNotEmpty()
    @IsEnum(PayrollType)
    payrollType: PayrollType;

    @IsNotEmpty()
    @Type(() => Date)
    startDate: Date;

}