import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductToTransfer } from '../entity/ProductToTransfer';
import { Repository } from 'typeorm';
import { Warehouse } from 'src/wharehouse/entity/Warehouse';
import { Product } from 'src/products/entity/Product';
import { UpdateProductToTransferDto } from '../dtos/UpdateProductToTransfer.sto';

@Injectable()
export class ProductToTransferService {
    constructor(
        @InjectRepository(ProductToTransfer)
        private readonly productToTransferRepository: Repository<ProductToTransfer>,
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async fetch(warehouseId: number) {
        return await this.productToTransferRepository.find({where: {warehouse: {id: warehouseId}}});
    }

    async findByProductRef(ref: number): Promise<ProductToTransfer[]> {
        const productTransfers = await this.productToTransferRepository.find({ where: { product: { ref } } });

        if (!productTransfers.length) {
            throw new NotFoundException(`No product transfers found for product ref ${ref}`);
        }

        return productTransfers;
    }

    async create(warehouseId: number, ref: number, quantity: number, totalPrice: number, type: string) {
        const warehouse = await this.warehouseRepository.findOne({ where: { id: warehouseId } });
        if (!warehouse) throw new NotFoundException('warehouse id not found');

        const product = await this.productRepository.findOne({where: {ref: ref}});
        if (!product) throw new NotFoundException('product id not found');

        const date = new Date();

        const newProductToImport = this.productToTransferRepository.create ({
            product,
            quantity,
            totalPrice,
            date,
            warehouse,
            type
        });

        return await this.productToTransferRepository.save(newProductToImport);
    }

    async update(id: number, updateProductToTransferDto: UpdateProductToTransferDto) {
        const productToTransfer = await this.productToTransferRepository.findOne({ where: { id } });
        if (!productToTransfer) throw new NotFoundException(`Product with id ${id} not found`);

        if (updateProductToTransferDto.quantity !== undefined) {
            productToTransfer.quantity = updateProductToTransferDto.quantity;
        }
        if (updateProductToTransferDto.totalPrice !== undefined) {
            productToTransfer.totalPrice = updateProductToTransferDto.totalPrice;
        }
        productToTransfer.date = new Date();

        return await this.productToTransferRepository.save(productToTransfer);
    }

    async deleteById(id: number): Promise<void> {
        const result = await this.productToTransferRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Product to transfer with id ${id} not found`);
        }
    }
}
