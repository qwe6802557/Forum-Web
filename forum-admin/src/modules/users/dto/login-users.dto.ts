import { IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class LoginUsersDto {

    @ApiModelProperty({
        description: '用户名'
    })
    @IsString()
    username: string;

    @ApiModelProperty({
        description: '密码'
    })
    @IsString()
    password: string

    @ApiModelProperty({
        description: '验证码'
    })
    @IsString()
    verifyCode: string
}
