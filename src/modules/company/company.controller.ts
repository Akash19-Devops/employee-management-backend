import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './company.schema';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
        return this.companyService.create(createCompanyDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('details/:id')
    async getCompanyDetails(@Param('id') id: string): Promise<Company> {
        return this.companyService.getCompany(id);
    }
}
