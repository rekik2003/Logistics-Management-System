import { IsNumber, IsDate, IsString } from 'class-validator';

export class CreateBudgetRequestDto {
    @IsNumber()
    cost: number;

}