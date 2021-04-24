import { EntityRepository, Repository } from "typeorm";
import { Staff } from "src/staff/staff.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthSignInCredentialsDto } from 'src/staff/dto/auth-signin-credentials';

@EntityRepository(Staff)
export class StaffRepository extends Repository<Staff> {
    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        const { username, staff_first_name, staff_last_name, password } = authCredentialsDto;

        const staff = new Staff();
        staff.username = username;
        staff.staff_first_name = staff_first_name;
        staff.staff_last_name = staff_last_name;
        staff.salt = await bcrypt.genSalt();
        staff.password = await this.hashPassword(password, staff.salt);

        try {
            await staff.save();
        }
        catch (error) {
            if (error.code === 23505) {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto | AuthSignInCredentialsDto) : Promise<string> {
        const { username, password } = authCredentialsDto;

        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }

        return null;
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}