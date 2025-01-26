import { Expose, Type } from "class-transformer";
import { ChargePresenter } from "../charge/presenters";
import { UserPresenter } from "../user/presenters";
import { ValidateNested } from "class-validator";

export class PartageChargePresenter {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ChargePresenter)
  @ValidateNested()
  charge: ChargePresenter;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  utilisateur: UserPresenter;

  @Expose()
  montantDu: number;

  @Expose()
  dateCreation: Date;
}
