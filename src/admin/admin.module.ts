import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PicturesModule } from 'src/pictures/pictures.module';
import { EventsModule } from 'src/events/events.module';
import { EventsController } from 'src/events/events.controller';
import { EventsService } from 'src/events/events.service';
import { UsersService } from 'src/users/users.service';
import { PicturesService } from 'src/pictures/pictures.service';
import { UsersController } from 'src/users/users.controller';
import { PicturesController } from 'src/pictures/pictures.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event]),UsersModule,PicturesModule,EventsModule],
  providers: [EventsService,UsersService,PicturesService,AdminService],
  controllers: [EventsController,UsersController,PicturesController,AdminController],
  exports: [TypeOrmModule],
})
export class AdminModule {}
