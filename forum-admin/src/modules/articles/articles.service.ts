import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ArticlesEntities } from "../../db/entities/articles/articles.entities";
import { Repository } from "typeorm";

@Injectable()
export class ArticlesService {
  constructor(
      @InjectRepository(ArticlesEntities)
      private usersRepository: Repository<ArticlesEntities>,
  ) {}

  async create(createArticle) {
    const result = await this.usersRepository.create(createArticle);
    return await this.usersRepository.save(result);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticle) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
