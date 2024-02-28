import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.models';
import { UserRoles } from './user_roles.models';

@Table({tableName:'roles'})
export class Role extends Model<IRole> {
  
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id:number;
  
  @ApiProperty({example: '1', description: 'Роль'})
  @Column({type: DataType.STRING,allowNull: false})
  value:string;
  
  @ApiProperty({example: '1', description: 'Описание роли'})
  @Column({type: DataType.STRING})
  description:string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}