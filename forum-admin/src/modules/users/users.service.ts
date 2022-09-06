import {Injectable, NotFoundException, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { UsersEntities } from '../../db/entities/users/users.entities';
import { PaginationQuery} from "../../constants/common.constants";
import { ArticlesEntities } from "../../db/entities/articles/articles.entities";
import { BcryptService } from "../../common/utils/bcrypt.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntities)
        private usersRepository: Repository<UsersEntities>,
        @InjectRepository(ArticlesEntities)
        private articlesRepository: Repository<ArticlesEntities>,
        private dataSource: DataSource,
        private bcryptProvider: BcryptService
    ) {}
    // 分页查询
    async findAll(query) {
        const { pageIndex, pageSize } = query;
        const offset = (pageIndex - 1) * pageSize;
        const pagination: PaginationQuery = {};

        if (offset) {
            pagination.skip = offset;
        }
        if (pageSize) {
            pagination.take = pageSize;
        }

        let [list, total] = await this.usersRepository.findAndCount({
            /*relations: ["articles"]*/
            ...pagination
        });

        return pageIndex ? {
            list,
            total,
            pageIndex,
            pageSize,
        } : list
    }
    // 查找指定用户
    async findOne(username) {
        return await this.usersRepository.findOneBy({ username });
    }
    // 创建用户
    async create (createUser) {
        const resultUser = await this.usersRepository.findOneBy({
            username: createUser.username
        });
        if (resultUser) {
            throw new HttpException('该用户名已存在', HttpStatus.BAD_REQUEST);
        }
        // 加密操作
        createUser.password = await this.bcryptProvider.encryption(createUser.password);
        const result = await this.usersRepository.create(createUser);
        return await this.usersRepository.save(result);
    }
    // 更新指定用户
    async update (id: number, updateUser) {
        const result = await this.usersRepository.preload({
           id: +id,
           ...updateUser
        });
        if (!result) {
            throw new NotFoundException('更新失败, 该用户未找到');
        }
        return await this.usersRepository.save(result);
    }
    // 删除指定用户
    async remove(id: number) {
        const queryRunner = this.dataSource.createQueryRunner();
        const result = await this.usersRepository.find({
            where: {
                id
            },
            relations: ["articles"]
        });

        if (result.length === 0) {
            throw new NotFoundException('删除失败, 该用户未找到');
        }
        // 开启事务
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 执行表操作
            await queryRunner.manager.delete(ArticlesEntities, { user: id }) // 删除附表关联数据
            await queryRunner.manager.delete(UsersEntities, id);
            // 提交事务
            await queryRunner.commitTransaction();
        } catch (err) {
            // 回滚事务
            await queryRunner.rollbackTransaction();
        } finally {
            // 释放事务
            await queryRunner.release();
        }

        return '删除成功';
    }
}
