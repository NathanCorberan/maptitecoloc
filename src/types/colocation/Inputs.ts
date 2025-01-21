import { Expose, Type } from "class-transformer";
import { IsString, IsInt, Min, IsBoolean } from "class-validator";
import { ColocationEntity } from "../../databases/mysql/colocation.entity";
import { UserEntity } from "../../databases/mysql/user.entity";

export class colocationToCreateInput {
  @Expose()
  @IsString()
  lieu: ColocationEntity['lieu'];

  @Expose()
  @IsInt()
  @Min(3)
  surface: ColocationEntity['surface'];

  @Expose()
  @IsInt()
  @Min(1)
  nombreChambres: ColocationEntity['nombreChambres'];

  @Expose()
  @IsString()
  agenceOuProprietaire: ColocationEntity['agenceOuProprietaire'];

  @Expose()
  @IsBoolean()
  estActive: ColocationEntity['estActive'];

  @Expose()
  @Type(() => UserEntity)
  proprietaire: UserEntity['id'];
}
