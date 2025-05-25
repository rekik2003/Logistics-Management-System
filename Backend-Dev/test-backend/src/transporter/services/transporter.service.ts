import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transporter } from "../entity/Transporter";
import { Repository } from "typeorm";

@Injectable()
export class TransporterService {
    constructor(
        @InjectRepository(Transporter)
        private readonly transporterRepository: Repository<Transporter>,
    ) {}

    async getBudget(transporterId: number): Promise<number> {
        const transporter = await this.transporterRepository.findOne({ where: { id: transporterId } });
        if (!transporter) {
            throw new NotFoundException(`Transporter with id ${transporterId} not found`);
        }
        return transporter.budget;
    }
}