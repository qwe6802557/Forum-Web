import {Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, Index} from 'typeorm';
import { ArticlesEntities } from "../articles/articles.entities";
// 定义用户Type
enum Identity {
    user = "0",
    admin = "1"
}

@Index(['id', 'username']) //定义索引 可定义多个列
@Entity('users')
export class UsersEntities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    telephone: string

    @Column({
        default: Identity.user,
        nullable: true
    })
    identity: Identity

    @JoinTable()
    @OneToMany(() => ArticlesEntities, article => article.user )
    articles: ArticlesEntities[]
}
