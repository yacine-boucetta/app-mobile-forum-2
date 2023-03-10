import { GetUserDto } from "./get_user.dto";
// import { PartialType } from '@nestjs/swagger';
export class UpdateUserDto extends (GetUserDto) {
  readonly id: number;
  readonly email: string;
  readonly url?:string;
  readonly name: string;
  readonly lastname: string;
  readonly password: string;
  readonly isAdmin:boolean;
}