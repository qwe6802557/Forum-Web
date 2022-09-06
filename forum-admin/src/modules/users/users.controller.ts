import {Body, Controller, Get, Param, Post, Query, Patch, Delete, Req, Session} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from "@nestjs/swagger";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
import { Public } from "../../common/decorators/public.decorator";
import { LoginUsersDto } from "./dto/login-users.dto";

/*import { UsersEntities } from "./entities/users.entities";*/

@Controller('users')
@ApiTags('用户管理') // 设置swagger分块标题
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll (@Query() paginationQueryDto: PaginationQueryDto ) {
        return this.userService.findAll(paginationQueryDto);
    }

    @Get(':username')
    findOne (@Param('username') username: string) {
        return this.userService.findOne(username);
    }

    @Post()
    async create (@Body() body: CreateUsersDto) {
        return await this.userService.create(body);
    }

    @Patch(':id')
    async update (@Param('id') id: number, @Body() body: UpdateUsersDto) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    async remove (@Param('id') id: number) {
        return await this.userService.remove(id);
    }
}
