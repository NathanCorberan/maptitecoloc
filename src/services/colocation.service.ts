import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { colocationToCreateInput } from "../types/colocation/Inputs"; // Ajouter l'import
import { ColocationBigPresenter } from "../types/colocation/presenter.big"; // Ajouter l'import
import { UserRepository } from "../repositories/user.repository";
import { userToCreateInput } from "../types/user/Inputs";
import UserEntity from "../databases/mysql/user.entity";

export class ColocationService {
  private colocationRepository = new ColocationRepository();
  private userRepository = new UserRepository();

  async createColocation(colocationToCreate: ColocationToCreateDTO): Promise<ColocationEntity> {

    const existingUser: UserEntity | null = await this.userRepository.findById(colocationToCreate.proprietaire);
    if (!existingUser) {
      throw new Error("Le propriétaire spécifié n'existe pas.");
    }

    // Préparez les données d'entrée pour créer une colocation
    const colocationInput: colocationToCreateInput = {
      lieu: colocationToCreate.lieu,
      surface: colocationToCreate.surface,
      nombreChambres: colocationToCreate.nombreChambres,
      agenceOuProprietaire: colocationToCreate.agenceOuProprietaire,
      estActive: colocationToCreate.estActive,
      proprietaire: existingUser,
    };



    const newColocation = this.colocationRepository.create(colocationInput);
    const savedColocation = await this.colocationRepository.save(newColocation);
    //const colocationWithProprietaire = await this.colocationRepository.findOne(savedColocation.id);

    return savedColocation!;
  }

  async findAllColocations(userId: number): Promise<ColocationEntity[]> {
    return this.colocationRepository.findAllColocations(userId);
  }

  async findInfoAllColocations(colocationId: number): Promise<ColocationEntity | null> {
    return this.colocationRepository.findInfoAllColocations(colocationId);
  }
}