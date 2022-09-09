import { IsOptional, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateUsersDto {
    @ApiModelProperty({
        description: '用户名'
    })
    @IsString()
   /* @IsNotEmpty({ message: '用户名不能为空'})*/
    readonly username: string;

    @ApiModelProperty({
        description: '密码'
    })
    @IsString()
    readonly password: string;

    @ApiModelProperty({
        description: '电话号码'
    })
    @IsString()
    readonly telephone: string;

    @ApiModelProperty({
        description: '用户身份'
    })
    @IsString()
    @IsOptional()
    readonly identity: string;
}
