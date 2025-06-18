import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    ) { }

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const createCompany = new this.companyModel({
            ...createCompanyDto
        })

        return createCompany.save();
    }

    async getCompany(companyId: string): Promise<Company> {
        const companyDetails = await this.companyModel.findById(companyId);
        return companyDetails
    }
}
