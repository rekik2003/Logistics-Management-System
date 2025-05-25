import { IsNumber, IsDate, IsString } from 'class-validator';

export class CreateProductToTransferDto {
    @IsNumber()
    ref: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    totalPrice: number;

    @IsString()
    type: string;
}