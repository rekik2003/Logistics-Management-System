import { Optional } from "@nestjs/common";
import { IsNumber } from "class-validator";

export class UpdateEmployeeDto {
    @Optional()
    @IsNumber()
    salary: number;
}