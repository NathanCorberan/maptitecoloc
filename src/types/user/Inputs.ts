import { Expose, Type } from "class-transformer";
import { IsString, IsInt, Min } from "class-validator";
import { UserEntity } from "../../databases/mysql/user.entity";
import { UserCredentialEntity } from "../../databases/mysql/userCredential.entity";

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
  @Type(() => UserCredentialEntity)
  credential: UserCredentialEntity; 

  @Expose()
  @IsInt()
  @Min(18)
  age: number;
}
