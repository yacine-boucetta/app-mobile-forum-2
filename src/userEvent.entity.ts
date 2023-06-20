import { Entity, Column, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users/model/entities/users.entity";
import{ Event } from "./events/model/entities/events.entity";
@Entity()
export class UserEvent extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    isInvitated: boolean;
  
    
    @ManyToOne(() => User, (user) => user.events,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    user: User;
  
    @ManyToOne(() => Event, (event) => event.users,{onDelete:'CASCADE',onUpdate:'CASCADE'})
    event: Event;
}