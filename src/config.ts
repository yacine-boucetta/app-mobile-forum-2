import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Picture } from "./pictures/model/entities/pictures.entity";
import { User } from "./users/model/entities/users.entity";

export const typeOrmConfig:TypeOrmModuleOptions =  {
            type: 'mysql',
            host: 'http://51.91.236.255/',
            port: 3306,
            username: '	shareeiryd',
            password: 'ShareEvent2023',
            database: 'shareeiryd',
            synchronize: true,
            logging: true,
            entities: [User,Picture,Event],
            subscribers: [],
            migrations: [],
            autoLoadEntities: true,
};


