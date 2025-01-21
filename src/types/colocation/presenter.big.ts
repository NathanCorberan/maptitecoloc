import { Expose, Type } from "class-transformer";
import { UserEntity } from "../../databases/mysql/user.entity";
import { UserPresenter } from "../user/presenters";
import { ValidateNested } from "class-validator";
import { ChargePresenter } from "../charge/presenters";
import { MembreColocationPresenter } from "../membre/presenters";
import { HistoriquePresenter } from "../historique/presenters";
import { TacheMenagerePresenter } from "../tachesMenageres/presenters";


export class ColocationBigPresenter {
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

  @Expose()
  @Type(() => ChargePresenter)
  @ValidateNested({ each: true })
  charges: ChargePresenter;

  @Expose()
  @Type(() => MembreColocationPresenter)
  @ValidateNested({ each: true })
  membres: MembreColocationPresenter;

  @Expose()
  @Type(() => HistoriquePresenter)
  @ValidateNested({ each: true })
  historique: HistoriquePresenter;

  @Expose()
  @Type(() => TacheMenagerePresenter)
  @ValidateNested({ each: true })
  tachesMenageres: TacheMenagerePresenter;
}
