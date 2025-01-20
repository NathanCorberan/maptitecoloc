import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
import { UserPresenter } from "../types/user/presenters";

export class UserService {
  private userRepository = new UserRepository();

  async registerUser(userToCreate: UserToCreateDTO): Promise<UserEntity> {

    if (userToCreate.age < 18) {
      throw new Error("L'âge doit être supérieur ou égal à 18.");
    }

    const existingUser = await this.userRepository.findByEmail(userToCreate.email);
    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà.");
    }

    const salt = await bcrypt.genSalt(10); 
    const password_hash = await bcrypt.hash(userToCreate.password, salt); 

    const userForCreation = {
      ...userToCreate,
      password: password_hash, 
    };

    const createdUser = this.userRepository.create(userForCreation);

    const savedUser = await this.userRepository.save(createdUser);

    return savedUser;
  }
}
