import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './users.entity';
import { userProviders } from './users.providers';

@Module({
  imports: [ TypeOrmModule.forFeature([User]),
  forwardRef(() => DatabaseModule)],
  controllers: [UsersController],
  providers: [...userProviders,UsersService],
  exports:[UsersService]
})
export class UsersModule {}
