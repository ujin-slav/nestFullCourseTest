import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.models';
import { UserRoles } from 'src/roles/user_roles.models';
import { IUser } from './IUser';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Table({tableName:'users'})
export class User extends Model<IUser> {
  
  @Field(() => ID)
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id:number;
  
  @Field()
  @ApiProperty({example: '1', description: 'Емайл'})
  @Column({type: DataType.STRING, unique: true})
  email:string;

  @Field()
  @Column({type: DataType.STRING, allowNull: false})
  password:string;

  @Field()
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned:boolean;

  @Field()
  @Column({type: DataType.STRING, defaultValue: ""})
  reasonBan:string;
  
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class Book {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  author?: string;
}