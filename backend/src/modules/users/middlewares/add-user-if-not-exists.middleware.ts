import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../index';
import { NextFunction } from 'express';
import { USER_PAYLOAD } from '@shared/auth';

@Injectable()
export class AddUserIfNotExistsMiddleware implements NestMiddleware {
	constructor(private readonly usersService: UsersService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const payload = req[USER_PAYLOAD];
		if (!payload || typeof payload !== 'object' || !payload['sub']) {
			return next();
		}

		const userId = payload['sub'];
		if (await this.usersService.isNotExists(userId)) {
			await this.usersService.create({ userId });
		}

		next();
	}
}
