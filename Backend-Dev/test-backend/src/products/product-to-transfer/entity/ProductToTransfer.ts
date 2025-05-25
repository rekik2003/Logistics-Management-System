import { Product } from "src/products/entity/Product";
import { Warehouse } from "src/wharehouse/entity/Warehouse";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ synchronize: false })
export class ProductToTransfer {
    @PrimaryGeneratedColumn()
    id: number ;

    @ManyToOne(() => Product, (product) => product.productToTransfer, { eager: true }) 
    @JoinColumn({ name: 'ref' })
    product: Product;  
    
    @Column()
    quantity: number ;

    @Column()
    totalPrice: number;

    @Column()
    date: Date;

    @Column()
    type: string;

    @ManyToOne(() => Warehouse, warehouse => warehouse.productToTransfer)
    warehouse: Warehouse;
}