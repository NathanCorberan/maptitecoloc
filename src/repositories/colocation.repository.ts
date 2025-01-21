import { Repository } from "typeorm";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { colocationToCreateInput } from "../types/colocation/Inputs";
import { UserEntity } from "../databases/mysql/user.entity";

export class ColocationRepository {
  private colocationBD: Repository<ColocationEntity>;

  constructor() {
    this.colocationBD = connectMySQLDB.getRepository(ColocationEntity);
  }

  create(colocation: ColocationToCreateDTO): ColocationEntity {
    const newColocation = new ColocationEntity();
    newColocation.lieu = colocation.lieu;
    newColocation.surface = colocation.surface;
    newColocation.nombreChambres = colocation.nombreChambres;
    newColocation.agenceOuProprietaire = colocation.agenceOuProprietaire;
    newColocation.estActive = colocation.estActive;

    // Associez le propriétaire en utilisant uniquement l'ID
    const proprietaire = new UserEntity();
    proprietaire.id = colocation.proprietaire;
    newColocation.proprietaire = proprietaire;    return newColocation;
  }

  async save(colocation: ColocationEntity): Promise<ColocationEntity> {
    return this.colocationBD.save(colocation);
  }

  /*
  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userDB.findOne({
      where: { email },
      relations: ["userCredential"],
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userDB.findOne({
      where: { id },  // Recherche par id
    });
  }

  async deleteById(id: number): Promise<void> {
    try {
      const user = await this.userDB.findOne({ where: { id } });

      if (!user) {
        throw new Error("User not found");
      }

      // Supprimer l'utilisateur
      await this.userDB.delete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Could not delete user");
    }
  }*/
}

