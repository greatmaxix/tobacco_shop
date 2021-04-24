import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/staff/dto/auth-credentials.dto';
import { StaffRepository } from 'src/staff/staff.repository';
import { JwtPayload } from 'src/staff/jwt-payload.interface';
import { AuthSignInCredentialsDto } from 'src/staff/dto/auth-signin-credentials';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(StaffRepository)
        private staffRepository: StaffRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.staffRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthSignInCredentialsDto) : Promise<{ accessToken: string }> {
        const username = await this.staffRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload : JwtPayload = { username }; //roles: 'admin', access: 'some_feature'
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
