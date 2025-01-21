import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('finances')
export class FinancesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  charge: string;

  @Column()
  prix: number;

  @Column()
  id_coloc: number;

  @Column()
  id_user: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export default FinancesEntity;
