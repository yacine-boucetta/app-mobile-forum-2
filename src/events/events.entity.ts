
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,ManyToOne,OneToMany,CreateDateColumn,} from "typeorm"

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  id_user: number;

  @Column()
  event_state:number;

}
