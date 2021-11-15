import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Banker, Transaction } from '.';
import Person from './Person.entity';

@Entity('client')
export default class Clients extends Person {
  @Column({
    default: 0,
  })
  balance: number;

  @Column({
    name: 'active',
    default: true,
  })
  is_active: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker)
  bankers: Banker[];

  @Column({
    type: 'simple-array',
    default: [],
  })
  family_members: string[];
}
