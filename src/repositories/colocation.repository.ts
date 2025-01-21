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

  create(colocation: colocationToCreateInput): ColocationEntity {
    const newColocation = new ColocationEntity();
      newColocation.lieu = colocation.lieu;
      newColocation.surface = colocation.surface;
      newColocation.nombreChambres = colocation.nombreChambres;
      newColocation.agenceOuProprietaire = colocation.agenceOuProprietaire;
      newColocation.estActive = colocation.estActive;
      newColocation.proprietaire = colocation.proprietaire;

    return newColocation;
  }

  async save(colocation: ColocationEntity): Promise<ColocationEntity> {
    return this.colocationBD.save(colocation);
  }

  async findOne(id: number): Promise<ColocationEntity | null> {
    return this.colocationBD.findOne({
      where: { id },
      relations: ['proprietaire'],
    });
  }

  async findAllColocations(userId: number): Promise<ColocationEntity[]> {
    return this.colocationBD.find({
      where: { proprietaire: { id: userId } },
      relations: ['proprietaire'],
    });
  }

  async findInfoAllColocations(colocationId: number): Promise<ColocationEntity | null> {
    return this.colocationBD.findOne({
      where: { id: colocationId },
      relations: [
        'proprietaire',
        'charges',
        'charges.payePar',
        'membres',
        'membres.utilisateur',
        'historique',
        'historique.utilisateur',
        'tachesMenageres',
        'tachesMenageres.assignee'
      ],
    });
  }

  async ChangedActive(colocationId: number, active: boolean): Promise<ColocationEntity | null> {
    const colocation = await this.colocationBD.findOne({ where: { id: colocationId } });

    if (!colocation) {
      throw new Error("Colocation not found");
    }

    // Inverser l'état 'estActive' de la colocation
    colocation.estActive = active;

    // Sauvegarder la colocation mise à jour
    return this.colocationBD.save(colocation);
  }
}

