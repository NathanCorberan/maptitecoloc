import { Expose } from "class-transformer";
import { IsString, IsInt } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

export class HistoriqueToCreateDTO {
  @Expose()
  @IsString({ message: "L'action doit être une chaîne de caractères." })
  action: string;

  @Expose()
  @IsInt({ message: "L'ID de l'utilisateur doit être un nombre entier." })
  utilisateur: number | null;
}
