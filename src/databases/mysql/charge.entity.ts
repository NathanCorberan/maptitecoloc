import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ColocationEntity } from "./colocation.entity";
import { PartageChargeEntity } from "./partage.charge.entity";
import { UserEntity } from "./user.entity";

@Entity('charges')
export class ChargeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column("decimal")
  montant: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @ManyToOne(() => ColocationEntity, (colocation) => colocation.charges)
  colocation: ColocationEntity;

  @ManyToOne(() => UserEntity, (user) => user.charges)
  payePar: UserEntity;

  @OneToMany(() => PartageChargeEntity, (partage) => partage.charge)
  partages: PartageChargeEntity[];
}

export default ChargeEntity;
