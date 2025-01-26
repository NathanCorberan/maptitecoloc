import { Expose, Type } from "class-transformer";
import { IsDecimal, IsInt, Min, IsOptional, IsDate } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ChargeEntity } from "../../databases/mysql/charge.entity";

export class PaiementToCreateDTO {
  @Expose()
  @IsDecimal({}, { message: "Le montant doit être un nombre décimal." })
  montant: number;

  @Expose()
  @IsInt({ message: "L'ID du payeur doit être un nombre entier." })
  @Min(1, { message: "L'ID du payeur n'existe pas." })
  payePar: number;

  @Expose()
  @IsInt({ message: "L'ID du remboursé doit être un nombre entier." })
  @Min(1, { message: "L'ID du remboursé n'existe pas." })
  rembourseA: number;

  @Expose()
  @IsInt({ message: "L'ID de la charge doit être un nombre entier." })
  @Min(1, { message: "L'ID de la charge n'existe pas." })
  charge: number;

  @Expose()
  @IsOptional()
  @Type(() => Date) // Transformation implicite en `Date`
  @IsDate({ message: "La date de paiement doit être une date valide." })
  datePaiement: Date;
}
