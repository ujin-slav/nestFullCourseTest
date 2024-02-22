import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.models';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role,
    ) {}

    async createRole(role: IRole): Promise<Role>{
        return this.roleModel.create(role);
    }

    async getRoleById(id: number): Promise<Role>{
        console.log(id)
        return this.roleModel.findByPk(id);
    }
}
