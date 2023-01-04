import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database } from './database/database.providers';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
