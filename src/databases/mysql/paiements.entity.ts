import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity('paiements')
export class paiementsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  montant: string;

  @Column()
  id_coloc: number;

  @Column()
  id_user: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export default paiementsEntity;
