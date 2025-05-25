import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInStock } from '../entity/ProductInStock';

@Injectable()
export class ProductInStockService {
    constructor(
        @InjectRepository(ProductInStock)
        private readonly productInStockRepository: Repository<ProductInStock>,
    ) {}

    async fetchById(warehouseId: number): Promise<ProductInStock[]> {
        return await this.productInStockRepository.find({where: {warehouse: {id :warehouseId}}});
    }
}
