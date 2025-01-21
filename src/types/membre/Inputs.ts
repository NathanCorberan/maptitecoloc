import { Expose, Type } from "class-transformer";
import { IsInt, IsBoolean, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

export class MembreColocationToCreateInput {
  @Expose()
  @IsInt({ message: "L'ID de la colocation doit être un nombre entier." })
  @Min(1, { message: "L'ID de la colocation n'existe pas." })
  colocation: ColocationEntity;

  @Expose()
  @IsInt({ message: "L'ID de l'utilisateur doit être un nombre entier." })
  @Min(1, { message: "L'ID de l'utilisateur n'existe pas." })
  utilisateur: UserEntity;

  @Expose()
  @IsBoolean({ message: "L'état de l'utilisateur doit être un booléen." })
  estActif: boolean;
}
