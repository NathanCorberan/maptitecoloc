import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ColocationEntity } from "./colocation.entity";

@Entity('taches_menageres')
export class TacheMenagereEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: "enum", enum: ["À faire", "En cours", "Terminé"] })
  statut: string;

  @Column({ type: 'timestamp', nullable: true })
  dateLimite: Date;

  @ManyToOne(() => UserEntity, (user) => user.tachesMenageres)
  assignee: UserEntity;

  @ManyToOne(() => ColocationEntity, (colocation) => colocation.tachesMenageres)
  colocation: ColocationEntity;
}

export default TacheMenagereEntity;
