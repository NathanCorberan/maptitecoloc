import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ChargeEntity } from "./charge.entity";
import { UserEntity } from "./user.entity";

@Entity('partages_charges')
export class PartageChargeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChargeEntity, (charge) => charge.partages)
  charge: ChargeEntity;

  @ManyToOne(() => UserEntity, (user) => user.partagesCharge)
  utilisateur: UserEntity;

  @Column("decimal")
  montantDu: number;
}

export default PartageChargeEntity;
