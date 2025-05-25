import { Test, TestingModule } from '@nestjs/testing';
import { ProductInStockController } from './product-in-stock.controller';

describe('ProductInStockController', () => {
  let controller: ProductInStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductInStockController],
    }).compile();

    controller = module.get<ProductInStockController>(ProductInStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
