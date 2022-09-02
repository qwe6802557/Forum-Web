import {Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, Index} from 'typeorm';
import { ArticlesEntities } from "../articles/articles.entities";

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

    @JoinTable()
    @OneToMany(() => ArticlesEntities, article => article.user )
    articles: ArticlesEntities[]
}
