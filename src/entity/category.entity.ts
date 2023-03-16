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

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    name: 'category_name',
  })
  categoryName: string;

  @Column({ type: 'tinyint', default: 1, name: 'is_enable' })
  isEnable: boolean;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;

  @DeleteDateColumn({ name: 'delete_time' })
  deleteTime: Date;
}
