import { Test, TestingModule } from '@nestjs/testing';
import { TransportFeesController } from './transportFees.controller';

describe('TransportFeesController', () => {
  let controller: TransportFeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportFeesController],
    }).compile();

    controller = module.get<TransportFeesController>(TransportFeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
