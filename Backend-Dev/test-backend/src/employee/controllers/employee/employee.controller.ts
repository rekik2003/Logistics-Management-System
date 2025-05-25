import { Body, Controller, Get, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';
import { UpdateEmployeeDto } from 'src/employee/dtos/UpdateEmployee.dto';
import { EmployeeService } from 'src/employee/services/employee/employee.service';

@Controller('employee')
export class EmployeeController {
    constructor (private employeeService: EmployeeService) {}

    @Get()
    fetchEmplyees() {
        return this.employeeService.fetchAll();
    }

    @Patch(':id')
    updateSalary(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeeService.updateSalary(id,updateEmployeeDto.salary)
    }
}
