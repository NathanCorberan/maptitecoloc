import { Expose, Type } from "class-transformer";
import { UserPresenter } from "../user/presenters";
import { ChargePresenter } from "../charge/presenters";
import { ValidateNested } from "class-validator";

export class PaiementPresenter {
  @Expose()
  id: number;

  @Expose()
  montant: number;

  @Expose()
  datePaiement: Date;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  payePar: UserPresenter;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  rembourseA: UserPresenter;

  @Expose()
  @Type(() => ChargePresenter)
  @ValidateNested()
  charge: ChargePresenter;
}
