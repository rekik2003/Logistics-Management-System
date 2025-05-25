import { Accountant } from 'src/accountant/entity/Accountant';
import { BudgetRequests } from 'src/budget/BudgetRequests';
import { ProductInStock } from 'src/products/product-in-stock/entity/ProductInStock';
import { ProductToTransfer } from 'src/products/product-to-transfer/entity/ProductToTransfer';
import { User } from 'src/users/entity/Users';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class Warehouse {
    @PrimaryColumn()
    id: number;

    @OneToOne(() => User, user => user.warehouse, { eager: true })
    @JoinColumn({ name: "id" })
    user: User;

    @Column()
    budget: number;

    @ManyToOne(() => Accountant, accountant => accountant.warehouse)
    accountant: Accountant;

    @OneToMany(() => BudgetRequests, budgetRequests => budgetRequests.warehouse)
    budgetRequests: BudgetRequests[];

    @OneToMany(() => ProductToTransfer, productToTransfer => productToTransfer.warehouse)
    productToTransfer: ProductToTransfer[];

    @OneToMany(() => ProductInStock, productInStock => productInStock.warehouse)
    productInStock: ProductInStock[];
}
