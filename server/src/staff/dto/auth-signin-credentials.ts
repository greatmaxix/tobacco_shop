import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class AuthSignInCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}