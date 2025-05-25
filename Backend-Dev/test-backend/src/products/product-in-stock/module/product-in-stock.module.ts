import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInStock } from '../entity/ProductInStock';
import { ProductInStockService } from '../services/product-in-stock.service';
import { ProductInStockController } from '../controllers/product-in-stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInStock])],
  providers: [ProductInStockService],
  controllers: [ProductInStockController],
  exports: [],
})
export class ProductInStockModule {}