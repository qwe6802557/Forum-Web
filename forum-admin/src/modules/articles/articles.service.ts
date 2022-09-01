import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ArticlesEntities } from "../../db/entities/articles/articles.entities";
import { Repository } from "typeorm";
import { UsersEntities } from "../../db/entities/users/users.entities";

@Injectable()
export class ArticlesService {
  constructor(
      @InjectRepository(ArticlesEntities)
      private articlesRepository: Repository<ArticlesEntities>,
      @InjectRepository(UsersEntities)
      private usersRepository: Repository<UsersEntities>,
  ) {}

  async create(createArticle) {
    const user = await this.usersRepository.findOneBy({
      id: createArticle.userId
    });
    if (!user) {
      throw new NotFoundException('用户未找到');
    }
    const result = await this.articlesRepository.create({
      ...createArticle,
      user
    });
    return await this.articlesRepository.save(result);
  }

  async findAll() {
    return await this.articlesRepository.find({
      relations: ["user"]
    });
  }

  async findOne(id: number) {
    return await this.articlesRepository.findOneBy({ id });
  }

  async update(id: number, updateArticle) {
    const result = await this.articlesRepository.preload({
      id: +id,
      ...updateArticle
    });
    if (!result) {
      throw new NotFoundException('更新失败, 该文章未找到');
    }
    return await this.articlesRepository.save(result);
  }

  async remove(id: number) {
    const result = await this.articlesRepository.findOneBy({
      id
    });

    if (!result) {
      throw new NotFoundException('删除失败, 该文章未找到');
    }

    return this.articlesRepository.remove(result);
  }
}
