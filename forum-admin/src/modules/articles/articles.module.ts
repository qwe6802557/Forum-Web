import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntities } from "../../db/entities/users/users.entities";
import { ArticlesEntities } from "../../db/entities/articles/articles.entities";

@Module({
  imports: [TypeOrmModule.forFeature([ UsersEntities, ArticlesEntities ])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
