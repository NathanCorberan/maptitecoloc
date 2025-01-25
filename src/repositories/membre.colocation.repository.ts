import { Repository } from "typeorm";
import { MembreColocationEntity } from "../databases/mysql/membre.colocation.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserEntity } from "../databases/mysql/user.entity";
import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { MembreColocationToCreateInput } from "../types/membre/Inputs";

export class MembreColocationRepository {
  private membreColocationDB: Repository<MembreColocationEntity>;

  constructor() {
    this.membreColocationDB = connectMySQLDB.getRepository(MembreColocationEntity);
  }

    ajouterMembre(membreColocation: MembreColocationToCreateInput): MembreColocationEntity {
        const newMembreColocation = new MembreColocationEntity();
        newMembreColocation.colocation = membreColocation.colocation;
        newMembreColocation.utilisateur = membreColocation.utilisateur;
        newMembreColocation.estActif = membreColocation.estActif;

        return newMembreColocation;
    }

    save(membreColocation: MembreColocationEntity): Promise<MembreColocationEntity> {
        return this.membreColocationDB.save(membreColocation);
    }

    async desactiverMembre(membreColocation: MembreColocationEntity): Promise<MembreColocationEntity> {
      membreColocation.estActif = false;
      return this.membreColocationDB.save(membreColocation);
  }

  async findOne(idColocation: number, idMembre: number): Promise<MembreColocationEntity | null> {
    return this.membreColocationDB.findOne({
        where: { colocation: { id: idColocation }, utilisateur: { id: idMembre } },
        relations: ["utilisateur", "colocation"],
    });
  }
  
}
