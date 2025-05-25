import { Test, TestingModule } from '@nestjs/testing';
import { ProductInStockService } from './product-in-stock.service';

describe('ProductInStockService', () => {
  let service: ProductInStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInStockService],
    }).compile();

    service = module.get<ProductInStockService>(ProductInStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
