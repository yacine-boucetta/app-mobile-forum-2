import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './model/entities/users.entity';
import { EventsService } from 'src/events/events.service';
import { EventsModule } from 'src/events/events.module';
import { UserEvent } from 'src/userEvent.entity';
import { Repository } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([User,UserEvent]),UsersModule],
  exports: [TypeOrmModule],
  providers: [UsersService],
  controllers: [UsersController],
}
)
export class UsersModule {}