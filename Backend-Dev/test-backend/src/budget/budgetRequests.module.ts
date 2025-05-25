import { TypeOrmModule } from "@nestjs/typeorm";
import { BudgetRequestController } from './controllers/budget-request/budget-request.controller';
import { BudgetRequestService } from './services/budget-request/budget-request.service';
import { Module } from "@nestjs/common";
import { BudgetRequests } from "./BudgetRequests";
import { Transporter } from "src/transporter/entity/Transporter";
import { Warehouse } from "src/wharehouse/entity/Warehouse";
import { BudgetRequestSubscriber } from "./subscribers/budget-request.subscriber";

@Module({
    imports: [TypeOrmModule.forFeature([BudgetRequests,Transporter,Warehouse])],
      providers: [BudgetRequestService,BudgetRequestSubscriber],
      controllers: [BudgetRequestController],
      exports: [],
})
export class BudgetRequestsModule {}
