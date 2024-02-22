import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { getModelToken } from "@nestjs/sequelize";
import { Role } from './roles.models';

describe('RolesService', () => {
  let service: RolesService;

  const mockSequelizeRole = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getModelToken(Role), useValue: { mockSequelizeRole } }
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
