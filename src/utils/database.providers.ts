import { Sequelize } from 'sequelize-typescript';
import { Role } from '../roles/roles.models';
import { User } from '../users/users.models';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'sqlite',
                host: 'localhost',
                port:5432,
                username:'postgres',
                password:'123',
                database:'testing',
            });
            sequelize.addModels([User, Role]);
            await sequelize.sync();
            return sequelize;
        },
    },
];