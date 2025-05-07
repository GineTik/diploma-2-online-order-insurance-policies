import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_PAYLOAD } from '../constants/request-keys.constants';
import { clerkClient } from '@clerk/express';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredPermission = this.reflector.get<string>(
			'permission',
			context.getHandler(),
		);

		if (!requiredPermission) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const userId = request[USER_PAYLOAD].sub;
		const user = await clerkClient.users.getUser(userId);
		const permissions = user?.privateMetadata?.permissions as string[];

		return permissions?.includes(requiredPermission) ?? false;
	}
}
