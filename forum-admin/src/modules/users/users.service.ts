import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntities } from '../../db/entities/users/users.entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntities)
        private usersRepository: Repository<UsersEntities>,
    ) {}
    // 分页查询
    async findAll(query: {}) {
        return await this.usersRepository.find({
            relations: ["id"]
        });
    }
    // 查找指定用户
    async findOne(id: number) {
        return await this.usersRepository.findOneBy({ id });
    }
    // 创建用户
    async create (createUser) {
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
        const result = await this.usersRepository.findOneBy({
            id
        });

        if (!result) {
            throw new NotFoundException('删除失败, 该用户未找到');
        }

        return this.usersRepository.remove(result);
    }
}
