import { Product } from "src/products/entity/Product";
import { Warehouse } from "src/wharehouse/entity/Warehouse";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ synchronize: false })
export class ProductInStock {
    @PrimaryColumn()
    warehouseId: number;

    @PrimaryColumn()
    ref: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Warehouse, warehouse => warehouse.productToTransfer, { eager: true })
    warehouse: Warehouse;

    @ManyToOne(() => Product, product => product.stockEntries, { eager: true })
    @JoinColumn({ name: 'ref'})
    product: Product;
}