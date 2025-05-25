import { Test, TestingModule } from '@nestjs/testing';
import { BudgetRequestController } from './budget-request.controller';

describe('BudgetRequestController', () => {
  let controller: BudgetRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetRequestController],
    }).compile();

    controller = module.get<BudgetRequestController>(BudgetRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
