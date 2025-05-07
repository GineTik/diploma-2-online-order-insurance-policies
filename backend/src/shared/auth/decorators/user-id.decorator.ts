import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { USER_PAYLOAD } from '../constants/auth.constants';

export const UserId = createParamDecorator(async (_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	if (!request[USER_PAYLOAD]) {
		throw new UnauthorizedException('Unauthorized: user payload not found');
	}

	return request[USER_PAYLOAD].sub;
});
