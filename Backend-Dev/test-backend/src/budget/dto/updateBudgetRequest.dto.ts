import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateBudgetRequestDto {
    @IsOptional()
    @IsNumber()
    cost?: number;

    @IsOptional()
    @IsString()
    status?: string;
}
