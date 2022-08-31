import {Global, Module} from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntities } from "./entities/users/users.entities";
// 数据库表
const entities = [__dirname + '/!**!/!*.entities{.ts,.js}'];
// 全局引用
@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'forum-web',
            entities,
            autoLoadEntities: true, // 自动加载模块
            synchronize: true, // synchronize: true不应在生产中使用设置-否则您可能会丢失生产数据。
        })
    ],
    providers: [DbService],
    exports: [ DbService ],
})
export class DbModule {}
