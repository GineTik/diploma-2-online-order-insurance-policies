import { Controller, Delete, Get, Post } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  async getAll() {

  }

  @Post()
  async create() {
    
  }

  @Get(':id/policies')
  async getPolicies() {

  }

  @Delete(':id')
  async delete() {

  }
}
