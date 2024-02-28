import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/sequelize';
import { Repository, Sequelize } from 'sequelize-typescript';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { User } from '../src/users/users.models';
import { Role } from '../src/roles/roles.models';
import { IUser } from '../src/users/IUser';
import { Post } from '../src/posts/posts.models';
import { UserRoles } from '../src/roles/user_roles.models';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection:Sequelize

  afterAll(async () => {
    // const sequelize = new Sequelize("testing", "postgres", "123", 
    // {dialect: "postgres"
    // });
    // sequelize.addModels([User,Role,UserRoles,Post]);
    // // await sequelize.authenticate()
    // // await sequelize.sync()
    // await sequelize.drop()
    const connection = app.get(getConnectionToken())
    connection.drop()
  });

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule,SequelizeModule.forFeature([User,Role])],
    }).compile();

    app = moduleFixture.createNestApplication()
    await app.init();
  });

  afterEach(async () => {
    await app.close()
  });

  describe('POST /api/createuser', () => {

    const createUserDto = {
        email:'ffkfkf@llll.ru',
        password:'56565656565'
    }  as IUser

    it('should create user and return it data', () => {
        return request(app.getHttpServer())
            .post('/api/createuser')
            .send(createUserDto)
            .expect(201);
    });
  })
});