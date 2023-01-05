import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { databaseProviders } from './database.providers';


@Module({
  imports : [ forwardRef(() => UsersModule) ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}