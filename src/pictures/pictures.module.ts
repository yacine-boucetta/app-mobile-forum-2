import { forwardRef, Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { pictureProviders } from './pictures.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import{ Picture } from './pictures.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Picture]),
  forwardRef(() => DatabaseModule)],
  providers: [...pictureProviders,PicturesService],
  controllers: [PicturesController],
  exports:[PicturesService]
})
export class PicturesModule {}
