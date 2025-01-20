import { Expose, Type } from "class-transformer";
import { IsString, IsInt, Min } from "class-validator";

export class userCredentialToCreateInput {
  @Expose()
  @IsString()
  password: string;
}
