import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { UsersEntities } from "../users/users.entities";

@Entity('articles')
export class ArticlesEntities {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty({
        description: '文章标题'
    })
    @Column()
    title: string

    @ApiModelProperty({
        description: '文章内容',
    })
    @Column()
    content: string

    @ApiModelProperty({
        description: '发布人信息'
    })
    @ManyToOne( () => UsersEntities, user => user.articles )
    @JoinColumn({
        name: "userId"
    })
    user: UsersEntities
}
