import { Optional } from '@nestjs/common';
import { IsNumber, IsDate } from 'class-validator';

export class UpdateProductToTransferDto {
    @Optional()
    @IsNumber()
    quantity: number;

    @Optional()
    @IsNumber()
    totalPrice: number;
}