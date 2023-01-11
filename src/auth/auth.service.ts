import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GetUserDto } from '../users/dto/get_user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.UsersService.findOneByEmail(email);

        if (user) {
            return user;
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email:string,password:string) {
        const foundUser = await this.UsersService.findOneByEmail(email);
        if (!foundUser) {
            throw new NotFoundException();
        }

        if (bcrypt.compare(password,foundUser.password)) {
            return 'youpi'
        }

        const payload = {
            createdAt: new Date().toISOString(),
            sub: foundUser.id,
            role: ''
        }
        return {
            acess_token: this.jwtService.sign(payload),
        }


    }

    
}
