
import { User } from 'src/users/users.entity';
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
        password: 'root',
        database: 'api_share_event',
        entities: [
            User,
            
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
