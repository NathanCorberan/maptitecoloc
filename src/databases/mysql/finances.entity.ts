import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity('finances')
export class financesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Charge: string;

  @Column()
  prix: number;

  @Column()
  id_coloc: number;

  @Column()
  id_user: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export default financesEntity;
