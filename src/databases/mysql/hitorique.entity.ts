import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity('historique')
export class historiqueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export default historiqueEntity;
