import { Controller, Get, Param } from '@nestjs/common';
import { PERMISSIONS } from '@shared/auth';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('permissions')
	async getAllPermissions() {
		return Object.values(PERMISSIONS);
	}

	@Get(':userId/permissions')
	async getUserPermissions(@Param('userId') userId: string) {
		return await this.usersService.getUserPermissions(userId);
	}
}
