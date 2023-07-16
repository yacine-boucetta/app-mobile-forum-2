import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Picture } from "./pictures/model/entities/pictures.entity";
import { User } from "./users/model/entities/users.entity";

export const typeOrmConfig:TypeOrmModuleOptions =  {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            connectorPackage:'mysql2',
            password: 'Japanexpo10.',
            username: 'shareEvent',
            database: 'yacine-boucetta_share_event',
            synchronize: true,
            logging: true,
            entities: [User,Picture,Event],
            subscribers: [],
            migrations: [],
            autoLoadEntities: true,

}


