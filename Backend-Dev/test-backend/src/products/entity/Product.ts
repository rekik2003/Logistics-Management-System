import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductToTransfer } from '../product-to-transfer/entity/ProductToTransfer';
import { ProductInStock } from '../product-in-stock/entity/ProductInStock';

@Entity({ synchronize: false })
export class Product {
  @PrimaryGeneratedColumn()
  ref: number;

  @Column()
  label: string;

  @OneToMany(() => ProductToTransfer, (productToTransfer) => productToTransfer.product)
  productToTransfer: ProductToTransfer[];

  @OneToMany(() => ProductInStock, productInStock => productInStock.product)
  stockEntries: ProductInStock[];
}
