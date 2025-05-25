import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetRequests } from 'src/budget/BudgetRequests';
import { UpdateBudgetRequestDto } from 'src/budget/dto/updateBudgetRequest.dto';
import { Transporter } from 'src/transporter/entity/Transporter';
import { Warehouse } from 'src/wharehouse/entity/Warehouse';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetRequestService {
    constructor(
        @InjectRepository(Transporter)
        private readonly transporterRepository: Repository<Transporter>,
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>,
        @InjectRepository(BudgetRequests)
        private readonly budgetRequestRepository: Repository<BudgetRequests>,
    ) {}

    async fetchPending(): Promise<BudgetRequests[]> {
        return await this.budgetRequestRepository.find({where: {status: "Pending"}});
    }

    async fetchByEmployee(employeeId: number): Promise<BudgetRequests[]> {
        const transporter = await this.transporterRepository.findOne({ where: { id: employeeId } });
        if (!transporter) {
            const warehouse = await this.warehouseRepository.findOne({ where: { id: employeeId } });    
            return await this.budgetRequestRepository.find({where: {warehouse: warehouse}});
        }
        return await this.budgetRequestRepository.find({where: {transporter: transporter}});
    }

    async create(employeeId: number, cost: number): Promise<BudgetRequests> {
        let from;
        const transporter = await this.transporterRepository.findOne({ where: { id: employeeId } });
        const warehouse = await this.warehouseRepository.findOne({ where: { id: employeeId } });

        if (!transporter && !warehouse) throw new NotFoundException('Someting is Wrong !');

        if (!transporter) { from = warehouse.user.username } 
        else {
            from = transporter.user.username;
        }
        
        const status="Pending";
        const date = new Date();
        const newBudgetRequest = this.budgetRequestRepository.create({
            from,
            date,
            cost,
            status,
            transporter,
            warehouse,
        });
        return await this.budgetRequestRepository.save(newBudgetRequest);
    }

    async accept(budgetRequestId: number): Promise<BudgetRequests> {
        const updateDto = new UpdateBudgetRequestDto();
        updateDto.status = 'Accepted';
        return this.updateBudgetRequest(budgetRequestId, updateDto);
      }
    
      async decline(budgetRequestId: number): Promise<BudgetRequests> {
        const updateDto = new UpdateBudgetRequestDto();
        updateDto.status = 'Decline';
        return this.updateBudgetRequest(budgetRequestId, updateDto);
      }

    async updateBudgetRequest(id: number, updateDto: UpdateBudgetRequestDto): Promise<BudgetRequests> {
        const budgetRequest = await this.budgetRequestRepository.findOne({ where: { id }, relations: ['transporter','warehouse'] });

        if (!budgetRequest) {
            throw new NotFoundException(`Budget request with id ${id} not found`);
        }

        if (updateDto.cost !== undefined) {
            budgetRequest.cost = updateDto.cost;
        }
        if (updateDto.status !== undefined) {
            budgetRequest.status = updateDto.status;
        }

        return await this.budgetRequestRepository.save(budgetRequest);
    }

}
