import { Module } from '@nestjs/common';
import { UserCompanyController } from './user-company.controller';
import { PrismaModule } from '@shared/prisma';
import { CompaniesModule } from '@modules/companies';

@Module({
	controllers: [UserCompanyController],
	imports: [PrismaModule, CompaniesModule],
})
export class UserCompanyModule {}
