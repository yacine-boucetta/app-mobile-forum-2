import { forwardRef, Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';
import { databaseProviders } from './database.providers';


@Module({
  imports : [ forwardRef(() => UsersModule), forwardRef(() => EventsModule), ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}