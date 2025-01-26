import { Repository } from "typeorm";
import { PartageChargeEntity } from "../databases/mysql/partage.charge.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { PartageChargeToCreateInput } from "../types/partage/Inputs";

export class ChargesRepository {
  private partageBD: Repository<PartageChargeEntity>;


  constructor() {
    this.partageBD = connectMySQLDB.getRepository(PartageChargeEntity);
  }

  create(charge: PartageChargeToCreateInput): PartageChargeEntity {
    const newPartageCharge = new PartageChargeEntity();
    newPartageCharge.charge = charge.charge;
    newPartageCharge.utilisateur = charge.utilisateur;
    newPartageCharge.montantDu = charge.montantDu;

    return newPartageCharge;
  }
  
  async save(partageCharge: PartageChargeEntity): Promise<PartageChargeEntity> {
    return this.partageBD.save(partageCharge);
  }
}


