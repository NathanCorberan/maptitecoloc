import { ColocationEntity } from "../databases/mysql/colocation.entity";
import { ColocationRepository } from "../repositories/colocation.repository";
import { ColocationToCreateDTO } from "../types/colocation/dtos";
import { colocationToCreateInput } from "../types/colocation/Inputs"; // Ajouter l'import
import { ColocationBigPresenter } from "../types/colocation/presenter.big"; // Ajouter l'import

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

  async findInfoAllColocations(colocationId: number): Promise<ColocationEntity | null> {
    return this.colocationRepository.findInfoAllColocations(colocationId);
  }
}