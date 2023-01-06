
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity ,ManyToOne,OneToMany,CreateDateColumn,} from "typeorm"

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

}
