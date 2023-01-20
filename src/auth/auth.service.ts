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

    async login(GetUserDto:GetUserDto) {
        const foundUser = await this.UsersService.findOneByEmail(GetUserDto.email);
       
        if (!foundUser) {
            return "l'email est incorrect";
        }
        const passwordMatch =bcrypt.compare(GetUserDto.password,foundUser.password);
        if (!passwordMatch) {
            return 'l email ou le mot de passe est incorrect'
        }

        const payload = {
            id:foundUser.id,
            email:foundUser.email,
            name:foundUser.name,
            lastname:foundUser.lastname,
        } 
   
        return {
            acess_token: this.jwtService.sign(payload),
        }


    }

    
}
