import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { User } from './users/users.entity';
import { Picture } from './pictures/pictures.entity'
import { UsersModule } from './users/users.module';
import { PicturesModule } from './pictures/pictures.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'api_share_event',
        entities: [
          User,
          Picture
        ],
        synchronize: true,
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => DatabaseModule),
    forwardRef(() => PicturesModule),
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
