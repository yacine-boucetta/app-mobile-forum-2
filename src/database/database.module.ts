import { forwardRef, Module } from '@nestjs/common';
import { PicturesModule } from 'src/pictures/pictures.module';
import { UsersModule } from 'src/users/users.module';
import { databaseProviders } from './database.providers';


@Module({
  imports : [ forwardRef(() => UsersModule), 
    forwardRef(() => PicturesModule)],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}