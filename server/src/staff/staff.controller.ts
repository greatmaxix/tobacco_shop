import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from 'src/staff/dto/auth-credentials.dto';
import { GetStaff } from 'src/staff/get-user.decorator';
import { StaffService } from 'src/staff/staff.service';

@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) {}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.staffService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken: string }> {
        return this.staffService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetStaff() staff) {
        console.log(staff);
    }
}
