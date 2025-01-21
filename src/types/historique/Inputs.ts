import { Expose, Type } from "class-transformer";
import { IsString, IsInt, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

export class HistoriqueToCreateInput {
  @Expose()
  @IsString({ message: "L'action doit être une chaîne de caractères." })
  action: string;

  @Expose()
  @IsInt({ message: "L'ID de l'utilisateur doit être un nombre entier." })
  @Min(1, { message: "L'ID de l'utilisateur n'existe pas." })
  utilisateur: UserEntity;

}
