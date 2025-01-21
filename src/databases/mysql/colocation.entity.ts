import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { ChargeEntity } from "./charge.entity";
import { MembreColocationEntity } from "./membre.colocation.entity";
import { HistoriqueEntity } from "./historique.entity";
import { TacheMenagereEntity } from "./tache.menager.entity";

@Entity('colocations')
export class ColocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lieu: string;

  @Column()
  surface: number;

  @Column()
  nombreChambres: number;

  @Column()
  agenceOuProprietaire: string;

  @Column({ type: 'boolean', default: true })
  estActive: boolean;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.colocations)
  proprietaire: UserEntity;

  @OneToMany(() => ChargeEntity, (charge) => charge.colocation)
  charges: ChargeEntity[];

  @OneToMany(() => MembreColocationEntity, (membre) => membre.colocation)
  membres: MembreColocationEntity[];
  
  @OneToMany(() => TacheMenagereEntity, (tache) => tache.colocation)
  tachesMenageres: TacheMenagereEntity[];
}

export default ColocationEntity;
