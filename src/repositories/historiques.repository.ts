import { Repository } from "typeorm";
import { HistoriqueEntity } from "../databases/mysql/historique.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { HistoriqueToCreateInput } from "../types/historique/Inputs";

export class HistoriquesRepository {
  private historiqueBD: Repository<HistoriqueEntity>;

  constructor() {
    this.historiqueBD = connectMySQLDB.getRepository(HistoriqueEntity);
  }

  create(historique: HistoriqueToCreateInput, action:string): HistoriqueEntity {
    const newHistorique = new HistoriqueEntity();
    newHistorique.action = action;
    newHistorique.utilisateur = historique.utilisateur;

    return newHistorique;
  }

  async save(historique: HistoriqueEntity): Promise<HistoriqueEntity> {
    return this.historiqueBD.save(historique);
  }
}