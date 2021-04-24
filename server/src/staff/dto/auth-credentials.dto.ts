import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(1)
    @MaxLength(40)
    staff_first_name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(40)
    staff_last_name: string;
    
    
    @IsString()
    @MinLength(8)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password is too weak' }
    )
    password: string;
}