import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//引入数据库模块
import { DbModule } from './db/db.module';
//引入分模块
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
