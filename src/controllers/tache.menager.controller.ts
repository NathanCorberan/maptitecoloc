import { Request, Response } from "express";
import { validate } from "class-validator";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { TacheMenagereService } from "../services/tache.menager.service";
import { plainToInstance } from "class-transformer";
import { TacheMenagereToCreateDTO } from "../types/tachesMenageres/dtos";
import { CustomError } from "../utils/customError";

const tacheMenagereService = new TacheMenagereService();

export const createTacheMenagere = async (req: Request, res: Response): Promise<void> => {
  try {
    // Vérification de l'en-tête d'autorisation
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(400).json({
        message: "Authorization header is required and must be a Bearer token",
      });
      return;
    }
    const accessToken = authHeader.split(" ")[1];

    // Vérification et décodage du token
    const decoded = verifyAccessToken(accessToken);
    if (!decoded || typeof decoded !== "object") {
      res.status(401).json({
        message: "Invalid or expired access token",
      });
      return;
    }

    // Extraction de l'ID utilisateur à partir du token
    const { id } = decoded as JwtPayload;
    if (!id) {
      res.status(400).json({
        message: "Invalid token payload, ID is missing",
      });
      return;
    }

    // Transformation et validation des données reçues
    const tacheMenagereToCreateDTO = plainToInstance(
      TacheMenagereToCreateDTO,
      req.body,
      { excludeExtraneousValues: true }
    );

    const dtoErrors = await validate(tacheMenagereToCreateDTO);
    if (dtoErrors.length > 0) {
      const errorMessages = dtoErrors.map((error) => error.constraints);
      res.status(400).json({
        message: "Validation errors",
        errors: errorMessages,
      });
      return;
    }

    // Création de la tâche ménagère
    const tacheMenagere = await tacheMenagereService.createTacheMenagere(
      id,
      tacheMenagereToCreateDTO
    );

    // Vérification si la création a échoué
    if (!tacheMenagere) {
      res.status(404).json({
        message: "Task creation failed",
      });
      return;
    }

    res.status(200).json({
      message: "Tâche ménagère créée avec succès",
      data: tacheMenagere,
    });
  } catch (error: unknown) {
    if (error instanceof CustomError) {
      // Utilisation du code personnalisé dans la réponse
      const statusCode = parseInt(error.statusCode, 10) || 500; // Assure que le statusCode est un entier
      res.status(statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
      });
    } else {
      const err = error as Error;
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  }
};
export const updateStatut = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params; // ID de la tâche à mettre à jour
      const { statut } = req.body; // Nouveau statut à appliquer
  
      if (!statut) {
        res.status(400).json({
          message: "Le statut est obligatoire.",
        });
        return;
      }
  
      const tache = await tacheMenagereService.updateStatut(Number(id), statut);
      if (!tache) {
        res.status(404).json({
          message: "Tâche ménagère introuvable.",
        });
        return;
      }
  
      res.status(200).json({
        message: "Statut de la tâche mis à jour avec succès.",
        tache,
      });
    } catch (error: unknown) {
        if (error instanceof CustomError) {
            // Utilisation du code personnalisé dans la réponse
            const statusCode = parseInt(error.statusCode, 10) || 500; // Assure que le statusCode est un entier
            res.status(statusCode).json({
                message: error.message,
                errorCode: error.errorCode,
            });
        } else {
        const err = error as Error;
        res.status(500).json({
          message: "Erreur interne du serveur.",
          error: err.message,
        });
      }
    }
  };