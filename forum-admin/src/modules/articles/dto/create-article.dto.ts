import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsNumber, IsString} from "class-validator";

export class CreateArticleDto {
    @ApiModelProperty({
        description: '文章标题'
    })
    @IsString()
    title: string

    @ApiModelProperty({
        description: '文章内容',
    })
    @IsString()
    content: string

    @ApiModelProperty({
        description: '创建人ID',
    })
    @IsNumber()
    userId: number
}
