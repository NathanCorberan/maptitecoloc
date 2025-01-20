import { Expose } from "class-transformer";
import { IsString, IsEmail, MinLength, IsInt, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";

export class UserToCreateDTO {
  @Expose()
  @IsString()
  @MinLength(1)
  firstname: UserEntity['firstname'];

  @Expose()
  @IsString()
  @MinLength(1)
  lastname: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  password: string;

  @Expose()
  @IsInt()
  @Min(18)
  age: number;
}
