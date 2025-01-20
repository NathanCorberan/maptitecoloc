import { Expose } from "class-transformer";

export class UserPresenter {
  @Expose()
  id: number;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  // Ne pas exposer le mot de passe
  @Expose()
  createdAt: Date;
}
