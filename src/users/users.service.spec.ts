import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '../roles/roles.models';
import { User } from './users.models';
import { UsersService } from './users.service';
import { getModelToken, SequelizeModule } from "@nestjs/sequelize";
import { IUser } from './IUser';
import { AppModule } from '../app.module';
import { UsersModule } from './users.module';


describe('UsersService', () => {
  let userService: UsersService

  const mockSequelizeUser = {
    create: jest.fn(),
    findByPk: jest.fn(),
  };

  const mockSequelizeRole = {
    findByPk: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersModule,
        UsersService,
      { provide: getModelToken(User), useValue: mockSequelizeUser },
      { provide: getModelToken(Role), useValue: mockSequelizeRole },
      ],
    }).compile();
    userService = module.get<UsersService>(UsersService)
   });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    
    const createUserDto = {
      password:'5555555555',
      email: 'chadwickboseman@email.com',
    } as IUser;

    const user = {
      "banned": false,
      "reasonBan": "",
      "password": "5555555555",
      "email": "ccc@ccc.ru",
      "updatedAt": "2024-02-19T10:56:00.759Z",
      "createdAt": "2024-02-19T10:56:00.759Z",
      $set:jest.fn()
    }

    jest.spyOn(mockSequelizeUser, 'create').mockReturnValue(user);
    jest.spyOn(user, '$set')

    const result = await userService.createUser(createUserDto);

    expect(mockSequelizeUser.create).toBeCalled();
    expect(user.$set).toBeCalled();
    expect(mockSequelizeUser.create).toBeCalledWith(createUserDto);

    expect(result).toEqual(user);
  });

  it('Should update user and return its data', async () => {
    const updateDto = {
      id:1,
      email: "ccc@ccc.ru",
    }
    const user = {
      banned: false,
      reasonBan: "",
      password: "5555555555",
      email: "111@ccc.ru",
      updatedAt: "2024-02-19T10:56:00.759Z",
      createdAt: "2024-02-19T10:56:00.759Z",
      $set:jest.fn(),
      save:jest.fn(),
    }
    jest.spyOn(mockSequelizeUser, 'findByPk').mockReturnValue(user);
    jest.spyOn(user, '$set')

    const result = await userService.updateUser(updateDto);

    expect(mockSequelizeUser.findByPk).toBeCalled();
    expect(user.save).toBeCalled();
    expect(mockSequelizeUser.findByPk).toBeCalledWith(1);
    expect(result).toEqual(user);
  });
   });
