import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../guards/permission.guard';

export function Permission(permission: string) {
	return applyDecorators(
		SetMetadata('permission', permission),
		UseGuards(PermissionGuard),
	);
}
