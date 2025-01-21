import { Repository } from "typeorm";
import { ChargeEntity } from "../databases/mysql/charge.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { ChargeToCreateDTO } from "../types/charge/dtos";
import { ChargeToCreateInput } from "../types/charge/Inputs";
import ColocationEntity from "../databases/mysql/colocation.entity";
import PaiementEntity from "../databases/mysql/paiements.entity";

export class ChargesRepository {
  private chargeBD: Repository<ChargeEntity>;


  constructor() {
    this.chargeBD = connectMySQLDB.getRepository(ChargeEntity);
  }

  create(charge: ChargeToCreateInput): ChargeEntity {
    const newCharge = new ChargeEntity();
    newCharge.description = charge.description;
    newCharge.montant = charge.montant;
    newCharge.colocation = charge.colocation;
    newCharge.payePar = charge.payePar;

    return newCharge;
  }
  async save(charge: ChargeEntity): Promise<ChargeEntity> {
    return this.chargeBD.save(charge);
  }
}


