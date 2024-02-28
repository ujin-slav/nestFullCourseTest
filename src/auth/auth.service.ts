import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.models';
import * as bcrypt from 'bcryptjs'
import { IUser } from '../users/IUser';
import {JwtService} from "@nestjs/jwt";
import { Role } from '../roles/roles.models';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(Role)
        private roleModel: typeof Role,
        private readonly jwtService: JwtService,
    ) {}

    async login(user: IUser): Promise<IUser>{
        return 
    }

    async registration (userDto: IUser){
        const userTry = await this.userModel.findOne({where:{email:userDto.email}})
        if (userTry) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const roles = await this.roleModel.findByPk(2)
        const user = await this.userModel.create({email:userDto.email, password: hashPassword})
        await user.$set('roles',roles)
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
