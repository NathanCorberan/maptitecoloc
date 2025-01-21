import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { colocationToCreateInput } from "../types/colocation/Inputs"; // Ajouter l'import
import { ColocationPresenter } from "../types/colocation/presenters";

export class ColocationService {
  private colocationRepository = new ColocationRepository();

  async createColocation(colocationToCreate: ColocationToCreateDTO): Promise<ColocationEntity> {
    const newColocation = this.colocationRepository.create(colocationToCreate);
    const savedColocation = await this.colocationRepository.save(newColocation);
    const colocationWithProprietaire = await this.colocationRepository.findOne(savedColocation.id);

    return colocationWithProprietaire!;
  }

  async findAllColocations(userId: number): Promise<ColocationEntity[]> {
    return this.colocationRepository.findAllColocations(userId);
  }

  /*async findInfoAllColocations(userColocationId: number): Promise<ColocationPresenter[]> {
    const colocations = await this.colocationRepository.findInfoAllColocations(userColocationId);

    return colocations;
  }*/
}