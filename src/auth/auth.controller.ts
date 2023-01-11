import { Controller, Post ,Body} from '@nestjs/common';
import { GetUserDto } from 'src/users/dto/get_user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
        async login(@Body() GetUserDto: GetUserDto){
            return this.authService.login(GetUserDto);
    }
}
