import { IsEmail} from "class-validator";
import { Picture } from "src/pictures/model/entities/pictures.entity";

import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, BeforeInsert, OneToMany, Unique, BaseEntity } from "typeorm"
import {Event} from '../../../events/model/entities/events.entity'
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ length: 255 })

  email: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  url: string;

  @Column({ length: 255 })
  lastname: string;

  @Column({ length: 255 })
  @BeforeInsert()
  password: string;
  
  @Column()
  isAdmin:boolean;

  @OneToMany( () => Event, (event) => event.users)
  @JoinTable({ name: 'user_event',
  joinColumn: {
    name: 'user',
    referencedColumnName: 'id',
  },
  inverseJoinColumn: {
    name: 'event',
    referencedColumnName: 'id',
  }})
  events:Event[];


  @OneToMany(() => Picture, (picture) => picture.user,{onDelete:'CASCADE',onUpdate:'CASCADE'})
  picture: Picture[]

}


