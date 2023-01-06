import { forwardRef, Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import{ Event } from './events.entity'

@Module({
  imports:[TypeOrmModule.forFeature([Event]),
  forwardRef(() => DatabaseModule)],
  providers: [...eventsProviders,EventsService],
  controllers: [EventsController],
  exports:[EventsService]
})
export class EventsModule {}
