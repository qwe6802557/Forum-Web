import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { UsersEntities } from "../users/users.entities";

@Entity('articles')
export class ArticlesEntities {
    @ApiModelProperty({
        description: '主键'
    }) // 定义swagger每个字段中文描述
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
        description: '发布人'
    })

    @ManyToOne( () => UsersEntities, user => user.id )
    userId: number
}
