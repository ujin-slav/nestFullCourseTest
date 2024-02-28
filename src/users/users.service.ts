import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/roles.models';
import { IUser } from './IUser';
import { updateDto } from './users.controller';
import { User } from './users.models';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(Role)
        private roleModel: typeof Role
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll({include:{all:true}});
    }

    async createUser(user:IUser){
        const newUser = await this.userModel.create(user) 
        const role = await this.roleModel.findByPk(2)
        await newUser.$set('roles',role)
        return newUser
    }

    async updateUser(dto:updateDto){
        const user = await this.userModel.findByPk(dto.id)
        user.email = dto.email
        await user.save()
        return user
    }
}
