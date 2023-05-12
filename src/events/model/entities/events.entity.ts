
import { Picture } from 'src/pictures/model/entities/pictures.entity';
import { User } from "src/users/model/entities/users.entity";

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,ManyToOne,OneToMany,CreateDateColumn, ManyToMany, JoinColumn, JoinTable, Unique,} from "typeorm"


@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  @CreateDateColumn()
  start_date: Date;

  @Column()
  @CreateDateColumn()
  end_date: Date;

  @Column()
  id_user: number;

 @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  url_event: string;

  @Column()
  isPrivate:boolean;


  @OneToMany(() => User, (user) => user.events,{cascade:true})
  @JoinTable({
    name: 'user_event',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'event',
      referencedColumnName: 'id',
    },

  })
    users:User[];
 

  
  @OneToMany(() => Picture, (picture) => picture.event)
    picture: Picture[]
  
}

