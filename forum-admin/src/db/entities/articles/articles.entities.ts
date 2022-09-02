import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { UsersEntities } from "../users/users.entities";

@Entity('articles')
export class ArticlesEntities {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne( () => UsersEntities, user => user.articles )
    @JoinColumn({
        name: "userId"
    })
    user: UsersEntities
}
