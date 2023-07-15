import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Picture } from "./pictures/model/entities/pictures.entity";
import { User } from "./users/model/entities/users.entity";

export const typeOrmConfig =  {
            type: 'mysql',
            host: 'https://damien-verschaere.students-laplateforme.io:8443/',
            port: 3306,
            username: 'RYD',
            password: 'shareevent2023!',
            database: 'damien-verschaere_shareEvent',
            synchronize: true,
            logging: true,
            entities: [User,Picture,Event],
            subscribers: [],
            migrations: [],
            autoLoadEntities: true,
};


