import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
	async isNotExists(userId: string) {
		return true;
	}

	async create(user: UserDto) {}
}
