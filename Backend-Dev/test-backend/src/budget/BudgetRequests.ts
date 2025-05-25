import { Accountant } from "src/accountant/entity/Accountant";
import { Transporter } from "src/transporter/entity/Transporter";
import { Warehouse } from "src/wharehouse/entity/Warehouse";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
export class BudgetRequests {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: string;

    @Column()
    date: Date;

    @Column() 
    cost: number;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Transporter, { nullable: true })
    @JoinColumn({ name: 'transporterId' })
    transporter: Transporter;

    @ManyToOne(() => Warehouse, { nullable: true })
    @JoinColumn({ name: 'warehouseId' })
    warehouse: Warehouse;

}