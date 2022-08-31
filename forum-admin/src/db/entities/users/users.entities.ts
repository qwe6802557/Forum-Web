import {Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { ArticlesEntities } from "../articles/articles.entities";

@Entity('users')
export class UsersEntities {
    @ApiModelProperty({
        description: '主键'
    }) // 定义swagger每个字段中文描述
    @PrimaryGeneratedColumn()
    @JoinTable()
    @OneToMany(() => ArticlesEntities, article => article.userId )
    id: number;

    @ApiModelProperty({
        description: '用户名',
        example: 'user1'
    })
    @Column()
    username: string

    @ApiModelProperty({
        description: '密码',
    })
    @Column()
    password: string

    @ApiModelProperty({
        description: '手机号'
    })
    @Column()
    telephone: string
}
