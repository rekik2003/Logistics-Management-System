import { Test, TestingModule } from '@nestjs/testing';
import { ProductToTransferService } from './product-to-transfer.service';

describe('ProductToTransferService', () => {
  let service: ProductToTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductToTransferService],
    }).compile();

    service = module.get<ProductToTransferService>(ProductToTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
