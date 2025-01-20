import { Repository } from "typeorm";
import { UserCredentialEntity } from "../databases/mysql/userCredential.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserToCreateDTO } from "../types/user/dtos";
import { userToCreateInput } from "../types/user/Inputs";

export class UserCredentialRepository {
  private userCredentialDB: Repository<UserCredentialEntity>;

  constructor() {
    this.userCredentialDB = connectMySQLDB.getRepository(UserCredentialEntity);
  }

  // Créer un nouvel objet UserCredential à partir des données passées
  create(userCredentialData: userToCreateInput): UserCredentialEntity {
    const newUserCredential = this.userCredentialDB.create(userCredentialData);
    return newUserCredential;
  }

  // Sauvegarder un UserCredential dans la base de données
  async save(userCredential: UserCredentialEntity): Promise<UserCredentialEntity> {
    return this.userCredentialDB.save(userCredential);
  }
}
