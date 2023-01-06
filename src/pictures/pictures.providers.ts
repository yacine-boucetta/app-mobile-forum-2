import { DataSource } from 'typeorm';
import { Picture } from './pictures.entity';

export const pictureProviders = [
  {
    provide: 'picture',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Picture),
    inject: ['DATA_SOURCE'],
  },
];