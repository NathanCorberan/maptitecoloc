import { TacheMenagerRepository } from "../repositories/tache.menager.repository";
import { ColocationRepository } from "../repositories/colocation.repository";
import { UserRepository } from "../repositories/user.repository";
import { TacheMenagereToCreateDTO } from "../types/tachesMenageres/dtos";
import { TacheMenagereToCreateInput } from "../types/tachesMenageres/Inputs";
import { CustomError } from "../utils/customError";
import { TacheMenagereEntity } from "../databases/mysql/tache.menager.entity";

export class TacheMenagereService {
  private tacheMenagereRepository = new TacheMenagerRepository();
  private userRepository = new UserRepository();
  private colocationRepository = new ColocationRepository();

  async createTacheMenagere(idUserColoc: number, tacheMenagereToCreate: TacheMenagereToCreateDTO): Promise<TacheMenagereEntity> {

    // Vérifie si l'utilisateur est associé à une colocation
    const adminUserColoc = await this.colocationRepository.findAllColocations(idUserColoc);
    if (!adminUserColoc) {
      throw new CustomError("No colocation found for this user", "A0001", "COLOCATION_NOT_FOUND");
    }

    // Vérifie si l'utilisateur assigné existe
    const existingUser = await this.userRepository.findById(tacheMenagereToCreate.assignee);
    if (!existingUser) {
      throw new CustomError("The user to be assigned does not exist", "404", "USER_NOT_FOUND");
    }

    // Vérifie si la colocation existe
    const existingColocation = await this.colocationRepository.findOne(tacheMenagereToCreate.colocation);
    if (!existingColocation) {
      throw new CustomError("The specified colocation does not exist", "404", "COLOCATION_NOT_FOUND");
    }

    // Prépare l'entrée pour la création de la tâche ménagère
    const tacheMenagereInput: TacheMenagereToCreateInput = {
      description: tacheMenagereToCreate.description,
      statut: tacheMenagereToCreate.statut,
      dateLimite: tacheMenagereToCreate.dateLimite,
      assignee: existingUser,
      colocation: existingColocation,
    };

    // Crée et sauvegarde la tâche ménagère
    const newTacheMenagere = this.tacheMenagereRepository.create(tacheMenagereInput);
    return this.tacheMenagereRepository.save(newTacheMenagere);
  }

  async updateStatut(id: number, statut: string): Promise<TacheMenagereEntity | null> {
    return this.tacheMenagereRepository.updateStatut(id, statut);
  }
}
