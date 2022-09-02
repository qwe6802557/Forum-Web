import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
// 数据库表
const entities = [__dirname + '/!**!/!*.entities{.ts,.js}'];
// 全局引用
@Global()
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities,
                autoLoadEntities: true, // 自动加载模块
                synchronize: process.env.NODE_ENV === "development", // synchronize: true不应在生产中使用设置-否则您可能会丢失生产数据。
            })
        }) // forRootAsync异步加载 这样无需考虑是在configModule之前还是之后加载
    ],
    providers: [],
    exports: [],
})
export class DbModule {}
