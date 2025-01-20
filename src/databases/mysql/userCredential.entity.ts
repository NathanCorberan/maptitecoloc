import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity"; // Assurez-vous que le chemin est correct

@Entity('user_credentials')
export class UserCredentialEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @OneToOne(() => UserEntity, (user) => user.userCredential) // Relier UserEntity à UserCredentialEntity
  @JoinColumn() // La relation sera gérée par la clé étrangère dans UserEntity
  user: UserEntity;
}

export default UserCredentialEntity;