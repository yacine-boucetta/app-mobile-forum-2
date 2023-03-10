import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './model/entities/events.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';



@Module({
  imports: [TypeOrmModule.forFeature([Event]),UsersModule],
  providers: [EventsService,UsersService],
  controllers: [EventsController],
  exports: [TypeOrmModule],
})
export class EventsModule {}
