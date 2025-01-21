import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocationEntity } from "./colocation.entity";

@Entity('membres_colocation')
export class MembreColocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColocationEntity, (colocation) => colocation.membres)
  colocation: ColocationEntity;

  @ManyToOne(() => UserEntity, (user) => user.membresColocation)
  utilisateur: UserEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAjout: Date;

  @Column({ type: 'boolean', default: true })
  estActif: boolean;
}

export default MembreColocationEntity;
