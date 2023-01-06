
import { Picture } from 'src/pictures/pictures.entity';
import { User } from 'src/users/users.entity';
import{ Event } from 'src/events/events.entity'
import { DataSource } from 'typeorm';

export const  databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'api_share_event',
        entities: [
            User,Picture,Event
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
