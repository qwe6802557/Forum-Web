import { IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
   /* @IsNotEmpty({ message: '用户名不能为空'})*/
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly telephone: string;
}
