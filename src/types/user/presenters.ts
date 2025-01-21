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

  @Expose()
  createdAt: Date;
}
