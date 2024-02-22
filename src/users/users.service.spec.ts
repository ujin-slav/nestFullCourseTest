import { Test, TestingModule } from '@nestjs/testing';
import { Repository, Sequelize } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.models';
import { User } from './users.models';
import { UsersService } from './users.service';
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { IUser } from './IUser';
import { createMemDB } from 'src/utils/createMemDb';
import { AppModule } from '../app.module';
import { UsersModule } from './users.module';
import { UserRoles } from 'src/roles/user_roles.models';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';


describe('UsersService', () => {
  let model: typeof User;
  let userService: UsersService
  let app: INestApplication;
  let repositoryUser: Repository<User>
  let repositoryRole: Repository<Role>
  let seq:any

  const mockSequelizeUser = {
    create: jest.fn(),
    findByPk: jest.fn(),
  };

  const mockSequelizeRole = {
    findByPk: jest.fn(),
  }

  beforeAll(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [AppModule],
    //   providers: [
    //     UsersModule,
    //     UsersService,
    //   // { provide: getModelToken(User), useValue: mockSequelizeUser },
    //   // { provide: getModelToken(Role), useValue: mockSequelizeRole },
    //    { provide: getModelToken(User), useValue: User },
    //    { provide: getModelToken(Role), useValue: Role },
    //   ],
    // }).compile();
    app = await NestFactory.create(AppModule);
    userService = app.get(UsersService);
    //userService = module.get<UsersService>(UsersService)
    //model = module.get<typeof User>(getModelToken(User))
    repositoryRole = app.get(getModelToken(Role));
    repositoryUser = app.get(getModelToken(User));
    await repositoryRole.destroy({
      where: {},
      truncate: true
    })
    await repositoryUser.destroy({
      where: {},
      truncate: true
    })
   });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // it('create => Should create a new user and return its data', async () => {
    
  //   const createUserDto = {
  //     password:'5555555555',
  //     email: 'chadwickboseman@email.com',
  //   } as IUser;

  //   const user = {
  //     "banned": false,
  //     "reasonBan": "",
  //     "password": "5555555555",
  //     "email": "ccc@ccc.ru",
  //     "updatedAt": "2024-02-19T10:56:00.759Z",
  //     "createdAt": "2024-02-19T10:56:00.759Z",
  //     $set:jest.fn()
  //   }

  //   jest.spyOn(mockSequelizeUser, 'create').mockReturnValue(user);
  //   jest.spyOn(user, '$set')

  //   const result = await userService.createUser(createUserDto);

  //   expect(mockSequelizeUser.create).toBeCalled();
  //   expect(user.$set).toBeCalled();
  //   expect(mockSequelizeUser.create).toBeCalledWith(createUserDto);

  //   expect(result).toEqual(user);
  // });

  it('(real base) Should create a new user and return its data', async () => {
    const createUserDto = {
        email:"56565@5555.ru",
        password:"5555555555"
    } as IUser
    const user = {
      "banned": false,
      "reasonBan": "",
      "id": 1,
      "email": "56565@5555.ru",
      "password": "5555555555",
    }
    const result = await userService.createUser(createUserDto)
    //repository = module.get<Repository<User>>(getRepositoryToken(User));
    //expect(result).toBe(true)
  });

//   it('Should update user and return its data', async () => {
//     const updateDto = {
//       id:1,
//       email: "ccc@ccc.ru",
//     }
//     const user = {
//       banned: false,
//       reasonBan: "",
//       password: "5555555555",
//       email: "111@ccc.ru",
//       updatedAt: "2024-02-19T10:56:00.759Z",
//       createdAt: "2024-02-19T10:56:00.759Z",
//       $set:jest.fn(),
//       save:jest.fn(),
//     }
//     jest.spyOn(mockSequelizeUser, 'findByPk').mockReturnValue(user);
//     jest.spyOn(user, '$set')

//     const result = await userService.updateUser(updateDto);

//     expect(mockSequelizeUser.findByPk).toBeCalled();
//     expect(user.save).toBeCalled();
//     expect(mockSequelizeUser.findByPk).toBeCalledWith(1);
//     expect(result).toEqual(user);
//   });
   });
