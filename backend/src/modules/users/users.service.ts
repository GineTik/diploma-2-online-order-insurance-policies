import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { clerkClient } from '@clerk/express';
import { PrismaService } from '@shared/prisma';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async isNotExists(userId: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		return !user;
	}

	async create(user: CreateUserDto) {
		return await this.prisma.user.create({
			data: {
				id: user.userId,
			},
		});
	}

	async getUserPermissions(userId: string) {
		const user = await clerkClient.users.getUser(userId);
		return user?.privateMetadata?.permissions;
	}
}
