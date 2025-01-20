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
    return this.userDB.findOne({
      where: { email },
      relations: ["userCredential"],
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userDB.findOne({
      where: { id },  // Recherche par id
    });
  }

  async deleteById(id: number): Promise<void> {
    try {
      const user = await this.userDB.findOne({ where: { id } });

      if (!user) {
        throw new Error("User not found");
      }

      // Supprimer l'utilisateur
      await this.userDB.delete(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Could not delete user");
    }
  }
}

