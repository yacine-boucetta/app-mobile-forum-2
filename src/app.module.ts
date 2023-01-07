import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'api_share_event',
        entities: [
            User,
           
        ],
        synchronize: true,
    }),
    forwardRef(() => UsersModule),

    forwardRef(() => DatabaseModule),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
