import { Expose, Type } from "class-transformer";
import { UserPresenter } from "../user/presenters";
import { ColocationPresenter } from "../colocation/presenters";
import { ValidateNested } from "class-validator";

export class ChargePresenter {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Expose()
  montant: number;

  @Expose()
  dateCreation: Date;

  @Expose()
  @Type(() => ColocationPresenter)
  @ValidateNested()
  colocation: ColocationPresenter;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  payePar: UserPresenter;

  @Expose()
  @ValidateNested()
  @Type(() => Boolean)
  estActif: boolean;


}
