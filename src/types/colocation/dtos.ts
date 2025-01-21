import { Expose, Type } from "class-transformer";
import { IsString, MinLength, IsInt, Min, IsBoolean } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";


export class ColocationToCreateDTO {
  @Expose()
  @IsString({ message: "Le lieu doit être une chaîne de caractères." })
  @MinLength(1, { message: "Le lieu doit contenir au moins un caractère." })
  lieu: string;

  @Expose()
  @IsInt({ message: "La surface doit être un nombre entier." })
  @Min(3, { message: "La surface doit être d'au moins 3 m²." })
  surface: number;

  @Expose()
  @IsInt({ message: "Le nombre de chambres doit être un nombre entier." })
  @Min(1, { message: "Il doit y avoir au moins une chambre." })
  nombreChambres: number;

  @Expose()
  @IsString({ message: "L'agence ou propriétaire doit être une chaîne de caractères." })
  @MinLength(1, { message: "L'agence ou propriétaire doit contenir au moins un caractère." })
  agenceOuProprietaire: string;

  @Expose()
  @IsBoolean({ message: "La propriété estActive doit être un booléen." })
  estActive: boolean;

  @Expose()
  @IsInt({ message: "L'ID du propriétaire doit être un nombre entier." })
  @Min(1, { message: "L'ID du propriétaire n'existe pas." })
  proprietaire: number;
}
