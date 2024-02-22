import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from 'src/auth/role.guard';
import { UsersController } from './users.controller';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { getModelToken } from "@nestjs/sequelize";
import { Role } from 'src/roles/roles.models';
import { User } from './users.models';
import { find } from 'rxjs';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let updateUserMock = {
    "id": 12,
    "email": "ccc@ccc",
    "password": "$2a$05$v5IRTKNJ1WWEmZc3iigpPOl7KWZlMy.jyVJcsUTGF6kmoSVQd/NGi",
    "banned": false,
    "reasonBan": "",
    "createdAt": "2024-02-09T11:52:52.191Z",
    "updatedAt": "2024-02-16T10:31:09.523Z"
  }
  let getAllUserMock = [
    {
        "id": 11,
        "email": "224211111@4444",
        "password": "$2a$05$A4HO33f/PdF8tDJIqds9auItJeM/hxLZlqrL6N9oFmzigdP/EZEcu",
        "banned": false,
        "reasonBan": "",
        "createdAt": "2024-02-08T13:33:46.558Z",
        "updatedAt": "2024-02-08T13:33:46.558Z",
        "roles": [
            {
                "id": 2,
                "value": "USER",
                "description": "common user",
                "createdAt": "2024-02-07T12:44:53.423Z",
                "updatedAt": "2024-02-07T12:44:53.423Z",
                "UserRoles": {
                    "id": 7,
                    "roleid": 2,
                    "userid": 11
                }
            }
        ]
    },
    {
        "id": 12,
        "email": "mm111@4444",
        "password": "$2a$05$v5IRTKNJ1WWEmZc3iigpPOl7KWZlMy.jyVJcsUTGF6kmoSVQd/NGi",
        "banned": false,
        "reasonBan": "",
        "createdAt": "2024-02-09T11:52:52.191Z",
        "updatedAt": "2024-02-09T11:52:52.191Z",
        "roles": [
            {
                "id": 2,
                "value": "USER",
                "description": "common user",
                "createdAt": "2024-02-07T12:44:53.423Z",
                "updatedAt": "2024-02-07T12:44:53.423Z",
                "UserRoles": {
                    "id": 8,
                    "roleid": 2,
                    "userid": 12
                }
            }
        ]
    }]

  const mockSequelizeRole = {
    findAll: jest.fn(),
  };

  const mockSequelizeUser = {
    findByPk: jest.fn(),
  };

  const mockUserService = {
    createUser: jest.fn((user)=>{
        return{
          id: Date.now(),
          ...user
        }
    }),
    findAll: jest.fn(()=>{
      return{
        getAllUserMock
    }}),
    updateUser: jest.fn((dto)=>{
      return{
        updateUserMock
    }}),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
          UsersService,
          RolesGuard,
          JwtService,
          { provide: getModelToken(Role), useValue: { mockSequelizeRole } },
          { provide: getModelToken(User), useValue: { mockSequelizeUser } },
      ],
    })      
        .overrideProvider(UsersService)
        .useValue(mockUserService)
        .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create User', () => {
    const dto = {email:'asd@uuiui',password:'555888'}
    expect(controller.create(dto)).toEqual({
      id:expect.any(Number),
      email:'asd@uuiui',
      password:'555888'
    });
    expect(mockUserService.createUser).toHaveBeenCalledWith(dto)
  });

  it('should get all User', () => {
    expect(controller.getUsers()).toEqual({
      getAllUserMock
    });
  });

  it('should updateUser', () => {
    const dto = {id:10,email:'asd@uuiui'}
    expect(controller.update(dto)).toEqual({
      updateUserMock
    });
    expect(mockUserService.updateUser).toHaveBeenCalledWith(dto)
  });

});
