import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntities } from "../../db/entities/users/users.entities";
import { ArticlesEntities } from "../../db/entities/articles/articles.entities";
import { CommonModule } from "../../common/common.module";

@Module({
  imports: [TypeOrmModule.forFeature([ UsersEntities, ArticlesEntities ]), CommonModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
