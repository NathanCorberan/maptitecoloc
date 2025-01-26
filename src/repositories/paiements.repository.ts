import { Repository } from "typeorm";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import PaiementEntity from "../databases/mysql/paiements.entity";
import { PaiementToCreateInput } from "../types/paiements/Inputs";

export class PaiementRepository {
  private paiementBD: Repository<PaiementEntity>;


  constructor() {
    this.paiementBD = connectMySQLDB.getRepository(PaiementEntity);
  }

  create(paiement: PaiementToCreateInput): PaiementEntity {
    const newPaiement = new PaiementEntity();
    newPaiement.montant = paiement.montant;
    newPaiement.payePar = paiement.payePar;
    newPaiement.rembourseA = paiement.rembourseA;
    newPaiement.charge = paiement.charge;
    newPaiement.datePaiement = paiement.datePaiement;
    
    return newPaiement;
  }
  
  async save(paiement: PaiementEntity): Promise<PaiementEntity> {
    return this.paiementBD.save(paiement);
  }
}


