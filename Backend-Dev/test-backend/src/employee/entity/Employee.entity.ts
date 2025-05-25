import { Accountant } from "src/accountant/entity/Accountant";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column() 
    salary: number;

    @ManyToOne(() => Accountant, accountant => accountant.employee)
    accountant: Accountant;
}