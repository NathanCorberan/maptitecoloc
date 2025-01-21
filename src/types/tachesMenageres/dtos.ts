import { Expose } from "class-transformer";
import { IsInt, IsBoolean } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

export class MembreColocationToCreateDTO {
  @Expose()
  @IsInt({ message: "L'ID de la colocation doit être un nombre entier." })
  colocation: number;

  @Expose()
  @IsInt({ message: "L'ID de l'utilisateur doit être un nombre entier." })
  utilisateur: number;

  @Expose()
  @IsBoolean({ message: "L'état de l'utilisateur doit être un booléen." })
  estActif: boolean;
}
