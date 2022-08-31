import { PartialType } from "@nestjs/mapped-types";
import { CreateUsersDto } from "./create-users.dto";
// 更新操作继承验证规则
export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
