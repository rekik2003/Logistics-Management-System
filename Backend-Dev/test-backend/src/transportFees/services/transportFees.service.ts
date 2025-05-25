import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import { TransportFees } from "../entities/TransportFees";
import { Transporter } from "src/transporter/entity/Transporter";
import { UpdateTransportFeeDto } from "../dto/updateTransportFee.dto";

@Injectable()
export class TransportFeesService {
    constructor(
        @InjectRepository(TransportFees)
        private readonly transportFeesRepository: Repository<TransportFees>,
        @InjectRepository(Transporter)
        private readonly transporterRepository: Repository<Transporter>,
    ) {}

    async getLastFees(transporterId: number): Promise<TransportFees[]> {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
        const transportFees = await this.transportFeesRepository.find({
            where: {
                transporter: { id: transporterId },
                date: MoreThanOrEqual(thirtyDaysAgo),
            },
            order: {
                date: 'DESC',
            },
        });
        return transportFees;
    }

    async create(transporterId: number, cost: number, details: string): Promise<TransportFees> {
        const transporter = await this.transporterRepository.findOne({ where: { id: transporterId } });
        if (!transporter) {
            throw new Error(`Transporter with id ${transporterId} not found`);
        }
        if (transporter.budget < cost) throw new Error(`Budget Not Sufficient`);

        const date = new Date();
        const newTransportFee = this.transportFeesRepository.create({
            transporter,
            cost,
            date,
            details,
        });
        transporter.budget -= cost;
        await this.transporterRepository.save(transporter);

        return await this.transportFeesRepository.save(newTransportFee);
    }

    async update(id: number, transporterId: number, updateTransportFeeDto: UpdateTransportFeeDto): Promise<TransportFees> {
        const transportFee = await this.transportFeesRepository.findOne({
            where: {
                id: id,
                transporter: { id: transporterId },
            },
            relations: ['transporter']
        });

        if (!transportFee) {
            throw new NotFoundException(`Transport fee with id ${id} not found`);
        }
        const oldCost = transportFee.cost;
        if (updateTransportFeeDto.cost) {
            const transporter = transportFee.transporter; 
            transporter.budget -= (updateTransportFeeDto.cost - oldCost);
            await this.transporterRepository.save(transporter);
        }

        Object.assign(transportFee, updateTransportFeeDto);
        transportFee.date = new Date();

        return await this.transportFeesRepository.save(transportFee);
    }
}
