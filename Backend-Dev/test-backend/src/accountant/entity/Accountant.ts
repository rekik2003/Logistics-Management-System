import { BudgetRequests } from "src/budget/BudgetRequests";
import { Employee } from "src/employee/entity/Employee.entity";
import { Transporter } from "src/transporter/entity/Transporter";
import { User } from "src/users/entity/Users";
import { Warehouse } from "src/wharehouse/entity/Warehouse";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity({ synchronize: false })
export class Accountant {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => User, user => user.accountant, { eager: true })
    @JoinColumn({ name: "id" })
    user: User;

    @Column()
    budget: number;
    
    @OneToMany(() => Transporter, transporter => transporter.accountant)
    transporter: Transporter[]; 
    
    @OneToMany(() => Warehouse, warehouse => warehouse.accountant)
    warehouse: Warehouse[]; 

    @OneToMany(() => Employee, employee => employee.accountant)
    employee: Employee[]; 
    
}