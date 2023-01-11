
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,ManyToOne,OneToMany,CreateDateColumn, JoinTable, ManyToMany,} from "typeorm"
import { Event } from "src/events/model/entities/events.entity";
import { User } from "src/users/model/entities/users.entity";
@Entity()
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  url: string;

  @Column()
  id_user: number;

  @Column()
  @CreateDateColumn()
  date_picture: Date;

  @ManyToMany(() => Event,event=>event, {
    cascade: true,
  })
  
  @JoinTable()
  events: Event[];

  @ManyToOne((type) => User, (user) => user.id)
  user: User
}
