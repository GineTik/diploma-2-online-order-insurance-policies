import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	userId: string;
}
