import { Test, TestingModule } from '@nestjs/testing';
import { ProductToTransferController } from './product-to-transfer.controller';

describe('ProductToTransferController', () => {
  let controller: ProductToTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductToTransferController],
    }).compile();

    controller = module.get<ProductToTransferController>(ProductToTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
