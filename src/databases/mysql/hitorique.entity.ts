/*import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity('historique')
export class historiqueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  libelle: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export default historiqueEntity;*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocationEntity } from "./colocation.entity";

@Entity('historiques')
export class HistoriqueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToOne(() => UserEntity, (user) => user.historiques)
  utilisateur: UserEntity;

  @ManyToOne(() => ColocationEntity, (colocation) => colocation.historique)
  colocation: ColocationEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAction: Date;
}

export default HistoriqueEntity;
