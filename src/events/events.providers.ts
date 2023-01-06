import { DataSource } from 'typeorm';
import { Event } from './events.entity';

export const eventsProviders = [
  {
    provide: 'event',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
    inject: ['DATA_SOURCE'],
  },
];