import { IsNumber, IsDate, IsString } from 'class-validator';

export class CreateTransportFeeDto {
    @IsNumber()
    cost: number;

    @IsDate()
    date: Date;

    @IsString()
    details: string;
}
