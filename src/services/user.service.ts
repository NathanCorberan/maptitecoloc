import { UserEntity } from "../databases/mysql/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { UserCredentialEntity } from "../databases/mysql/userCredential.entity"; // Ajouter l'import
import { UserToCreateDTO } from "../types/user/dtos";
import bcrypt from "bcrypt";
import { userToCreateInput } from "../types/user/Inputs"; // Ajouter l'import
import { generateAccessToken, generateRefreshToken, generateAccessTokenId } from "../utils/jwt";

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
    const createdUser = this.userRepository.create(userInput);

    // Sauvegarder l'utilisateur et son mot de passe
    const savedUser = await this.userRepository.save(createdUser);

    return savedUser;
  }

  async loginUser(email: string, password: string): Promise<{ user: UserEntity, accessToken: string, refreshToken: string }> {
    // Chercher l'utilisateur par son email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.userCredential.password_hash);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Générer les tokens JWT
    const accessToken = generateAccessTokenId({ _id: user.id, email: user.email });
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  async findById(id: number): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findById(id);
  
      if (!user) {
        return null;
      }
  
      return user;  // Retourne toutes les informations de l'utilisateur, y compris la photo de profil
    } catch (error) {
      console.error("Error retrieving user by ID:", error);
      throw new Error("Error retrieving user");
    }
  }

  async deleteUserById(id: number): Promise<void> {
    try {
      await this.userRepository.deleteById(id);
    } catch (error) {
      console.error("Error in service while deleting user:", error);
      throw new Error("Error deleting user");
    }
  }
}