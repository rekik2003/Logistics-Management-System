import { Controller, Get, Req } from '@nestjs/common';
import { ProductInStockService } from '../services/product-in-stock.service';

@Controller('product-in-stock')
export class ProductInStockController {
    constructor (private productInStockService: ProductInStockService) {}

    @Get('fetchById')
    fetchById(@Req() req) {
      const warehouseId = req.user.sub;
      return this.productInStockService.fetchById(warehouseId);
    }
}
