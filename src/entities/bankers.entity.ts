import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Client } from '.';
import Person from './Person.entity';

@Entity('banker')
export default class Bankers extends Person {
  @Column({
    length: 10,
    unique: true,
  })
  employee_number: string;

  @ManyToMany(() => Client)
  @JoinTable({
    name: 'bankers_clients',
    joinColumn: {
      name: 'banker',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'client',
      referencedColumnName: 'id',
    },
  })
  clients: Client[];
}
