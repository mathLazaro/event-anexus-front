import { UserDto } from "./user.dto";

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    message: string;
    token: string;
    user: UserDto
}
