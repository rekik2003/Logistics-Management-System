import { Body, Controller, Get, Param, Patch, Post, Put, Req } from "@nestjs/common";
import { TransportFeesService } from "../services/transportFees.service";
import { CreateTransportFeeDto } from "../dto/createTransportFee.dto";
import { UpdateTransportFeeDto } from "../dto/updateTransportFee.dto";

@Controller('transportFees')
export class TransportFeesController {
    constructor (private transportFeesService: TransportFeesService) {}

    @Get() 
    allTransportFees(@Req() req) {
        const transporterId = req.user.sub;
        return this.transportFeesService.getLastFees(transporterId);
    }

    @Post('create')
    addExpences(@Req() req, @Body() createTransportFeeDto: CreateTransportFeeDto) {
        const transporterId = req.user.sub;
        return this.transportFeesService.create(
            transporterId,
            createTransportFeeDto.cost,
            createTransportFeeDto.details,
        );
    }

    @Patch('alter/:id')
    async updateTransportFee(
        @Param('id') id: number,
        @Body() updateTransportFeeDto: UpdateTransportFeeDto,
        @Req() req
    ) {
        const transporterId = req.user.sub;
        return this.transportFeesService.update(id, transporterId, updateTransportFeeDto);
    }
}