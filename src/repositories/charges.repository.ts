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

  async findById(id: number): Promise<ChargeEntity | null> {
      return this.chargeBD.findOne({
        where: { id }, 
      });
    }
  
  async save(charge: ChargeEntity): Promise<ChargeEntity> {
    return this.chargeBD.save(charge);
  }
  async deactivateCharge(id: number): Promise<ChargeEntity> {
    const charge = await this.findById(id);
    if (!charge) {
      throw new Error("Charge not found");
    }

    charge.IsActif = false;  // Mettre IsActif à false
    return this.chargeBD.save(charge);  // Sauvegarder la charge mise à jour
  }

  async activateCharge(id: number): Promise<ChargeEntity> {
    const charge = await this.findById(id);
    if (!charge) {
      throw new Error("Charge not found");
    }

    charge.IsActif = true;  // Mettre IsActif à false
    return this.chargeBD.save(charge);  // Sauvegarder la charge mise à jour
  }
}
