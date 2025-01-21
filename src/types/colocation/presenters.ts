import { Expose } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";

export class ColocationPresenter {
  @Expose()
  id: number;

  @Expose()
  lieu: string;

  @Expose()
  surface: number;

  @Expose()
  nombreChambres: number;

  @Expose()
  agenceOuProprietaire: string;

  @Expose()
  estActive: boolean;

  @Expose()
  createdAt: Date; // Si la colonne createdAt est ajoutée à l'entité ColocationEntity
  
  @Expose()
  proprietaire: UserEntity;
}
