import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn() // 自增主键
  id: number;

  @Column()
  category_name: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @DeleteDateColumn()
  delete_time: Date;
}
