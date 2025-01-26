import { Repository } from "typeorm";
import { TacheMenagereEntity } from "../databases/mysql/tache.menager.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { TacheMenagereToCreateInput } from "../types/tachesMenageres/Inputs";

export class TacheMenagerRepository {
  private tacheMenagereBD: Repository<TacheMenagereEntity>;


  constructor() {
    this.tacheMenagereBD = connectMySQLDB.getRepository(TacheMenagereEntity);
  }

  create(tacheMenagere: TacheMenagereToCreateInput): TacheMenagereEntity {
    const newtacheMenagere = new TacheMenagereEntity();
    newtacheMenagere.description = tacheMenagere.description;
    newtacheMenagere.statut = tacheMenagere.statut;
    newtacheMenagere.dateLimite = tacheMenagere.dateLimite;
    newtacheMenagere.assignee = tacheMenagere.assignee;
    newtacheMenagere.colocation = tacheMenagere.colocation

    return newtacheMenagere;
  }
  async save(tacheMenagere: TacheMenagereEntity): Promise<TacheMenagereEntity> {
    return this.tacheMenagereBD.save(tacheMenagere);
  }

  async updateStatut(id: number, statut: string): Promise<TacheMenagereEntity | null> {
    const tache = await this.tacheMenagereBD.findOne({ where: { id } });
    if (!tache) {
      return null; // La tâche n'existe pas
    }

    tache.statut = statut;
    return this.tacheMenagereBD.save(tache);
  }
  
}


