import { Picture } from "src/pictures/model/entities/pictures.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, BeforeInsert, OneToMany } from "typeorm"
import {Event} from '../../../events/model/entities/events.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
  
@ManyToMany(() => Event,event=>event.id, {
  cascade: true,
})

@JoinTable()
events: Event[];

@OneToMany(() => Picture, (picture => picture.id_user)) 
    picture: Picture[]

}


