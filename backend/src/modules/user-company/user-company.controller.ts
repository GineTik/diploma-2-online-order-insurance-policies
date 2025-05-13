import { Controller, Get } from '@nestjs/common';
import { Auth, UserId } from '@shared/auth';
import { CompaniesService } from '@modules/companies';

@Controller()
export class UserCompanyController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Get('users/company')
	@Auth()
	async getUserCompany(@UserId() userId: string) {
		return await this.companiesService.getByAdminSub(userId);
	}
}
