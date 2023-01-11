import { GetPictureDto } from "./get-picture.dto";

export class UpdatePictureDto extends (GetPictureDto) {
    readonly id: number;
    readonly name: string;
    readonly url: string;
    readonly id_user: number;
    readonly date_picture: Date;
  }