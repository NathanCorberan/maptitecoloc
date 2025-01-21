import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { UserCredentialEntity } from "./userCredential.entity";
import { ColocationEntity } from "./colocation.entity";
import { ChargeEntity } from "./charge.entity";
import { PaiementEntity } from "./paiements.entity";
import { MembreColocationEntity } from "./membre.colocation.entity";
import { PartageChargeEntity } from "./partage.charge.entity";
import { HistoriqueEntity } from "./historique.entity";
import { TacheMenagereEntity } from "./tache.menager.entity";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  age: number;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
  photoProfil: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => UserCredentialEntity, (userCredential) => userCredential.user, { cascade: true })
  userCredential: UserCredentialEntity;

  @OneToMany(() => ColocationEntity, (colocation) => colocation.proprietaire)
  colocations: ColocationEntity[];

  @OneToMany(() => ChargeEntity, (charge) => charge.payePar)
  charges: ChargeEntity[];

  @OneToMany(() => PaiementEntity, (paiement) => paiement.payePar)
  paiementsPayePar: PaiementEntity[];

  @OneToMany(() => PaiementEntity, (paiement) => paiement.rembourseA)
  paiementsRembourseA: PaiementEntity[];

  @OneToMany(() => MembreColocationEntity, (membre) => membre.utilisateur)
  membresColocation: MembreColocationEntity[];

  @OneToMany(() => PartageChargeEntity, (partage) => partage.utilisateur)
  partagesCharge: PartageChargeEntity[];

  @OneToMany(() => HistoriqueEntity, (historique) => historique.utilisateur)
  historiques: HistoriqueEntity[];

  @OneToMany(() => TacheMenagereEntity, (tache) => tache.assignee)
  tachesMenageres: TacheMenagereEntity[];
}

export default UserEntity;
