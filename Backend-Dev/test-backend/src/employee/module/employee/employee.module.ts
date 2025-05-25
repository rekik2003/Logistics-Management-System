import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeController } from "src/employee/controllers/employee/employee.controller";
import { Employee } from "src/employee/entity/Employee.entity";
import { EmployeeService } from "src/employee/services/employee/employee.service";

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
      providers: [EmployeeService],
      controllers: [EmployeeController],
      exports: [],
})
export class EmployeeModule {}
