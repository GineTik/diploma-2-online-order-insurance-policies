import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { USER_PAYLOAD } from '../constants/request-keys.constants';

@Injectable()
export class PayloadExistsGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req: Request = context.switchToHttp().getRequest();
		const payload = req[USER_PAYLOAD];

		return payload ? true : false;
	}
}
