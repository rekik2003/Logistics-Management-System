import { Accountant } from 'src/accountant/entity/Accountant';
import { Transporter } from 'src/transporter/entity/Transporter';
import { Warehouse } from 'src/wharehouse/entity/Warehouse';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Warehouse, warehouse => warehouse.user)
  warehouse: Warehouse;

  @OneToOne(() => Transporter, transporter => transporter.user)
  transporter: Transporter;

  @OneToOne(() => Accountant, accountant => accountant.user)
  accountant: Accountant;
}
