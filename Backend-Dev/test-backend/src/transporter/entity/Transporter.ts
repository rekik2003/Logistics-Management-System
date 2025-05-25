import { Accountant } from 'src/accountant/entity/Accountant';
import { BudgetRequests } from 'src/budget/BudgetRequests';
import { TransportFees } from 'src/transportFees/entities/TransportFees';
import { User } from 'src/users/entity/Users';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class Transporter {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => User, user => user.transporter, { eager: true })
    @JoinColumn({ name: "id" })
    user: User;

    @Column()
    budget: number;

    @OneToMany(() => TransportFees, transportFees => transportFees.transporter)
    transportFees: TransportFees[];

    @ManyToOne(() => Accountant, accountant => accountant.transporter)
    accountant: Accountant;

    @OneToMany(() => BudgetRequests, budgetRequests => budgetRequests.transporter)
    budgetRequests: BudgetRequests[];
}
