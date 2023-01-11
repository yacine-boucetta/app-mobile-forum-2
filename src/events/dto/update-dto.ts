import { GetUserDto } from "src/users/dto/get_user.dto";

export class UpdateEventDto extends(GetUserDto){

    readonly name:string;
    readonly start_date:Date;
    readonly end_date:Date;
    readonly id_user:number;
    readonly event_state:number;
    readonly description:string;

}