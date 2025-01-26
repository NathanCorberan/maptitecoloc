import { Expose, Type } from "class-transformer";
import { IsString, IsDecimal, IsInt, Min, IsBoolean } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

export class ChargeToCreateInput {
  @Expose()
  @IsString({ message: "La description doit être une chaîne de caractères." })
  description: string;

  @Expose()
  @IsDecimal({}, { message: "Le montant doit être un nombre décimal." })
  montant: number;

  @Expose()
  @IsBoolean({ message: "L'état de la charge doit être un booléen." })
  IsActif: boolean;

  @Expose()
  @IsInt({ message: "L'ID de la colocation doit être un nombre entier." })
  @Min(1, { message: "L'ID de la colocation n'existe pas." })
  colocation: ColocationEntity;

  @Expose()
  @IsInt({ message: "L'ID du payeur doit être un nombre entier." })
  @Min(1, { message: "L'ID du payeur n'existe pas." })
  payePar: UserEntity;

  
}
