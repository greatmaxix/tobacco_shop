import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'src/staff/jwt-payload.interface';
import { Staff } from 'src/staff/staff.entity';
import { StaffRepository } from 'src/staff/staff.repository';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(StaffRepository)
        private staffRepository: StaffRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        })
    }

    async validate(payload: JwtPayload) : Promise<Staff> {
        const { username } = payload;
        const staff = await this.staffRepository.findOne({ username });

        if (!staff) {
            throw new UnauthorizedException();
        }

        return staff;
    }
}