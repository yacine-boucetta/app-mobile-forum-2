

export class GetUserDto {
  readonly id?: number;
  readonly email: string;
  readonly url?:string;
  readonly name?: string;
  readonly lastname?: string;
  readonly password?: string;
  readonly isAdmin:boolean;
}


