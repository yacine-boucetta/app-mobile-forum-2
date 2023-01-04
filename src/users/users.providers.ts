import { DataSource } from 'typeorm';
import { User } from './users.entity';

export const userProviders = [
  {
    provide: 'user',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];