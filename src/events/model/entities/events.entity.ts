
import { Transform, TransformFnParams } from 'class-transformer';
import { format } from 'path';
import { User } from "src/users/model/entities/users.entity";

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,ManyToOne,OneToMany,CreateDateColumn, ManyToMany, JoinColumn, JoinTable,} from "typeorm"

@Entity()
export class Event  {

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

  @Column()
  event_state:number;

 @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  url_event: string;

@Column()
isPrivate:boolean;
}

