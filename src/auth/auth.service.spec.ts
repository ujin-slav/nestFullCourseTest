import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from "@nestjs/sequelize";
import { Role } from 'src/roles/roles.models';
import { User } from 'src/users/users.models';
import {JwtService} from "@nestjs/jwt";

describe('AuthService', () => {
  let service: AuthService;

  const mockSequelizeUser = {
    findByPk: jest.fn(),
  };

  const mockSequelizeRole = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: getModelToken(User), useValue: { mockSequelizeUser } },
        { provide: getModelToken(Role), useValue: { mockSequelizeRole } }
    ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
