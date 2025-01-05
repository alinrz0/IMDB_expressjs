import { IsDefined, IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export default class LoginDto{
    @IsDefined()
    @IsEmail()
    email : string;
    @IsDefined()
    @MinLength(8)
    password : string;
}