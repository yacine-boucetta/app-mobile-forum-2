import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/users/model/users.interface';


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization; // assuming the token is sent in the "Authorization" header
   console.log(token);
     if (token == null || token== undefined) {
      return false;
    }

try{

  const decodedToken = this.jwtService.decode(token) as { isAdmin: boolean };
  console.log(decodedToken.isAdmin)
          if(decodedToken.isAdmin == true){
          return true 
        }
        else{
          return false
        }
          
        }
        catch{
          return false 
        }  
    
  }
}