import { Expose, Type } from "class-transformer";
import { IsString, IsEnum, IsInt, IsOptional, IsDate, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";

export class TacheMenagereToCreateInput {
  @Expose()
  @IsString({ message: "La description doit être une chaîne de caractères." })
  description: string;

  @Expose()
  @IsEnum(["À faire", "En cours", "Terminé"], { message: "Le statut doit être l'un des suivants: 'À faire', 'En cours', 'Terminé'." })
  statut: string;

  @Expose()
  @IsOptional()
  @IsDate({ message: "La date limite doit être une date valide." })
  dateLimite: Date;

  @Expose()
  @IsInt({ message: "L'ID de l'utilisateur assigné doit être un nombre entier." })
  @Min(1, { message: "L'ID de l'utilisateur assigné n'existe pas." })
  assignee: UserEntity;

  @Expose()
  @IsInt({ message: "L'ID de la colocation doit être un nombre entier." })
  @Min(1, { message: "L'ID de la colocation n'existe pas." })
  colocation: ColocationEntity;
}
