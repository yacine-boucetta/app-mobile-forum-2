import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GetUserDto } from '../users/dto/get_user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/users/model/users.interface';

@Injectable()
export class AuthService {

    constructor(private readonly UsersService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.UsersService.findOneByEmail(email);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(GetUserDto:GetUserDto) {
      console.log(GetUserDto.email)
        const foundUser = await this.UsersService.findOneByEmail(GetUserDto.email);
        if (!foundUser) {
          return "l'email est incorrect";
      }
      const passwordMatch =await bcrypt.compare(GetUserDto.password,foundUser.password);
      
      if (!passwordMatch) {
          return 'l email ou le mot de passe est incorrect'
      }
        // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        const payload:UserInterface = await{
            id:foundUser.id,
            url:foundUser.url,
            email:foundUser.email,
            name:foundUser.name,
            lastname:foundUser.lastname,
            isAdmin:foundUser.isAdmin,
        } 
        
        const accessToken = this.jwtService.sign(payload,{ expiresIn:'30 days'});
        const refreshToken = this.jwtService.sign(payload,{ expiresIn:'30 days'});
      
        
        return {
            acess_token: accessToken,
            refresh_token: refreshToken,
        }
    }

    async refresh(refreshToken):Promise<any> {
        console.log(refreshToken)
        const decoded = await this.jwtService.verify(refreshToken);
        const user = await this.UsersService.findOne(decoded.id);
        
        if (!user) {
          throw new UnauthorizedException('Invalid token');
        }
    
        try {
          const payload = {
            id:user.id,
            url:user.url,
            email:user.email,
            name:user.name,
            lastname:user.lastname,
            isAdmin:user.isAdmin,
        } 
          const accessToken = this.jwtService.sign(payload);
          return {
            acess_token: accessToken,
          };
        } catch (err) {
          throw new UnauthorizedException('Invalid token');
        }
      }
}
