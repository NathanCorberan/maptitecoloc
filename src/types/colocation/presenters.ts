import { Expose, Type } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { UserPresenter } from "../user/presenters";
import { ValidateNested } from "class-validator";


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
  createdAt: Date; 

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested({ each: true })
  proprietaire: UserPresenter;
}
