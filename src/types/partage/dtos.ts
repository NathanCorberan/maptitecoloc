import { Expose } from "class-transformer";
import { IsDecimal, IsInt, Min } from "class-validator";
import { ChargeEntity } from "../../databases/mysql/charge.entity";
import { UserEntity } from "../../databases/mysql/user.entity";

export class PartageChargeToCreateDTO {
  @Expose()
  @IsInt({ message: "L'ID de la charge doit être un nombre entier." })
  @Min(1, { message: "L'ID de la charge n'existe pas." })
  charge: number;

  @Expose()
  @IsInt({ message: "L'ID de l'utilisateur doit être un nombre entier." })
  @Min(1, { message: "L'ID de l'utilisateur n'existe pas." })
  utilisateur: number;

  @Expose()
  @IsDecimal({}, { message: "Le montant dû doit être un nombre décimal." })
  montantDu: number;
}
