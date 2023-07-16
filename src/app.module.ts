import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { UsersModule } from './users/users.module';
import { User } from './users/model/entities/users.entity';
import { PicturesModule } from './pictures/pictures.module';
import { Picture } from './pictures/model/entities/pictures.entity';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { NestFactory } from '@nestjs/core/nest-factory';
import { AdminModule } from './admin/admin.module';
import { typeOrmConfig } from './config';





@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    PicturesModule,
    EventsModule,
    AuthModule,
    AdminModule],
  controllers: [AppController],
  providers: [AppService],
})



export class AppModule  {}

