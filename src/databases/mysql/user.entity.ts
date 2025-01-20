import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserCredentialEntity } from "./userCredential.entity"; // Assurez-vous que le chemin est correct

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => UserCredentialEntity, (userCredential) => userCredential.user, { cascade: true })
  userCredential: UserCredentialEntity;
}

export default UserEntity;