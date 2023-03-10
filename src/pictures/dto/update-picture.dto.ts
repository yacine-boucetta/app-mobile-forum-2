import { GetPictureDto } from "./get-picture.dto";

export class UpdatePictureDto extends (GetPictureDto) {
    readonly id: number;
    readonly name: string;
    readonly url: string;
    readonly userId:number;
    readonly date_picture: Date;
    readonly eventId:number;
  }