import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserCredentialEntity } from "../databases/mysql/userCredential.entity"; // Ajouter l'import
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
import { userToCreateInput } from "../types/user/Inputs"; // Ajouter l'import

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

    // Créer un UserCredential pour stocker le mot de passe
    const userCredential = new UserCredentialEntity();
    userCredential.password_hash = password_hash;

    // Créer un objet userToCreateInput pour la création de l'utilisateur
    const userInput: userToCreateInput = {
      firstname: userToCreate.firstname,
      lastname: userToCreate.lastname,
      email: userToCreate.email,
      credential: userCredential, // Associez ici le mot de passe (pas crypté) pour passer au repository
      age: userToCreate.age,
    };

    // Créer l'utilisateur (UserEntity)
    const createdUser = await this.userRepository.create(userInput);

    // Sauvegarder l'utilisateur et son mot de passe
    const savedUser = await this.userRepository.save(createdUser);

    return savedUser;
  }
}
