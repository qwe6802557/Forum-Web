import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntities } from "../../db/entities/users/users.entities";
import { ArticlesEntities } from "../../db/entities/articles/articles.entities";

@Module({
  imports: [TypeOrmModule.forFeature([ UsersEntities, ArticlesEntities ])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
