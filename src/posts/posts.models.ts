import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.models';

@Table({tableName:'posts'})
export class Post extends Model<IPost> {
  
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id:number;
  
  @ApiProperty({example: '1', description: 'Текст'})
  @Column({type: DataType.STRING,allowNull: false})
  text:string;

  @Column({type: DataType.STRING})
  image: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  author: User
}