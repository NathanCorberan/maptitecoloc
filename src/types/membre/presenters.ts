import { Expose, Type } from "class-transformer";
import { UserPresenter } from "../user/presenters";
import { ColocationPresenter } from "../colocation/presenters";
import { ValidateNested } from "class-validator";

export class MembreColocationPresenter {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ColocationPresenter)
  @ValidateNested()
  colocation: ColocationPresenter;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  utilisateur: UserPresenter;

  @Expose()
  dateAjout: Date;

  @Expose()
  estActif: boolean;
}
