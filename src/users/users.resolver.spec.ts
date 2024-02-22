import { Test, TestingModule } from '@nestjs/testing';
import { Role } from 'src/roles/roles.models';
import { UsersResolver } from './users.resolver';
import { getModelToken } from "@nestjs/sequelize";
import { User } from './users.models';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const mockSequelizeUser = {
    findByPk: jest.fn(),
  };
  const mockSequelizeRole = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
      { provide: getModelToken(User), useValue: { mockSequelizeUser } },
      { provide: getModelToken(Role), useValue: { mockSequelizeRole } }
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
