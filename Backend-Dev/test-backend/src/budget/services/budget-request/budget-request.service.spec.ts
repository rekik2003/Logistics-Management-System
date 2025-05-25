import { Test, TestingModule } from '@nestjs/testing';
import { BudgetRequestService } from './budget-request.service';

describe('BudgetRequestService', () => {
  let service: BudgetRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetRequestService],
    }).compile();

    service = module.get<BudgetRequestService>(BudgetRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
