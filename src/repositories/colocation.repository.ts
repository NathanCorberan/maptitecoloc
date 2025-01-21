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
        'charges',           // Inclure les charges
        'membres',           // Inclure les membres
        'historique',        // Inclure l'historique
        'tachesMenageres'    // Inclure les tâches ménagères
      ],
    });
  }

  async ChangedActive(colocationId: number): Promise<ColocationEntity | null> {
    // Trouver la colocation par ID
    const colocation = await this.colocationBD.findOne({ where: { id: colocationId } });

    if (!colocation) {
      throw new Error("Colocation not found");
    }

    // Inverser l'état 'estActive' de la colocation
    colocation.estActive = !colocation.estActive;

    // Sauvegarder la colocation mise à jour
    return this.colocationBD.save(colocation);
  }
}

