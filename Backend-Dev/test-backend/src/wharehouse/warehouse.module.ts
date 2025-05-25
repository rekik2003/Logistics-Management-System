import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Warehouse } from "./entity/Warehouse";
import { WarehouseController } from "./controllers/warehouse/warehouse.controller";
import { WarehouseService } from "./services/warehouse/warehouse.service";

@Module({
    imports: [TypeOrmModule.forFeature([Warehouse])],
      providers: [WarehouseService],
      controllers: [WarehouseController],
      exports: [],
})
export class WareHouseModule {}
