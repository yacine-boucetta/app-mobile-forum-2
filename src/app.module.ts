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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'api_share_event',
      synchronize: true,
      logging: true,
      entities: [User,Picture,Event],
      subscribers: [],
      migrations: [],
      autoLoadEntities: true,
    }),
    UsersModule,PicturesModule,EventsModule,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {}

