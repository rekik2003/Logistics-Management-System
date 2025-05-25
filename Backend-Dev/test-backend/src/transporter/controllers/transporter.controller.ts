import { Body, Controller, Get, Patch, Req } from "@nestjs/common";
import { TransporterService } from "../services/transporter.service";

@Controller('transporter')
export class TransporterController {
    constructor(private transporterService: TransporterService) {}

    @Get('budget')
    getBudget(@Req() req) {
        const transporterId = req.user.sub;
        return this.transporterService.getBudget(transporterId);
    }
}       