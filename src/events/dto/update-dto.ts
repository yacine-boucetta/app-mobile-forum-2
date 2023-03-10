import { User } from "src/users/model/entities/users.entity";
import { GetEventDto } from "./get-event.dto";

export class UpdateEventDto extends(GetEventDto){
    readonly name:string;
    readonly start_date:Date;
    readonly end_date:Date;
    readonly id_user:number;
    readonly description:string;
    readonly url_event:string;
    readonly isPrivate?:boolean;
}