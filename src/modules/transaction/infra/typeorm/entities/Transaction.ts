import Product from '@modules/manage/infra/typeorm/entities/Product';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  purchased_qnt?: number;

  @Column()
  purchased_unt?: number;

  @Column()
  purchased_amt?: number;

  @Column()
  sold_qnt?: number;

  @Column()
  sold_unt?: number;

  @Column()
  sold_amt?: number;

  @Column()
  balance_qnt: number;

  @Column()
  balance_unt: number;

  @Column()
  balance_amt: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
