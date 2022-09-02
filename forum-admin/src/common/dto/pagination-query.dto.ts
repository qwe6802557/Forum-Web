import {IsOptional, IsPositive} from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class PaginationQueryDto {

    @ApiModelProperty({
        description: '页码'
    })
    @IsOptional()
    @IsPositive() // 验证为正整数
    pageIndex: number;

    @ApiModelProperty({
        description: '条数'
    })
    @IsOptional()
    @IsPositive()
    pageSize: number
}
