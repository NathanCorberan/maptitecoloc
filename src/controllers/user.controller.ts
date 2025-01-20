import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";



const userService = new UserService();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userToCreateDTO = plainToInstance(UserToCreateDTO, req.body, { excludeExtraneousValues: true });

    // Valider les données
    const dtoErrors = await validate(userToCreateDTO);
    if (dtoErrors.length > 0) {
      const errorMessages = dtoErrors.map((error) => error.constraints);
      res.status(400).json({ errors: errorMessages });
      return;
    }

    // Si validation passe, créer l'utilisateur
    const user = await userService.registerUser(req.body);

    const createdUser = plainToInstance(UserPresenter, user, { excludeExtraneousValues: true });
    res.status(201).json(createdUser);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal error occurred" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await userService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export const refreshUserToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({ message: "Authorization header is required and must be Bearer token" });
      return;
    }

    // Extraire le token depuis l'en-tête
    const refreshToken = authHeader.split(" ")[1];

    // Vérifier le refresh token
    const decoded = verifyRefreshToken(refreshToken);

    if (typeof decoded !== "object" || !decoded) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }

    // S'assurer que 'decoded' contient les propriétés nécessaires
    const { id, email } = decoded as JwtPayload;
    if (!id || !email) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    // Générer un nouveau access token
    const newAccessToken = generateAccessToken({ id, email });
    const newRefreshToken = generateRefreshToken({ id, email });

    res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: unknown) {
    const err = error as Error;

    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Refresh token expired" });
    } else {
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({ message: "Authorization header is required and must be Bearer token" });
      return;
    }

    // Extraire le token depuis l'en-tête
    const accessToken = authHeader.split(" ")[1];

    // Vérifier et décoder le token
    const decoded = verifyAccessToken(accessToken);
    if (!decoded || typeof decoded !== "object") {
      res.status(401).json({ message: "Invalid or expired access token" });
      return;
    }

    const { id } = decoded as JwtPayload; // On extrait l'ID de l'utilisateur depuis le token

    // Récupérer l'utilisateur avec l'ID extrait du token
    const user = await userService.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Récupérer les informations privées de l'utilisateur
    const userInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      age: user.age,
    };

    res.status(200).json({
      message: "User info fetched successfully",
      user: userInfo,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};