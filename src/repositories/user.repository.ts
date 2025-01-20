import { Repository } from "typeorm";
import { UserEntity } from "../databases/mysql/user.entity";
import { connectMySQLDB } from "../configs/databases/mysql.config";
import { UserToCreateDTO } from "../types/user/dtos";
import { userToCreateInput } from "../types/user/Inputs";

export class UserRepository {
  private userDB: Repository<UserEntity>;

  constructor() {
    this.userDB = connectMySQLDB.getRepository(UserEntity);
  }

  create(user: userToCreateInput): UserEntity {
    const newUser = new UserEntity();
      newUser.firstname = user.firstname;
      newUser.lastname = user.lastname;
      newUser.email = user.email;
      newUser.age = user.age;
      newUser.createdAt = new Date();
      newUser.userCredential = user.credential;
    return newUser;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.userDB.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userDB.findOneBy({ email });
  }
}
