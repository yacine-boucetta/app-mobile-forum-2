
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
  @CreateDateColumn()
  date_picture: Date;

  @ManyToOne(() => User, (user) => user.picture)
  user: number

  @ManyToOne(() => Event, (event) => event.picture,{ onDelete:'CASCADE',onUpdate:'CASCADE',})
    event: number
}
