import Transaction from '@modules/transaction/infra/typeorm/entities/Transaction';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from './Category';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Transaction, transaction => transaction.product)
  transactions: Transaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
