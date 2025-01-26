import { Repository } from "typeorm";
import { PartageChargeEntity } from "../databases/mysql/partage.charge.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";

export class PartageChargeRepository {
  private partageChargeBD: Repository<PartageChargeEntity>;

  constructor() {
    this.partageChargeBD = connectMySQLDB.getRepository(PartageChargeEntity);
  }

  // Méthode pour récupérer tous les partages d'une charge donnée
  async findByCharge(chargeId: number): Promise<PartageChargeEntity[]> {
    try {
      const partages = await this.partageChargeBD
        .createQueryBuilder("partage")
        .innerJoin("partage.charge", "charge")
        .where("charge.id = :chargeId", { chargeId })
        .getMany();
      return partages;
    } catch (error) {
      console.error("Error finding partage by charge:", error);
      throw new Error("Failed to find partage by charge");
    }
  }

  async findByUser(userId: number): Promise<PartageChargeEntity[]> {
    try {
      const partages = await this.partageChargeBD
        .createQueryBuilder("partage")
        .innerJoin("partage.utilisateur", "user")
        .where("user.id = :userId", { userId })
        .getMany();
      return partages;
    } catch (error) {
      console.error("Error finding partage by user:", error);
      throw new Error("Failed to find partage by user");
    }
  }

  // Méthode pour créer un nouveau partage de charge
  async save(partage: PartageChargeEntity): Promise<PartageChargeEntity> {
    try {
      return await this.partageChargeBD.save(partage);
    } catch (error) {
      console.error("Error saving partage charge:", error);
      throw new Error("Failed to save partage charge");
    }
  }
}
