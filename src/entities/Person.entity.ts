import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    length: 10,
  })
  card_number: string;

  @Column({
    type: 'simple-json',
    nullable: true,
  })
  additional_info: {
    age: number;
    nationality: string;
    home_address: string;
  };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
