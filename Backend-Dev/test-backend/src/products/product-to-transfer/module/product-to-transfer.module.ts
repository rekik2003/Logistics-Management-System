import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToTransfer } from '../entity/ProductToTransfer';
import { ProductToTransferService } from '../services/product-to-transfer.service';
import { ProductToTransferController } from '../controllers/product-to-transfer.controller';
import { Warehouse } from 'src/wharehouse/entity/Warehouse';
import { Product } from 'src/products/entity/Product';
import { ProductToTransferSubscriber } from '../subscribers/product-to-transfer.subscriber';
import { ProductInStock } from 'src/products/product-in-stock/entity/ProductInStock';

@Module({
  imports: [TypeOrmModule.forFeature([ProductToTransfer,Warehouse,Product,ProductInStock])],
  providers: [ProductToTransferService,ProductToTransferSubscriber],
  controllers: [ProductToTransferController],
  exports: [],
})
export class ProductToTransferModule {}