import { IsNumber, IsDate, IsString, IsOptional } from 'class-validator';

export class UpdateTransportFeeDto {
    @IsOptional()
    @IsNumber()
    cost?: number;

    @IsOptional()
    @IsString()
    details?: string;
}
