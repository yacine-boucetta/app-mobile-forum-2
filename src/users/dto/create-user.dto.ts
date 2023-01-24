export class CreateUserDto{
    readonly email: string;
    readonly url?:string;
    readonly name:string;
    readonly lastname:string;
    readonly password: string;
}