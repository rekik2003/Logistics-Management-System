import { Controller, Get, Req } from '@nestjs/common';
import { WarehouseService } from 'src/wharehouse/services/warehouse/warehouse.service';

@Controller('warehouse')
export class WarehouseController {
    constructor(private warehouseService: WarehouseService) {}

    @Get('budget')
    getBudget(@Req() req) {
        const warehouseId = req.user.sub;
        return this.warehouseService.getBudget(warehouseId);
    }
}
