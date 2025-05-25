import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from 'src/wharehouse/entity/Warehouse';
import { Repository } from 'typeorm';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>,
    ) {}

    async getBudget(warehouseId: number): Promise<number> {
        const warehouse = await this.warehouseRepository.findOne({ where: { id: warehouseId } });
        if (!warehouse) {
            throw new NotFoundException(`Transporter with id ${warehouseId} not found`);
        }
        return warehouse.budget;
    }
}
