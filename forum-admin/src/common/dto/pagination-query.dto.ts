import {IsOptional, IsPositive} from "class-validator";

export class PaginationQueryDto {

    @IsOptional()
    @IsPositive() // 验证为正整数
    pageIndex: number;

    @IsOptional()
    @IsPositive()
    pageSize: number
}
