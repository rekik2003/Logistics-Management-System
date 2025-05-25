import { Transporter } from 'src/transporter/entity/Transporter';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ synchronize: false })
export class TransportFees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

  @Column()
  date: Date;

  @Column()
  details: string;

  @ManyToOne(() => Transporter, transporter => transporter.transportFees)
  transporter: Transporter;
}
