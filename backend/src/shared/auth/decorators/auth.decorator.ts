import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PayloadExistsGuard } from '../guards/payload-exists.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(PayloadExistsGuard),
    ApiBearerAuth('JWT-auth'),
    SetMetadata('auth', true),
  );
}