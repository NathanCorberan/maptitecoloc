import { Expose, Type } from "class-transformer";
import { UserPresenter } from "../user/presenters";
import { ColocationPresenter } from "../colocation/presenters";
import { ValidateNested } from "class-validator";

export class TacheMenagerePresenter {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Expose()
  statut: string;

  @Expose()
  dateLimite: Date;

  @Expose()
  @Type(() => UserPresenter)
  @ValidateNested()
  assignee: UserPresenter;

  @Expose()
  @Type(() => ColocationPresenter)
  @ValidateNested()
  colocation: ColocationPresenter;
}
