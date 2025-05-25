import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
import { ProductToTransfer } from '../entity/ProductToTransfer';
import { ProductInStock } from 'src/products/product-in-stock/entity/ProductInStock';
import { NotAcceptableException } from '@nestjs/common';
  
  @EventSubscriber()
  export class ProductToTransferSubscriber implements EntitySubscriberInterface<ProductToTransfer> {
  
    listenTo() {
      return ProductToTransfer;
    }
  
    async afterInsert(event: InsertEvent<ProductToTransfer>) {
      const { warehouse, product, quantity, type } = event.entity;
      const productInStockRepository = event.manager.getRepository(ProductInStock);
  
      const productInStock = await productInStockRepository.findOne({ where: { ref: product.ref , warehouseId: warehouse.id} });
      if (productInStock && type === "Import") {
        productInStock.quantity += quantity; 
        await productInStockRepository.save(productInStock);
      }
      else if (productInStock && type === "Export") {
        if (quantity > productInStock.quantity) throw new NotAcceptableException('Not enough product in stock')
        productInStock.quantity -= quantity; 
        await productInStockRepository.save(productInStock);
      }
    }
  }
  