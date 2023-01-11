import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './model/entities/events.entity';
import { AppModule } from 'src/app.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [TypeOrmModule],
})
export class EventsModule {}
