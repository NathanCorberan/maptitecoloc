import { Expose, Type } from "class-transformer";
import { UserPresenter } from "../user/presenters";
import { ColocationPresenter } from "../colocation/presenters";
import { ValidateNested } from "class-validator";

export class HistoriquePresenter {
  @Expose()
  id: number;

  @Expose()
  action: string;

  @Expose()
  dateAction: Date;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  utilisateur: UserPresenter;

  @Expose()
  @Type(() => ColocationPresenter)
  @ValidateNested()
  colocation: ColocationPresenter;
}
