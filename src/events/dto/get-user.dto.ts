export class GetEventDto{
    readonly id?:number;
    readonly name?:string;
    readonly start_date?:Date;
    readonly end_date?:Date;
    readonly id_user?:number;
    readonly event_state?:number;
    readonly description?:string;
}