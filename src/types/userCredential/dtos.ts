// src/types/userCredential/dtos.ts
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class UserCredentialDTO {
  @Expose()
  @IsString()
  password: string;
}
