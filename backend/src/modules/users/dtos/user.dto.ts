import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

