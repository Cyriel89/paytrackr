import {  IsEmail, IsString, MinLength, Matches, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: 'Password must contain letters and digits' })
    password: string;

    @IsOptional()
    @IsIn(['ADMIN', 'ANALYST', 'VIEWER'])
    role?: 'ADMIN' | 'ANALYST' | 'VIEWER';
}