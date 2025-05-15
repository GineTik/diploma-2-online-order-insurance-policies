import { Controller, Get } from '@nestjs/common';
import { Auth, UserSub } from '@shared/auth';
import { CompaniesService } from '@modules/companies';

@Controller()
export class UserCompanyController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Get('users/company')
	@Auth()
	async getUserCompany(@UserSub() userId: string) {
		return await this.companiesService.getByAdminSub(userId);
	}
}
