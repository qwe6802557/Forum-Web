export const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'forum-web',
    autoLoadEntities: true, // 自动加载模块
    synchronize: true // synchronize: true不应在生产中使用设置-否则您可能会丢失生产数据。
}
