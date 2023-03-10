export class CreatePictureDto{
    readonly name: string;
    readonly url:string;
    readonly userId:number;
    readonly date_picture: Date;
    readonly eventId:number;
}