import { Expose } from "class-transformer";
import { IsString, IsEmail, MinLength, IsInt, Min } from "class-validator";

export class UserToCreateDTO {
  @Expose()
  @IsString()
  @MinLength(1, { message: 'Le prénom doit contenir au moins un caractère.' })
  firstname: string;

  @Expose()
  @IsString()
  @MinLength(1, { message: 'Le nom doit contenir au moins un caractère.' })
  lastname: string;

  @Expose()
  @IsEmail({}, { message: "L'adresse e-mail doit être valide." })
  email: string;

  @Expose()
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  password: string;

  @Expose()
  @IsInt({ message: "L'âge doit être un nombre entier." })
  @Min(18, { message: "L'âge minimum est de 18 ans." })
  age: number;
}
