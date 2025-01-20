import { Expose } from "class-transformer";
import { IsString, IsInt, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class userToCreateInput {
  @Expose()
  @IsString()
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  password: string; // Garder ici pour l'input, mais on va l'associer à userCredential dans le service

  @Expose()
  @IsInt()
  @Min(18) // Validation de l'âge
  age: number;
}
