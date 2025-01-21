/*import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

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

export default paiementsEntity;*/

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ChargeEntity } from "./charge.entity";

@Entity('paiements')
export class PaiementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  montant: number;

  @ManyToOne(() => UserEntity, (user) => user.paiementsPayePar)
  payePar: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.paiementsRembourseA)
  rembourseA: UserEntity;

  @ManyToOne(() => ChargeEntity, (charge) => charge.payePar, { nullable: true })
  charge: ChargeEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datePaiement: Date;
}

export default PaiementEntity;
