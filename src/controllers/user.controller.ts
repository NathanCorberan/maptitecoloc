import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserToCreateDTO } from "../types/user/dtos";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserPresenter } from "../types/user/presenters";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from '../utils/jwt';

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