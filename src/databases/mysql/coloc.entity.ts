import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('coloc')
export class ColocEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  area: number;

  @Column()
  agency: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export default ColocEntity;
