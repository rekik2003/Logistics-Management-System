import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entity/Employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor (
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>
    )
    {}

    async fetchAll () {
        return await this.employeeRepository.find();
    }

    async updateSalary (id: number, newSalary: number) {
        const employee = await this.employeeRepository.findOneBy({id});
        if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);

        employee.salary = newSalary;
        return await this.employeeRepository.save(employee);
    }
}
